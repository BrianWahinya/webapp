import React, { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "../../components";
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

const drawCanvas = (ctx, rows, cols, arr, cellSize, snakeHead) => {
  for (let i = 0; i <= rows - 1; i++) {
    for (let j = 0; j <= cols - 1; j++) {
      const cell_value = arr[i][j];
      ctx.beginPath();
      ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
      ctx.fillStyle =
        cell_value === 2
          ? "#408201"
          : cell_value === 1
          ? i === snakeHead[0] && j === snakeHead[1]
            ? "#636363"
            : "#000"
          : "#FFF";
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

const retrieveKeyBoardDirection = (key) => {
  switch (key) {
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "ArrowLeft":
      return "left";
    default:
      return "right";
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
  speed: 500,
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

  const getSpeed = (scr) => {
    return scr <= 3
      ? 500
      : scr <= 6
      ? 400
      : scr <= 9
      ? 300
      : scr <= 12
      ? 200
      : 100;
  };

  const snakeMove = () => {
    setState((st) => {
      const { snake, food, rows, cols, score, direction, speed } = st;
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
          playing: false,
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
          speed: getSpeed(currScore),
        };
      }
    });
  };

  const ctxManipulate = () => {
    const { size, cellSize, rows, cols, arr2D, snake } = state;
    const canv = canvasRef.current;
    const ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);
    drawCanvas(ctx, rows, cols, arr2D, cellSize, snake[snake.length - 1]);
  };

  const play = (e) => {
    const { timer, direction, error, speed } = state;
    if (!timer && !error) {
      const playTimer = setInterval(() => {
        snakeMove(direction);
      }, speed);
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
        speed: defaultState.speed,
      };
    });
  };

  const keyboardDirections = (e) => {
    e.preventDefault();
    setState((st) => {
      const { timer, playing, error } = st;
      if (e.key.includes("Arrow") && timer && playing && !error) {
        return { ...st, direction: retrieveKeyBoardDirection(e.key) };
      }
      return st;
    });
  };

  useEffect(() => {
    const { timer, direction, speed, error } = state;
    clearInterval(timer);
    if (!error) {
      const playTimer = setInterval(() => {
        snakeMove(direction);
      }, speed);
      setState((st) => ({ ...st, timer: playTimer, playing: true }));
    }
  }, [state.speed]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      canvasAdjust();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [state.size]);

  useEffect(() => {
    canvasAdjust();
    restart();
  }, [state.cellSize]);

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
    window.document.addEventListener("keydown", keyboardDirections);
    return () =>
      window.document.removeEventListener("keydown", keyboardDirections);
  }, [state.arr2D]);

  useEffect(() => {
    const { snake, food, rows, cols } = state;
    setState((st) => ({
      ...st,
      arr2D: genArr2D(snake, food, rows, cols),
    }));
  }, [state.snake, state.food]);

  useEffect(() => {
    if (state.error) {
      pause();
    }
  }, [state.error]);

  return (
    <>
      <Breadcrumbs crumbs={["home", "app", "snakegame"]} />
      <div className="snakeDiv">
        <h5>SNAKE - GAME</h5>
        <SnakeDefaults
          score={state.score}
          play={play}
          pause={pause}
          restart={restart}
          changeCellSize={changeCellSize}
          cellSize={state.cellSize}
          error={state.error}
          playing={state.playing}
          speed={state.speed}
        />
        <SnakeCanvas
          canvasRef={canvasRef}
          height={state.size.height}
          width={state.size.width}
          error={state.error}
          key="canvas"
        />
        <div className="snakeControlsGrid">
          <SnakeControls getControl={getControl} playing={state.playing} />
        </div>
      </div>
    </>
  );
}
