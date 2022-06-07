import { useEffect, useRef, useState } from "react";
import "./conwaygameoflife.css";

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

export default function ConwayGameOfLife() {
  const [arr2D, setArr2D] = useState([]);
  const [canvasSize, setCanvasSize] = useState(0);
  const grid_size = 20;
  const canvasRef = useRef();

  const canvasAdjust = () => {
    setCanvasSize(Math.min(window.innerHeight * 0.7, window.innerWidth * 0.95));
    createCanvas(canvasRef.current);
  };

  useEffect(() => {
    canvasAdjust();
    const debouncedHandleResize = debounce(function handleResize() {
      canvasAdjust();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [canvasSize]);

  const createCanvas = (cref) => {
    const canvas = cref;
    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);

    const rows = Math.floor(height / grid_size) - 1;
    // console.log(rows);

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= rows; j++) {
        const random = Math.floor(Math.random() * 2);
        context.beginPath();
        context.rect(i * grid_size, j * grid_size, grid_size, grid_size);
        context.fillStyle = random ? "#000" : "#FFF";
        context.fillRect(i * grid_size, j * grid_size, grid_size, grid_size);
        context.strokeStyle = "#BFBFBF";
        context.stroke();
      }
    }
  };

  return (
    <>
      <h5>ConwayGameOfLife (coding in progress)</h5>
      <canvas
        className="canvas"
        id="canv"
        ref={canvasRef}
        height={canvasSize}
        width={canvasSize}
      />
    </>
  );
}
