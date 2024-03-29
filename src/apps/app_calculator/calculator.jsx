import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import parse from "html-react-parser";
import { Breadcrumbs } from "../../components";
import "./calculator.css";

export default function Calculator() {
  const [result, setResult] = useState(0);
  const [chars, setChars] = useState("");
  const [prevInputs, setPrevInputs] = useState([]);
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
      // console.log(evaluate(chars).toString());
      try {
        const res = chars ? evaluate(chars).toString() : 0;
        setResult(res);
      } catch (err) {
        // console.log(err);
        setResult("syntax error");
      }
    } else {
      setResult("missing ( or )");
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
    // square
    const squareRegex = /\^2/g;
    formattedStr = formattedStr.replaceAll(squareRegex, `&sup2;`);
    // cube
    const cubeRegex = /\^3/g;
    formattedStr = formattedStr.replaceAll(cubeRegex, `&sup3;`);
    // quad
    const quadRegex = /\^4/g;
    formattedStr = formattedStr.replaceAll(quadRegex, `&#8308;`);

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
        setPrevInputs([]);
        break;
      case val === "back":
        if (chars.length > 0) {
          const prev = prevInputs;
          const popItem = prev.pop();
          setChars(chars.slice(0, -popItem.length));
          setPrevInputs(prev);
        }
        break;
      case val === "enter":
        compute();
        break;
      default:
        if (val === "sqrt" || val === "cbrt") {
          setPrevInputs([...prevInputs, val + "("]);
          setChars(`${chars}${val}(`);
          return;
        }
        if (chars.length > 0) {
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
            setPrevInputs([...prevInputs, val]);
            setChars(`${chars}${val}`);
          }
        } else {
          if (parseInt(val) || val === "(" || val === "0") {
            setPrevInputs([...prevInputs, val]);
            setChars(`${chars}${val}`);
          }
        }
    }
  };

  const keyboardEnter = (event) => {
    // console.log(event);
    event.preventDefault();
    event.stopPropagation();
    const ky = event.code;
    switch (true) {
      case ky === "Enter":
        compute();
        break;
      case ky === "Backspace":
        if (chars.length > 0) {
          const prev = prevInputs;
          const popItem = prev.pop();
          setChars(chars.slice(0, -popItem.length));
          setPrevInputs(prev);
        }
        break;
      case ky === "Delete":
        setChars("");
        setResult(0);
        setPrevInputs([]);
        break;
      case ky.includes("Digit") && !Number.isNaN(parseInt(event.key)):
        const num = ky.slice(5);
        setPrevInputs([...prevInputs, num]);
        setChars(`${chars}${num}`);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    // console.log(window);
    window.document.addEventListener("keydown", keyboardEnter);
    return () => {
      window.document.removeEventListener("keydown", keyboardEnter);
    };
  }, [chars]);

  return (
    <>
      <Breadcrumbs crumbs={["home", "app", "calculator"]} />
      <div className="calcGrid">
        <div className="results">{result}</div>
        <div className="calc-inputs">
          <p>{formatInputStr(chars)}</p>
        </div>
        <div className="top">
          <button className="btn btn-sm btn-warning" onClick={getChar} id="(">
            (
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id=")">
            )
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
        <div className="nums1">
          <button className="btn btn-sm btn-primary" onClick={getChar} id="7">
            7
          </button>
          <button className="btn btn-sm btn-primary" onClick={getChar} id="8">
            8
          </button>
          <button className="btn btn-sm btn-primary" onClick={getChar} id="9">
            9
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id="+">
            +
          </button>
        </div>
        <div className="nums2">
          <button className="btn btn-sm btn-primary" onClick={getChar} id="4">
            4
          </button>
          <button className="btn btn-sm btn-primary" onClick={getChar} id="5">
            5
          </button>
          <button className="btn btn-sm btn-primary" onClick={getChar} id="6">
            6
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id="-">
            &minus;
          </button>
        </div>
        <div className="nums3">
          <button className="btn btn-sm btn-primary" onClick={getChar} id="1">
            1
          </button>
          <button className="btn btn-sm btn-primary" onClick={getChar} id="2">
            2
          </button>
          <button className="btn btn-sm btn-primary" onClick={getChar} id="3">
            3
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id="*">
            X
          </button>
        </div>
        <div className="down1">
          <button className="btn btn-sm btn-primary" onClick={getChar} id="0">
            0
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id=".">
            .
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id="%">
            %
          </button>
          <button className="btn btn-sm btn-warning" onClick={getChar} id="/">
            &#247;
          </button>
        </div>
        <div className="down2">
          <button className="btn btn-sm btn-info" onClick={getChar} id="^">
            y^
          </button>
          <button className="btn btn-sm btn-info" onClick={getChar} id="^2">
            {/* ^2 */}
            y&sup2;
          </button>
          <button className="btn btn-sm btn-info" onClick={getChar} id="sqrt">
            &#8730;
          </button>
          <button className="btn btn-sm btn-info" onClick={getChar} id="cbrt">
            &#8731;
          </button>
        </div>
        <div className="side-down">
          <button
            className="btn btn-sm btn-success"
            onClick={getChar}
            id="enter"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}
