import { computeHeadingLevel } from "@testing-library/react";
import { useState } from "react";
import "./calculator.css";
export default function Calculator() {
  const [result, setResult] = useState(0);
  const [chars, setChars] = useState("");

  const compute = () => {
    setResult(<span>Coding underway...&#128521;</span>);
  };
  const getChar = (e) => {
    const val = e.target.id;
    switch (true) {
      case val === "clear":
        setChars("");
        setResult(0);
        break;
      case val === "back":
        chars && setChars(chars.slice(0, -1));
        break;
      case val === "enter":
        compute();
        break;
      default:
        if (chars) {
          const lastChar = chars.split("").pop();
          // console.log(lastChar);
          if (!parseInt(lastChar) && !parseInt(val)) {
            // setChars(chars);
            return;
          } else {
            setChars(`${chars}${val}`);
          }
        } else {
          if (parseInt(val)) {
            setChars(`${chars}${val}`);
          }
        }
    }
  };
  return (
    <>
      <h5>Calculator (coding in progress)</h5>
      <div className="calcDiv">
        <div className="resultsDiv">{result}</div>
        {chars && <div className="charsDiv">{chars}</div>}
        <div>
          <div className="formatDiv">
            <button className="btn btn-sm btn-warning" onClick={getChar} id="^">
              ^
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={getChar}
              id="sq"
            >
              ^2
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={getChar}
              id="clear"
            >
              C
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={getChar}
              id="back"
            >
              &#8592;
            </button>
          </div>
          <div className="numbersDiv">
            <button className="btn btn-sm btn-primary" onClick={getChar} id="0">
              0
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="1">
              1
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="2">
              2
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="3">
              3
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="4">
              4
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="5">
              5
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="6">
              6
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="7">
              7
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="8">
              8
            </button>
            <button className="btn btn-sm btn-primary" onClick={getChar} id="9">
              9
            </button>
          </div>
          <div className="computingDiv">
            <button className="btn btn-sm btn-warning" onClick={getChar} id="+">
              +
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id="-">
              -
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id="/">
              &#247;
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id="x">
              X
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id=".">
              .
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id="(">
              (
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id=")">
              )
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={getChar}
              id="sqrt"
            >
              &#8730;
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={getChar}
              id="cubrt"
            >
              &#8731;
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={getChar}
              id="enter"
            >
              Enter
              <br />=
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
