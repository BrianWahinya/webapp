import { useEffect, useRef } from "react";
import "./conwaygameoflife.css";

export default function ConwayGameOfLife() {
  const canvasRef = useRef();
  useEffect(() => {
    createCanvas(canvasRef.current);
  }, []);
  const createCanvas = (cref) => {
    const canvas = cref;
    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const grid_size = 20;
    const x_grid_lines = Math.floor(height / grid_size);
    const y_grid_lines = Math.floor(width / grid_size);

    for (let i = 0; i <= x_grid_lines; i++) {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = "#000000";
      context.moveTo(0, grid_size * i);
      context.lineTo(width, grid_size * i);
      context.stroke();
    }

    for (let i = 0; i <= y_grid_lines; i++) {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = "#000000";
      context.moveTo(grid_size * i, 0);
      context.lineTo(grid_size * i, height);
      context.stroke();
    }
  };
  return (
    <>
      <h5>ConwayGameOfLife (coding in progress)</h5>
      <canvas className="canvas" ref={canvasRef} width={400} height={400} />
    </>
  );
}
