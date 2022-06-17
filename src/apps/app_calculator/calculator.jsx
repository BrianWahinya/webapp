import { useState } from "react";
import { evaluate } from "mathjs";
import parse from "html-react-parser";
import "./calculator.css";

export default function Calculator() {
  const [result, setResult] = useState(0);
  const [chars, setChars] = useState("");
  let computation = "";

  const checkParenthesisValid = (str) => {
    let allPar = [...str].reduce((par, cur) => {
      if (cur === "(" || cur === ")") {
        par = `${par}${cur}`;
      }
      return par;
    }, "");
    while (allPar.includes("()")) {
      allPar = allPar.replace("()", "");
    }
    return allPar.length > 0 ? false : true;
  };
  const compute = () => {
    if (checkParenthesisValid(chars)) {
      const res = evaluate(chars).toString();
      setResult(res);
    } else {
      setResult("error - missing ( or )");
    }
  };
  const formatInputStr = (str) => {
    let formattedStr = str;
    // division
    const divideRegex = /\//g;
    formattedStr = formattedStr.replaceAll(divideRegex, `&divide;`);
    // square-root
    const sqrtRegex = /sqrt/g;
    formattedStr = formattedStr.replaceAll(sqrtRegex, `&radic;`);
    // cube-root
    const cbrtRegex = /cbrt/g;
    formattedStr = formattedStr.replaceAll(cbrtRegex, `&#8731;`);
    // minus
    const minusRegex = /-/g;
    formattedStr = formattedStr.replaceAll(minusRegex, `&minus;`);
    // multiply
    const multiplyRegex = /\*/g;
    formattedStr = formattedStr.replaceAll(multiplyRegex, `x`);

    // console.log(formattedStr);
    return parse(formattedStr);
  };

  // const mergeParenthesis = (str) => {
  //   let merged = str;
  //   const fPar = [...merged.matchAll(/\(/g)]
  //     .map((mg) => mg.index)
  //     .sort((a, b) => b - a);
  //   for (let i = 0; i < fPar.length; i++) {
  //     const sub = merged.slice(fPar[i]);
  //     const sub2 = sub.slice(1, sub.indexOf(")"));
  //     merged = merged.replace(`(${sub2})`, calc(sub2));
  //     console.log(merged);
  //   }
  //   console.log("merged", merged);
  // };

  // const calc = (str) => {
  //   return Math.floor(Math.random() * 9);
  // };
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
        if (val === "sqrt" || val === "cbrt") {
          setChars(`${chars}${val}(`);
          return;
        }
        if (chars) {
          const lastChar = chars.split("").pop();
          if (
            Number.isNaN(parseInt(lastChar)) &&
            Number.isNaN(parseInt(val)) &&
            val !== "(" &&
            lastChar !== "(" &&
            lastChar !== ")" &&
            val !== ")"
          ) {
            return;
          } else {
            setChars(`${chars}${val}`);
          }
        } else {
          if (parseInt(val) || val === "(") {
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
        <div className="charsDiv">{formatInputStr(chars)}</div>
        <div>
          <div className="formatDiv">
            <button className="btn btn-sm btn-warning" onClick={getChar} id="^">
              ^
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={getChar}
              id="^2"
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
              &minus;
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id="/">
              &#247;
            </button>
            <button className="btn btn-sm btn-warning" onClick={getChar} id="*">
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
              id="cbrt"
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
