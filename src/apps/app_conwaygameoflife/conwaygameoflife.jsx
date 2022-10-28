import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Breadcrumbs } from "../../components";
import "./css/conway.css";

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

const sizeRatio = { height: 0.7, width: 0.7 };

export default function ConwayGameOfLife() {
  const [arr2D, setArr2D] = useState([]);
  const [size, setSize] = useState({
    height: 200,
    width: 200,
  });
  const [main, setMain] = useState({ h: 0, w: 0 });
  const [cellSize, setCellSize] = useState(10);
  const [intFunc, setIntFunc] = useState(0);
  const [intTime, setIntTime] = useState(500);
  const canvasRef = useRef();
  const conwayDivRef = useRef();

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

  // Generate 2D array
  const genArr2D = () => {
    const arr = [];
    const num_rows = Math.floor(size.height / cellSize);
    const num_cols = Math.floor(size.width / cellSize);
    for (let i = 0; i < num_rows; i++) {
      const row = [];
      for (let j = 0; j < num_cols; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      arr.push(row);
    }
    setArr2D(arr);
  };

  // Next Generation 2D array
  const nextGeneration = () => {
    setArr2D((curr) => {
      const arr = [];
      const num_rows = Math.floor(size.height / cellSize);
      const num_cols = Math.floor(size.width / cellSize);
      for (let i = 0; i < num_rows; i++) {
        const row = [];
        for (let j = 0; j < num_cols; j++) {
          row.push(conwayRules(curr, i, j));
        }
        arr.push(row);
      }
      return arr;
    });
  };

  // Conway Rules
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

  const drawCells = (arr, rows, cols) => {
    const cv = canvasRef.current;
    if (!cv) {
      clearInterval(intFunc);
      setIntFunc(0);
    }
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell_value = arr[i][j];
        ctx.beginPath();
        ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.fillStyle = cell_value === 0 ? "#FFFFFFE0" : "#1d1d1d";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.strokeStyle = "#BFBFBF";
        ctx.stroke();
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(cols * cellSize, 0);
          ctx.lineTo(cols * cellSize, rows * cellSize);
          ctx.strokeStyle = "#1d1d1d";
          ctx.stroke();
        }
        if (j === 0) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, rows * cellSize);
          ctx.lineTo(cols * cellSize, rows * cellSize);
          ctx.strokeStyle = "#1d1d1d";
          ctx.stroke();
        }
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
    } else if (e.target.id === "restart") {
      setArr2D([]);
      const curr_time_int = intTime;
      clearInterval(intFunc);
      setIntFunc(0);
      setIntFunc(
        setInterval(() => {
          nextGeneration();
        }, curr_time_int),
      );
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

  const mainChange = () => {
    setMain({
      h: conwayDivRef.current.offsetHeight,
      w: conwayDivRef.current.offsetWidth,
    });
  };
  useEffect(() => {
    if (arr2D.length < 1) {
      genArr2D();
    } else {
      drawCells(
        arr2D,
        Math.floor(size.height / cellSize),
        Math.floor(size.width / cellSize),
      );
    }
    const debouncedHandleResize = debounce(function handleResize() {
      mainChange();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [size, arr2D, cellSize, intTime]);

  const canvasAdjust = () => {
    setSize({
      height: conwayDivRef.current.offsetHeight,
      width: conwayDivRef.current.offsetWidth,
    });
    setArr2D([]);
    clearInterval(intFunc);
    setIntFunc(0);
  };

  useLayoutEffect(() => {
    canvasAdjust();
  }, [main]);

  return (
    <>
      <Breadcrumbs crumbs={["home", "app", "conway"]} />
      <div ref={conwayDivRef} className="conwayDiv">
        <div>
          <h5>Conway Game Of Life</h5>
          <label htmlFor="intTime">Speed:</label>
          <select name="intTime" onChange={changeTime} value={intTime}>
            <option value={500}>500ms</option>
            <option value={1000}>1s</option>
            <option value={2000}>2s</option>
          </select>
          &nbsp; &nbsp;
          <label htmlFor="cellsize">Cell-Size:</label>
          <select name="cellsize" onChange={changeCellSize} value={cellSize}>
            <option value={8}>8px</option>
            <option value={10}>10px</option>
            <option value={15}>15px</option>
            <option value={20}>20px</option>
            <option value={30}>30px</option>
          </select>
        </div>
        <canvas
          ref={canvasRef}
          height={size.height}
          width={size.width}
          className="canvas"
        />
        <div>
          <button className="btn btn-sm btn-primary" id="play" onClick={play}>
            Play
          </button>
          <button className="btn btn-sm btn-info" id="pause" onClick={play}>
            Pause
          </button>
          <button
            className="btn btn-sm btn-success"
            id="restart"
            onClick={play}
          >
            Restart
          </button>
        </div>
      </div>
    </>
  );
}
