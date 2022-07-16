import { useState, useEffect, useRef } from "react";
import SnakeCanvas from "./snakecanvas";
import SnakeControls from "./snakecontrols";
import SnakeDefaults from "./snakedefaults";
import "./snakegame.css";

const ratio = { h: 0.55, w: 0.95 };

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const genArr2D = (snake, food, rows, cols) => {
  // console.log("snake", snake);
  const snakeStr = `-${snake.join("-")}-`;
  const foodStr = `-${food.join(",")}-`;
  const arr = [];
  for (let i = 0; i <= rows - 1; i++) {
    const rowArr = [];
    for (let j = 0; j <= cols - 1; j++) {
      const tgt = `-${i},${j}-`;
      if (snakeStr.includes(tgt)) {
        rowArr.push(1);
      } else if (foodStr.includes(tgt)) {
        rowArr.push(2);
      } else {
        rowArr.push(0);
      }
    }
    arr.push(rowArr);
  }
  // console.log(arr);
  return arr;
};

const genFood = (rows, cols) => {
  return [
    Math.floor(Math.random() * (rows - 1)),
    Math.floor(Math.random() * (cols - 1)),
  ];
};

const drawCanvas = (ctx, rows, cols, arr, cellSize) => {
  for (let i = 0; i <= rows - 1; i++) {
    for (let j = 0; j <= cols - 1; j++) {
      const cell_value = arr[i][j];
      ctx.beginPath();
      ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
      ctx.fillStyle =
        cell_value === 2 ? "#7d7d02" : cell_value === 1 ? "#000" : "#FFF";
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      ctx.strokeStyle = "#BFBFBF";
      ctx.stroke();
    }
  }
};

const checkDirection = (ohead, dir) => {
  switch (dir) {
    case "right":
      return [ohead[0], ohead[1] + 1];
    case "left":
      return [ohead[0], ohead[1] - 1];
    case "up":
      return [ohead[0] - 1, ohead[1]];
    case "upright":
      return [ohead[0] - 1, ohead[1] + 1];
    case "upleft":
      return [ohead[0] - 1, ohead[1] - 1];
    case "down":
      return [ohead[0] + 1, ohead[1]];
    case "downright":
      return [ohead[0] + 1, ohead[1] + 1];
    case "downleft":
      return [ohead[0] + 1, ohead[1] - 1];
    default:
      return;
  }
};

const defaultState = {
  score: 0,
  cellSize: 15,
  timer: "",
  snake: [
    [0, 1], // tail
    [0, 2], // head
  ],
  food: [],
  direction: "right",
  arr2D: [],
  size: {
    height: window.innerHeight * ratio.h,
    width: window.innerWidth * ratio.w,
  },
  rows: (window.innerHeight * ratio.h) / 15,
  cols: (window.innerWidth * ratio.w) / 15,
  error: false,
  playing: false,
};

const reducer = (state, elem, vals) => {
  return { ...state, [elem]: vals };
};

export default function Snakegame() {
  const canvasRef = useRef();
  const [state, setState] = useState(defaultState);

  const canvasAdjust = () => {
    setState((curr) => ({
      ...curr,
      size: {
        height: window.innerHeight * ratio.h,
        width: window.innerWidth * ratio.w,
      },
      rows: (window.innerHeight * ratio.h) / curr.cellSize,
      cols: (window.innerWidth * ratio.w) / curr.cellSize,
    }));
  };

  const getControl = (e) => {
    setState(reducer(state, "direction", e.target.id));
  };

  const changeCellSize = (e) => {
    setState(reducer(state, "cellSize", e.target.value));
  };

  const snakeMove = () => {
    setState((st) => {
      const { snake, food, rows, cols, score, direction } = st;
      let currFood = food;
      let currScore = score;
      const oldPos = [...snake];
      const oldHead = oldPos[oldPos.length - 1];
      const newHead = checkDirection(oldHead, direction);
      if (
        newHead[0] < 0 ||
        newHead[1] < 0 ||
        newHead[0] > rows - 1 ||
        newHead[1] > cols - 1
      ) {
        return {
          ...st,
          error: true,
        };
      } else {
        if (newHead.join("") === food.join("")) {
          currScore = currScore + 1;
          currFood = genFood(rows, cols);
        } else {
          oldPos.shift();
        }
        // console.log("oldPos", oldPos);
        const newPos = [...oldPos, newHead];
        // console.log("newPos", newPos);
        return {
          ...st,
          snake: newPos,
          food: currFood,
          score: currScore,
        };
      }
    });
  };

  const ctxManipulate = () => {
    const { size, cellSize, rows, cols, arr2D } = state;
    const canv = canvasRef.current;
    const ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);
    drawCanvas(ctx, rows, cols, arr2D, cellSize);
  };

  const play = (e) => {
    const { timer, direction, error } = state;
    if (!timer && !error) {
      const playTimer = setInterval(() => {
        snakeMove(direction);
      }, 500);
      setState((st) => ({ ...st, timer: playTimer, playing: true }));
    }
  };

  const pause = (e) => {
    clearInterval(state.timer);
    setState((st) => ({ ...st, timer: "", playing: false }));
  };

  const restart = (e) => {
    setState((st) => {
      const { rows, cols, timer } = st;
      clearInterval(timer);
      return {
        ...st,
        timer: "",
        food: genFood(rows, cols),
        snake: defaultState.snake,
        error: false,
        playing: false,
        direction: "right",
        score: 0,
      };
    });
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      canvasAdjust();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [state.size, state.cellSize]);

  useEffect(() => {
    const { snake, rows, cols } = state;
    const food = genFood(rows, cols);
    setState((st) => ({
      ...st,
      arr2D: genArr2D(snake, food, rows, cols),
      food: food,
    }));
  }, [state.rows, state.cols]);

  useEffect(() => {
    if (state.arr2D.length > 0) {
      ctxManipulate();
    }
  }, [state.arr2D]);

  useEffect(() => {
    const { snake, food, rows, cols } = state;
    setState((st) => ({
      ...st,
      arr2D: genArr2D(snake, food, rows, cols),
    }));
  }, [state.snake]);

  useEffect(() => {
    if (state.error) {
      pause();
    }
  }, [state.error]);

  return (
    <div className="snakeDiv">
      Snakegame <code>(Still in coding stage)</code>
      <SnakeDefaults
        score={state.score}
        play={play}
        pause={pause}
        restart={restart}
        changeCellSize={changeCellSize}
        cellSize={state.cellSize}
        error={state.error}
        playing={state.playing}
      />
      <SnakeCanvas
        canvasRef={canvasRef}
        height={state.size.height}
        width={state.size.width}
        error={state.error}
      />
      <div className="snakeControlsGrid">
        <SnakeControls getControl={getControl} playing={state.playing} />
      </div>
    </div>
  );
}
