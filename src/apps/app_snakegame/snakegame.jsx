import { useState, useEffect, useRef } from "react";
import "./snakegame.css";
export default function Snakegame() {
  const [arr2D, setArr2D] = useState([]);
  const cellSize = 5;
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

  useEffect(() => {
    const canv = canvasRef.current;
    const ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);

    const rows = canv.height / cellSize;
    const cols = canv.width / cellSize;
    const arr = genArr2D(rows, cols);
    drawCanvas(ctx, rows, cols, arr);
  }, []);

  return (
    <div className="gameDiv">
      Snakegame
      <canvas ref={canvasRef} />
    </div>
  );
}
