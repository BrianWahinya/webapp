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
  const [arr2D, setArr2D] = useState([]);
  const [size, setSize] = useState({
    height: window.innerHeight * 0.7,
    width: window.innerWidth * 0.95,
  });
  const cellSize = 20;
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
      height: window.innerHeight * 0.7,
      width: window.innerWidth * 0.95,
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
  }, [size]);

  const getControl = (e) => {
    console.log(e.target.id);
  };

  return (
    <div className="snakeDiv">
      Snakegame
      <canvas ref={canvasRef} height={size.height} width={size.width} />
      <div className="snakeControlsGrid">
        <div className="up">
          <button
            className="btn btn-sm btn-warning snakeControls"
            onClick={getControl}
            id="up"
          >
            Up
          </button>
        </div>
        <div className="left-right">
          <button
            className="btn btn-sm btn-info snakeControls"
            onClick={getControl}
            id="left"
          >
            Left
          </button>
          <button
            className="btn btn-sm btn-info snakeControls"
            onClick={getControl}
            id="right"
          >
            Right
          </button>
        </div>
        <div className="down">
          <button
            className="btn btn-sm btn-warning snakeControls"
            onClick={getControl}
            id="down"
          >
            Down
          </button>
        </div>
      </div>
    </div>
  );
}
