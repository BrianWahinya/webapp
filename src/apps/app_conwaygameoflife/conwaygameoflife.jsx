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
  const [cellSize, setCellSize] = useState(10);
  const [animId, setAnimId] = useState(0);
  const [animTime, setAnimTime] = useState(500);
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
  }, [canvasSize, cellSize]);

  const createCanvas = (cref) => {
    const canvas = cref;
    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);

    const rows = Math.floor(height / cellSize) - 1;
    const cols = rows;
    // console.log(rows);

    const prevArr = [...arr2D];
    const currArr = [];
    for (let i = 0; i <= cols; i++) {
      const rowArr = [];
      for (let j = 0; j <= rows; j++) {
        const cell_value = Math.floor(Math.random() * 2);
        rowArr.push(cell_value);
        context.beginPath();
        context.rect(j * cellSize, i * cellSize, cellSize, cellSize);
        context.fillStyle = cell_value ? "#000" : "#FFF";
        context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        context.strokeStyle = "#BFBFBF";
        context.stroke();
      }
      currArr.push(rowArr);
    }
    setArr2D(currArr);
    // console.table("prev", prevArr);
    // console.table("curr", currArr);
  };

  const play = (arr) => {};

  const animControl = (e) => {
    if (e.target.id === "start") {
      if (!animId) {
        setAnimId(
          setInterval(() => {
            canvasAdjust();
          }, animTime),
        );
      }
    } else {
      clearInterval(animId);
      setAnimId(0);
    }
  };

  const changeTime = (e) => {
    const timeInterval = e.target.value || animTime;
    clearInterval(animId);
    setAnimId(0);
    setAnimTime(timeInterval);
    setAnimId(
      setInterval(() => {
        canvasAdjust();
      }, timeInterval),
    );
  };

  const changeCellSize = (e) => {
    setCellSize(e.target.value);
    clearInterval(animId);
    setAnimId(0);
  };

  return (
    <>
      <h5>ConwayGameOfLife (coding in progress)</h5>
      <label htmlFor="animTime">Speed:</label>
      <select name="animTime" onChange={changeTime} value={animTime}>
        <option value={100}>100ms</option>
        <option value={500}>500ms</option>
        <option value={1000}>1s</option>
        <option value={2000}>2s</option>
        <option value={5000}>5s</option>
      </select>
      <label htmlFor="animTime">Cell-Size:</label>
      <select name="animTime" onChange={changeCellSize} value={cellSize}>
        <option value={8}>8px</option>
        <option value={10}>10px</option>
        <option value={20}>20px</option>
      </select>
      <br />
      <canvas
        className="canvas"
        id="canv"
        ref={canvasRef}
        height={canvasSize}
        width={canvasSize}
      />
      <br />
      <button id="start" onClick={animControl}>
        Start
      </button>
      <button id="stop" onClick={animControl}>
        Stop
      </button>
    </>
  );
}
