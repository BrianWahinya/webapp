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
  const [size, setSize] = useState(
    Math.min(window.innerHeight * 0.7, window.innerWidth * 0.95),
  );
  const [cellSize, setCellSize] = useState(10);
  const [intFunc, setIntFunc] = useState(0);
  const [intTime, setIntTime] = useState(500);
  const canvasRef = useRef();

  const neighbours = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [1, 0],
  ];

  const canvasAdjust = () => {
    setSize(Math.min(window.innerHeight * 0.7, window.innerWidth * 0.95));
    setArr2D([]);
    clearInterval(intFunc);
    setIntFunc(0);
  };

  const genArr2D = () => {
    const arr = [];
    const num_cells = Math.floor(size / cellSize);
    for (let i = 0; i < num_cells; i++) {
      const row = [];
      for (let j = 0; j < num_cells; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      arr.push(row);
    }
    setArr2D(arr);
  };

  const nextGeneration = () => {
    setArr2D((curr) => {
      const arr = [];
      const num_cells = Math.floor(size / cellSize);
      for (let i = 0; i < num_cells; i++) {
        const row = [];
        for (let j = 0; j < num_cells; j++) {
          row.push(conwayRules(curr, i, j));
        }
        arr.push(row);
      }
      return arr;
    });
  };

  const conwayRules = (arr, i, j) => {
    const curr_val = arr[i][j];
    const neigh_val = neighbours.reduce((sum, nei) => {
      const n1 = nei[0];
      const n2 = nei[1];
      const val = arr[i + n1]
        ? arr[i + n1][j + n2]
          ? arr[i + n1][j + n2]
          : 0
        : 0;
      sum += val;
      return sum;
    }, 0);
    // Rules
    const cell_val =
      curr_val === 1
        ? neigh_val === 2 || neigh_val === 3
          ? 1
          : 0
        : neigh_val === 3
        ? 1
        : 0;
    return cell_val;
  };

  const drawCells = (arr, rows) => {
    const cv = canvasRef.current;
    if (!cv) {
      clearInterval(intFunc);
      setIntFunc(0);
    }
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
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

  const play = (e) => {
    if (e.target.id === "play") {
      if (!intFunc) {
        setIntFunc(
          setInterval(() => {
            nextGeneration();
          }, intTime),
        );
      }
    } else {
      clearInterval(intFunc);
      setIntFunc(0);
    }
  };

  const changeCellSize = (e) => {
    setCellSize(e.target.value);
    setArr2D([]);
    clearInterval(intFunc);
    setIntFunc(0);
  };

  const changeTime = (e) => {
    const timeInterval = e.target.value || intTime;
    clearInterval(intFunc);
    setIntFunc(0);
    setIntTime(timeInterval);
    setIntFunc(
      setInterval(() => {
        nextGeneration();
      }, timeInterval),
    );
  };

  useEffect(() => {
    if (arr2D.length < 1) {
      genArr2D();
    } else {
      drawCells(arr2D, Math.floor(size / cellSize));
    }

    const debouncedHandleResize = debounce(function handleResize() {
      canvasAdjust();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [size, arr2D, cellSize, intTime]);
  return (
    <>
      <h5>ConwayGameOfLife</h5>
      <label htmlFor="intTime">Speed:</label>
      <select name="intTime" onChange={changeTime} value={intTime}>
        <option value={500}>500ms</option>
        <option value={1000}>1s</option>
        <option value={2000}>2s</option>
      </select>
      &nbsp;
      <label htmlFor="cellsize">Cell-Size:</label>
      <select name="cellsize" onChange={changeCellSize} value={cellSize}>
        <option value={8}>8px</option>
        <option value={10}>10px</option>
        <option value={15}>15px</option>
        <option value={20}>20px</option>
        <option value={30}>30px</option>
      </select>
      <br />
      <canvas ref={canvasRef} height={size} width={size} />
      <br />
      <button id="play" onClick={play}>
        Play
      </button>
      <button id="pause" onClick={play}>
        Pause
      </button>
    </>
  );
}
