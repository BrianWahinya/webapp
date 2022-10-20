import { useState, useEffect } from "react";
import { Keyboard, Loader } from "../../components";
import "./wordle.css";

const wordsApiUrl = "https://random-word-api.herokuapp.com/word";

const randomLen = (lvl) => {
  let trials;
  switch (lvl) {
    case "easy":
      trials = randomInteger(3, 4);
      break;
    case "beginner":
      trials = randomInteger(4, 6);
      break;
    case "intermediate":
      trials = randomInteger(6, 8);
      break;
    case "expert":
      trials = randomInteger(8, 11);
      break;
    default:
      trials = randomInteger(4, 6);
  }
  return trials;
};

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ALPHA_REGEX = /^[a-z][A-Z]{0,1}$/;

const numOfTrials = (wd) => {
  const num = Math.floor((wd.length * 4) / 3);
  return num > 8 ? 9 : num;
};

const genEmptyBoxes = (r, c) => {
  /**
   * return Array(r).fill(Array(c).fill(null));
   * This is evaluated just once.
   * Each row is a reference to the rest of the columns
   * Updating one row updates the rest
   * Use Array.from to avoid this
   */
  return Array.from({ length: r }, () => Array.from({ length: c }, () => null));
};

const initialState = {
  lang: "en",
  level: "easy",
  word: "",
  userInput: "",
  rows: 0,
  cols: 0,
  loading: false,
  correct: false,
  playing: true,
  guesses: [],
  guessesColored: <></>,
  activeRow: 0,
  disableBtn: false,
};

const reducer = (state, action) => {
  if (action.type === "reset") {
    return initialState;
  }

  const result = { ...state };
  result[action.type] = action.value;
  return result;
};

/******* WORDLE *******/
export default function Wordle() {
  const [
    {
      lang,
      level,
      word,
      userInput,
      rows,
      cols,
      loading,
      correct,
      playing,
      guesses,
      guessesColored,
      activeRow,
      disableBtn,
    },
    setState,
  ] = useState(initialState);

  const resetState = () => {
    setState((prevState) => ({
      ...initialState,
      lang: prevState.lang,
      level: prevState.level,
    }));
  };

  const fetchWords = async () => {
    resetState();
    setState((prevState) => ({
      ...prevState,
      disableBtn: true,
      loading: true,
    }));

    const url = `${wordsApiUrl}?length=${randomLen(level)}&lang=${lang}`;
    const resp = await fetch(url);
    const respJson = await resp.json();
    const respWord = respJson[0];
    const trials = numOfTrials(respWord);
    const lettersNum = respWord.length;
    // console.log("respWord", respWord);

    setState((prevState) => ({
      ...prevState,
      word: respWord,
      rows: trials,
      cols: lettersNum,
      guesses: genEmptyBoxes(trials, lettersNum),
      disableBtn: false,
      loading: false,
    }));
  };

  const nextWord = (e) => {
    fetchWords();
  };

  const changeLevel = (e) => {
    setState((prevState) => ({ ...prevState, level: e.target.value }));
  };

  const changeLang = (e) => {
    setState((prevState) => ({ ...prevState, lang: e.target.value }));
  };

  const getKeyPressed = (keyPressed) => {
    // console.log("key pressed: ", keyPressed);
    if (!playing) {
      return;
    }
    if (keyPressed.toLowerCase() === "del") {
      removeChar();
      return;
    }

    const updateGuesses = [...guesses];
    const currRow = updateGuesses[activeRow];
    const currInput = userInput;

    // console.log("******Before*******");
    // console.log("updateGuesses", updateGuesses);
    // console.log("currRow", currRow);

    const nullIdx = currRow.indexOf(null);
    if (nullIdx !== -1) {
      const updateInput = `${currInput}${keyPressed}`;
      currRow.splice(nullIdx, 1, keyPressed);
      updateGuesses.splice(activeRow, 1, currRow);

      // console.log("******After*******");
      // console.log("currRow", currRow);
      // console.log("updateGuesses", updateGuesses);

      setState((prevState) => ({
        ...prevState,
        userInput: updateInput,
        guesses: updateGuesses,
      }));
    }
    return;
  };

  const letterClass = (wd, ltr, ind, row) => {
    if (playing && row === activeRow) {
      return "active";
    }
    if (ltr === null) {
      return "null";
    }
    const present = wd.includes(ltr);
    if (present) {
      if (wd[ind] === ltr) {
        return "exact";
      }
      return "close";
    }
    return "far";
  };

  const assignColors = () => {
    const displayGuesses = (
      <>
        {guesses.map((guess, i) => (
          <div key={i} className="guess">
            {guess.map((letter, j) => (
              <div
                key={j}
                className={`letter ${letterClass(word, letter, j, i)}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </>
    );
    // console.log(displayGuesses);
    setState((prevState) => ({ ...prevState, guessesColored: displayGuesses }));
  };

  const checkCorrect = (ui, wd) => {
    return ui === wd;
  };

  const enterClicked = () => {
    // console.log("Enter Clicked");
    const nextRow = activeRow + 1;
    if (nextRow < rows && !guesses[activeRow].includes(null)) {
      // console.log("next", nextRow);d
      const isCorrect = checkCorrect(userInput, word);
      setState((prevState) => {
        return {
          ...prevState,
          activeRow: nextRow,
          userInput: "",
          correct: isCorrect,
          playing: !isCorrect,
        };
      });
      assignColors();
    }

    if (nextRow === rows && !guesses[activeRow].includes(null)) {
      const isCorrect = checkCorrect(userInput, word);
      setState((prevState) => ({
        ...prevState,
        playing: false,
        correct: isCorrect,
        userInput: "",
      }));
    }
  };

  const removeChar = () => {
    if (!playing) return;

    const updateGuesses = [...guesses];
    const currRow = updateGuesses[activeRow];

    // console.log("******Before*******");
    // console.log("updateGuesses", updateGuesses);
    // console.log("currRow", currRow);

    const nullIdx = currRow.indexOf(null);
    if (nullIdx !== -1) {
      currRow.splice(nullIdx - 1, 1, null);
    } else {
      currRow.splice(currRow.length - 1, 1, null);
    }

    // console.log("******After*******");
    // console.log("currRow", currRow);
    // console.log("updateGuesses", updateGuesses);
    updateGuesses.splice(activeRow, 1, currRow);
    setState((prevState) => ({
      ...prevState,
      userInput: userInput.slice(0, -1),
      guesses: updateGuesses,
    }));
  };

  const phycKeyboardClick = (e) => {
    e.preventDefault();
    const clickedKey = e.key.toLowerCase();
    switch (true) {
      case clickedKey === "enter":
        enterClicked();
        break;
      case clickedKey === "backspace" || clickedKey === "delete":
        removeChar();
        break;
      case ALPHA_REGEX.test(clickedKey):
        getKeyPressed(clickedKey);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    window.document.addEventListener("keydown", phycKeyboardClick);
    return () =>
      window.document.removeEventListener("keydown", phycKeyboardClick);
  }, [word, activeRow, userInput]);

  useEffect(() => {
    fetchWords();
  }, [lang, level]);

  useEffect(() => {
    assignColors();
  }, [guesses, activeRow, playing]);

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
      {loading && <Loader />}
      {!loading && guessesColored}
      <div>
        <div className="inputs">
          <button
            onClick={enterClicked}
            className="btn btn-sm btn-warning btnEnter"
            disabled={loading || !playing}
          >
            Enter
          </button>
          {/* <button
            onClick={removeChar}
            className="btn btn-sm btn-danger btnEnter"
            disabled={loading || !playing}
          >
            Del
          </button> */}
        </div>

        <p>
          {!correct && !playing && (
            <>
              <span className="failed">&#128518;Failed!!&#128569;</span>
              <br />
              <span>Word is: </span>
              <span className="compWord">{word}</span>
            </>
          )}
          {correct && !playing && (
            <span className="correct">&#128521;Correct!!&#128526;</span>
          )}
        </p>
      </div>
      {!playing && (
        <button
          className="btn btn-sm btn-primary btnNextWord"
          onClick={nextWord}
          disabled={disableBtn}
        >
          Try Next
        </button>
      )}
      <Keyboard getKeyPressed={getKeyPressed} disabled={!playing} />
    </div>
  );
}
