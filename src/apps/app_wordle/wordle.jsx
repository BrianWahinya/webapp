import { useEffect } from "react";
import { useState } from "react";
import "./wordle.css";

const wordsApiUrl = "https://random-word-api.herokuapp.com/word";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ALPHA_REGEX = /^[a-z][A-Z]{0,1}$/;

export default function Wordle() {
  const [lang, setLang] = useState("en");
  const [level, setLevel] = useState("easy");
  const [word, setWord] = useState("");

  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [row, setRow] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [gameOn, setGameOn] = useState(true);
  const [tryAgain, setTryAgain] = useState(false);

  const randomLen = (lv) => {
    let v;
    switch (lv) {
      case "easy":
        v = randomInteger(3, 4);
        break;
      case "beginner":
        v = randomInteger(4, 6);
        break;
      case "intermediate":
        v = randomInteger(6, 8);
        break;
      case "expert":
        v = randomInteger(8, 11);
        break;
      default:
        v = randomInteger(4, 6);
    }
    return v;
  };

  const numOfTrials = (wd) => {
    const num = Math.floor((wd.length * 4) / 3);
    setDisableBtn(false);
    return num > 8 ? 9 : num;
  };

  const fetchWords = async () => {
    setDisableBtn(true);
    setGuesses([]);
    setInput("");
    setRow(0);
    setGameOn(false);
    setCorrect(false);
    setTryAgain(false);

    const url = `${wordsApiUrl}?length=${randomLen(level)}&lang=${lang}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const wd = jsonResponse[0];

    setGuesses((arr) => {
      const defArr = [];
      for (let i = 0; i < numOfTrials(wd); i++) {
        const rw = [];
        for (let j = 0; j < wd.length; j++) {
          rw.push(null);
        }
        defArr.push(rw);
      }
      return defArr;
    });
    setWord(wd);
    setGameOn(true);
  };

  const nextWord = () => {
    fetchWords();
  };

  const changeLevel = (e) => {
    setLevel(e.target.value);
  };

  const changeLang = (e) => {
    setLang(e.target.value);
  };

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const getKey = (e) => {
      // Alpha keys
      if (
        e.key.match(ALPHA_REGEX) &&
        input.length < word.length &&
        row < guesses.length &&
        gameOn
      ) {
        setInput((j) => `${j}${e.key}`);
        const currRow = guesses[row];
        const idx = currRow.indexOf(null);
        currRow.splice(idx, 1, e.key);
        setGuesses((g) => {
          g.splice(row, 1, currRow);
          return g;
        });
      }

      // Enter key
      if (
        e.key.match("Enter") &&
        input.length === word.length &&
        row < guesses.length &&
        gameOn
      ) {
        if (input === word) {
          setCorrect(true);
          setGameOn(false);
        } else {
          setRow((r) => r + 1);
          setInput("");
        }
      }
      if (
        input.length === word.length &&
        row === guesses.length - 1 &&
        gameOn
      ) {
        setTryAgain(true);
      }
    };
    window.document.addEventListener("keydown", getKey);
    return () => window.document.removeEventListener("keydown", getKey);
  }, [word, input]);

  useEffect(() => {
    fetchWords();
  }, [lang, level]);

  const letterClass = (wd, ltr, ind) => {
    if (ltr === null) {
      return "null";
    }
    const present = wd.includes(ltr);
    const whichInd = wd.indexOf(ltr);
    if (present) {
      if (whichInd === ind) {
        return "exact";
      }
      return "close";
    }
    return "far";
  };

  return (
    <div className="wordle">
      <h5>Wordle Game</h5>
      <select value={lang} onChange={changeLang}>
        <option value="en">En</option>
        <option value="es">Es</option>
        <option value="it">It</option>
      </select>
      <select value={level} onChange={changeLevel}>
        <option value="easy">Easy</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
      <p className="instructions">
        Guess the name then press enter after every row
      </p>
      <p className="hints">
        Hints:
        <br />
        <span className="far">grey:</span> not present,
        <br />
        <span className="close">yellow:</span> present &amp; incorrect position,
        <br />
        <span className="exact">green:</span> present &amp; correct position
      </p>
      {guesses.map((ges, i) => (
        <div key={i} className="guess">
          {ges.map((letter, j) => (
            <div key={j} className={`letter ${letterClass(word, letter, j)}`}>
              {letter}
            </div>
          ))}
        </div>
      ))}
      <div>
        <p>{tryAgain && word}</p>
      </div>
      {(correct || tryAgain) && (
        <button
          className="btn btn-sm btn-primary"
          onClick={nextWord}
          disabled={disableBtn}
        >
          Try Next
        </button>
      )}
    </div>
  );
}
