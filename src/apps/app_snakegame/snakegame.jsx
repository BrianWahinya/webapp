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
  const canvasRef = useRef();

  const genArr2D = (rows, cols) => {
    const arr = [];
    // const snake = [1, 1, 1]
    const positionA = [
      Math.floor(Math.random() * (rows - 2)),
      Math.floor(Math.random() * (cols - 2)),
    ];
    for (let i = 0; i <= rows; i++) {
      const rowArr = [];
      for (let j = 0; j <= cols; j++) {
        rowArr.push(0);
      }
      arr.push(rowArr);
    }
    arr[positionA[0]].splice(3, 3, 1, 1, 1);
    console.log(arr);
    return arr;
  };

  const drawCanvas = (ctx, rows, cols, arr) => {
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const cell_value = arr[i][j];
        ctx.beginPath();
        ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.fillStyle = cell_value === 0 ? "#FFF" : "#000";
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
    console.log(e.target.id);
  };

  const changeCellSize = (e) => {
    setCellSize(e.target.value);
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
