import { useEffect } from "react";
import { useState } from "react";
import "./sort.css";
// const sortingAlgos = [
//   { id: "heap", name: "Heap Sort" },
//   { id: "quick", name: "Quick Sort" },
//   { id: "radix", name: "Radix Sort" },
//   { id: "merge", name: "Merge Sort" },
//   { id: "bucket", name: "Bucket Sort" },
//   { id: "bubble", name: "Bubble Sort" },
//   { id: "insertion", name: "Insertion Sort" },
//   { id: "selection", name: "Selection Sort" },
// ];

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

const arrBarWidth = [
  { id: 3, name: "3px" },
  { id: 5, name: "5px" },
  { id: 7, name: "7px" },
  { id: 10, name: "10px" },
  { id: 15, name: "15px" },
  { id: 20, name: "20px" },
  { id: 30, name: "30px" },
];

const sortSpeed = [
  { id: 0, name: "0ms" },
  { id: 50, name: "50ms" },
  { id: 100, name: "100ms" },
  { id: 250, name: "250ms" },
  { id: 350, name: "350ms" },
  { id: 500, name: "500ms" },
  { id: 1000, name: "1sec" },
];
const genArr = (num) => {
  const boxWidth = window.innerWidth * 0.95;
  const barNum = Math.floor(boxWidth / num);
  const a = [];
  for (let i = 0; i < barNum; i++) {
    a.push({
      id: i,
      value: Math.floor(Math.random() * 400) + 5,
    });
    a.push();
  }
  return a;
};
export default function SortAlgo() {
  const [barWidth, setBarWidth] = useState(7);
  const [speed, setSpeed] = useState(100);
  const [inputs, setInputs] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [pivots, setPivots] = useState([]);
  const [activePivot, setActivePivot] = useState("");
  const [tmout, setTmout] = useState("");

  /**Quick Sort
   * Select a pivot (in this case the last element)
   * Compare the values against the pivot.
   * Less-than pivot are pushed to lowerArr
   * More-than pivot are pushed to upperArr
   * Recursively call the quickSort on the lower and upper array
   * Return the result in an array using spread operators and pivot being in the middle
   * If arr length is less-than or equal-to 1, return the arr
   */
  // const quickSort = (localArr) => {
  //   const arr = [...localArr];
  //   // console.log("arr", arr);
  //   if (arr.length <= 1) return arr;
  //   const pivot = arr.pop();
  //   const lowerArr = [];
  //   const upperArr = [];
  //   for (let val of arr) {
  //     if (val < pivot) {
  //       lowerArr.push(val);
  //     } else {
  //       upperArr.push(val);
  //     }
  //   }
  //   // console.log("lower", lowerArr);
  //   // console.log("pivot", pivot);
  //   // console.log("upper", upperArr);
  //   return [...quickSort(lowerArr), pivot, ...quickSort(upperArr)];
  // };

  const quickSort = async (arr) => {
    if (arr.length <= 1) return arr;
    const lowerArr = [];
    const upperArr = [];
    const pivotElem = arr.pop();
    setPivots((pvts) => [...pvts, pivotElem.id]);
    setActivePivot(pivotElem);
    const arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
      await sleep(speed);
      const elem = arr[i];
      setComparing([elem.id]);
      if (elem.value < pivotElem.value) {
        setInputs((main) => {
          const elemIdx = main.findIndex((mn) => mn.id === elem.id);
          const pivotIdx = main.findIndex((mn) => mn.id === pivotElem.id);
          if (elemIdx > pivotIdx) {
            const filtered = main.filter((mn) => mn.id !== elem.id);
            filtered.splice(pivotIdx, 0, elem);
            return filtered;
          }
          return main;
        });
        lowerArr.push(elem);
      } else {
        setInputs((main) => {
          const filtered = main.filter((mn) => mn.id !== elem.id);
          const pivotIdx = filtered.findIndex((fd) => fd.id === pivotElem.id);
          filtered.splice(pivotIdx + 1, 0, elem);
          return filtered;
        });
        upperArr.push(elem);
      }
    }
    const val = [
      ...(await quickSort(lowerArr)),
      pivotElem,
      ...(await quickSort(upperArr)),
    ];
    setActivePivot("");
    setComparing([]);
    return await val;
  };

  const mergeSort = async (arr) => {
    const arrLen = arr.length;
    if (arrLen <= 1) return arr;
    const left = arr.slice(0, Math.floor(arrLen / 2));
    const right = arr.slice(Math.floor(arrLen / 2));
    // mergeSort(left);
    // mergeSort(right);
    // console.log("left", left);
    // console.log("right", right);

    const x = [...(await merge(await mergeSort(left), await mergeSort(right)))];

    // console.log("x", await x);
    return await x;
  };

  const merge = async (left, right) => {
    setComparing([]);
    const leftLn = left.length;
    const rightLn = right.length;
    let i = 0;
    let j = 0;
    let k = 0;
    const subarr = [];
    while (i < leftLn && j < rightLn) {
      const leftElem = left[i];
      const rightElem = right[j];
      setComparing([leftElem.id, rightElem.id]);
      let sub;
      let inc;
      if (leftElem.value > rightElem.value) {
        subarr.push(rightElem);
        sub = rightElem;
        inc = "right";
      } else {
        subarr.push(leftElem);
        sub = leftElem;
        inc = "left";
      }
      setInputs((main) => {
        const idx1 =
          main.findIndex((mn) => mn.id === left[0].id) + subarr.length;
        const filtered = main.filter((mn) => mn.id !== sub.id);
        filtered.splice(idx1, 0, sub);
        return filtered;
      });
      await sleep(speed);
      if (inc === "right") {
        j++;
      } else {
        i++;
      }
    }
    while (i < leftLn && j >= rightLn) {
      setComparing([left[i].id]);
      setInputs((main) => {
        // console.log(main, left[i]);
        const idx1 =
          main.findIndex((mn) => mn.id === left[0].id) + subarr.length;
        const filtered = main.filter((mn) => mn.id !== left[i].id);
        filtered.splice(idx1, 0, left[i]);
        return filtered;
      });
      subarr.push(left[i]);
      await sleep(speed);
      i++;
    }
    while (j < rightLn && i >= leftLn) {
      setComparing([right[j].id]);
      setInputs((main) => {
        const idx1 =
          main.findIndex((mn) => mn.id === left[0].id) + subarr.length;
        const filtered = main.filter((mn) => mn.id !== right[j].id);
        filtered.splice(idx1, 0, right[j]);
        return filtered;
      });
      subarr.push(right[j]);
      await sleep(speed);
      j++;
    }
    setComparing([]);
    return subarr;
  };

  const sleep = async (ms) => {
    return new Promise((resolve) => {
      const tm = setTimeout(resolve, ms);
      setTmout(tm);
    });
  };

  const beginQuickSort = () => {
    const arr = [...inputs];
    clearTimeout(tmout);
    setTmout("");
    setPivots([]);
    setActivePivot("");
    setComparing([]);
    quickSort(arr);
  };

  const beginMergeSort = () => {
    const arr = [...inputs];
    clearTimeout(tmout);
    setTmout("");
    setPivots([]);
    setActivePivot("");
    setComparing([]);
    mergeSort(arr);
  };

  const genNewArr = (bw) => {
    clearTimeout(tmout);
    setTmout("");
    setInputs([]);
    setPivots([]);
    setActivePivot("");
    setComparing([]);
    setInputs(genArr(bw));
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      genNewArr(barWidth);
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [barWidth]);

  useEffect(() => {
    genNewArr(barWidth);
  }, [barWidth, speed]);

  // console.log("original", inputs);
  // console.log("sorted", quickSort(inputs));
  const changeBarWidth = (e) => {
    setBarWidth(e.target.value);
  };

  const changeSortSpeed = (e) => {
    setSpeed(e.target.value);
  };

  return (
    <div>
      <p>
        <u>Sorting Algorithms</u>
      </p>
      <label htmlFor="barWidth">Bar-Width: </label>
      <select value={barWidth} name="barWidth" onChange={changeBarWidth}>
        {arrBarWidth.map((bw) => (
          <option key={bw.id} value={bw.id}>
            {bw.name}
          </option>
        ))}
      </select>
      <label htmlFor="sortSpeed">Speed: </label>
      <select value={speed} name="sortSpeed" onChange={changeSortSpeed}>
        {sortSpeed.map((sp) => (
          <option key={sp.id} value={sp.id}>
            {sp.name}
          </option>
        ))}
      </select>
      {/* <p>{JSON.stringify(inputs)}</p> */}
      <p>
        {/* QuickSort: <br /> {JSON.stringify(quickSort(inputs), null, " ")} */}
      </p>
      <button
        className="btn btn-sm btn-success"
        onClick={() => genNewArr(barWidth)}
      >
        Generate Array
      </button>
      &nbsp;
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={beginQuickSort}
      >
        Quick Sort
      </button>
      &nbsp;
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={beginMergeSort}
      >
        Merge Sort
      </button>
      <div className="showDiv">
        {inputs.map((inp, idx) => (
          <div
            key={inp.id}
            className={`elems ${
              activePivot.id === inp.id
                ? "activePivot"
                : pivots.includes(inp.id)
                ? "pivot"
                : comparing.includes(inp.id)
                ? "comparing"
                : "unsorted"
            }`}
            style={{ width: `${barWidth}px`, height: `${inp.value}px` }}
          >
            {/* {obj.value} */}
          </div>
        ))}
      </div>
    </div>
  );
}
