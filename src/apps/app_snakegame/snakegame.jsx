import { useState, useEffect, useRef } from "react";
import "./snakegame.css";

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

export default function Snakegame() {
  const ratio = { h: 0.65, w: 0.95 };
  const [arr2D, setArr2D] = useState([]);
  const [size, setSize] = useState({
    height: window.innerHeight * ratio.h,
    width: window.innerWidth * ratio.w,
  });
  const [cellSize, setCellSize] = useState(15);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState("");
  const [snake, setSnake] = useState([
    [0, 0], // tail
    [0, 1],
    [0, 2], // head
  ]);
  const [food, setFood] = useState([]);
  const [direction, setDirection] = useState("right");
  const canvasRef = useRef();

  const genFood = (rows, cols) => {
    setFood((fd) => [
      Math.floor(Math.random() * rows),
      Math.floor(Math.random() * cols),
    ]);
  };

  const genArr2D = (rows, cols) => {
    const snakeStr = `-${snake.join("-")}-`;
    const foodStr = `-${food.join(",")}-`;
    const arr = [];
    for (let i = 0; i <= rows; i++) {
      const rowArr = [];
      for (let j = 0; j <= cols; j++) {
        const tgt = `-${i},${j}-`;
        if (foodStr.includes(tgt)) {
          rowArr.push(2);
        } else if (snakeStr.includes(tgt)) {
          rowArr.push(1);
        } else {
          rowArr.push(0);
        }
      }
      arr.push(rowArr);
    }
    // console.log(arr);
    return arr;
  };

  const drawCanvas = (ctx, rows, cols, arr) => {
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
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

  const canvasAdjust = () => {
    setSize({
      height: window.innerHeight * ratio.h,
      width: window.innerWidth * ratio.w,
    });
  };

  useEffect(() => {
    const canv = canvasRef.current;
    const ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);

    const rows = Math.floor(size.height / cellSize) - 1;
    const cols = Math.floor(size.width / cellSize) - 1;
    const arr = genArr2D(rows, cols);
    genFood(rows, cols);
    setArr2D(arr);
    drawCanvas(ctx, rows, cols, arr);

    const debouncedHandleResize = debounce(function handleResize() {
      canvasAdjust();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [size, cellSize]);

  const getControl = (e) => {
    setDirection(e.target.id);
  };

  const changeCellSize = (e) => {
    setCellSize(e.target.value);
  };

  const ctxManipulate = () => {
    const canv = canvasRef.current;
    const ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);

    const rows = Math.floor(size.height / cellSize) - 1;
    const cols = Math.floor(size.width / cellSize) - 1;
    const arr = genArr2D(rows, cols);
    drawCanvas(ctx, rows, cols, arr);
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

  const addScore = () => {
    setScore((scr) => scr + 1);
  };
  const snakeMove = (dir) => {
    setSnake((pos) => {
      const oldPos = [...pos];
      const oldHead = oldPos[oldPos.length - 1];
      // console.log(oldHead);
      const newHead = checkDirection(oldHead, dir);
      if (oldHead.join("") === food.join("")) {
        addScore();
        const rows = Math.floor(size.height / cellSize) - 1;
        const cols = Math.floor(size.width / cellSize) - 1;
        genFood(rows, cols);
      } else {
        oldPos.shift();
      }
      // console.log("oldPos", oldPos);
      const newPos = [...oldPos, newHead];
      // console.log("newPos", newPos);
      return newPos;
    });
  };

  useEffect(() => {
    ctxManipulate();
  }, [snake, food]);

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
      const playTimer = setInterval(() => {
        snakeMove(direction);
      }, 500);
      setTimer((tm) => playTimer);
    }
  }, [direction]);

  const play = (e) => {
    if (!timer) {
      const playTimer = setInterval(() => {
        snakeMove(direction);
      }, 500);
      setTimer((tm) => playTimer);
    }
  };

  const pause = (e) => {
    clearInterval(timer);
    setTimer("");
  };

  return (
    <div className="snakeDiv">
      Snakegame <code>(Still in coding stage)</code>
      <div>
        <label htmlFor="cellSize">CellSize:</label>
        <select
          id="cellSize"
          name="cellSize"
          onChange={changeCellSize}
          value={cellSize}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
        &nbsp;
        <span>Score: {score}</span>
      </div>
      <div>
        <button className="btn btn-sm btn-outline-success play" onClick={play}>
          Play
        </button>
        <button className="btn btn-sm btn-outline-danger stop" onClick={pause}>
          Pause
        </button>
      </div>
      <canvas ref={canvasRef} height={size.height} width={size.width} />
      <div className="snakeControlsGrid">
        <div className="up">
          <button
            className="btn btn-sm btn-warning snakeControls"
            onClick={getControl}
            id="upleft"
          >
            &#8598;
          </button>
          <button
            className="btn btn-sm btn-primary snakeControls"
            onClick={getControl}
            id="up"
          >
            &#8593;
          </button>
          <button
            className="btn btn-sm btn-warning snakeControls"
            onClick={getControl}
            id="upright"
          >
            &#8599;
          </button>
        </div>
        <div className="left-right">
          <button
            className="btn btn-sm btn-info snakeControls"
            onClick={getControl}
            id="left"
          >
            &#8592;
          </button>
          <button
            className="btn btn-sm btn-info snakeControls"
            onClick={getControl}
            id="right"
          >
            &#8594;
          </button>
        </div>
        <div className="down">
          <button
            className="btn btn-sm btn-warning snakeControls"
            onClick={getControl}
            id="downleft"
          >
            &#8601;
          </button>
          <button
            className="btn btn-sm btn-primary snakeControls"
            onClick={getControl}
            id="down"
          >
            &#8595;
          </button>
          <button
            className="btn btn-sm btn-warning snakeControls"
            onClick={getControl}
            id="downright"
          >
            &#8600;
          </button>
        </div>
      </div>
    </div>
  );
}
