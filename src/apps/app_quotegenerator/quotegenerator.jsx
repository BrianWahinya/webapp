import { useEffect, useState } from "react";
import "./quotegenerator.css";

export default function QouteGenerator() {
  const [advice, setAdvice] = useState({
    author: "",
    quote: "Loading...",
    idx: null,
  });
  const [allQuotes, setAllQuotes] = useState([]);
  const [lastTimeQuoteGenerated, setlastTimeQuoteGenerated] = useState("");
  const [previousQuotesIndexes, setPreviousQuotesIndexes] = useState([]);
  const [disable, setDisable] = useState(false);
  const [currIndex, setCurrIndex] = useState(null);

  const fecthAdvice = async () => {
    try {
      setDisable(true);
      const response = await fetch("https://type.fit/api/quotes");
      const quotes = await response.json();
      // console.log("quotes", quotes);
      setAllQuotes(quotes);
      getQuote(quotes);
    } catch (e) {
      console.log("Quotes fetch error", e);
      setDisable(false);
    }
  };

  const getQuote = (data, idx) => {
    const numIdx =
      idx || idx === 0 ? idx : Math.floor(Math.random() * data.length);
    if (idx !== 0 && !idx) {
      if (currIndex) {
        setPreviousQuotesIndexes((idx) => [...idx, currIndex]);
      }
      setCurrIndex(numIdx);
    }
    const quote = data[numIdx];
    const genTime = new Date().getTime();
    setAdvice({ author: quote.author, quote: quote.text });
    setlastTimeQuoteGenerated(genTime);
    setDisable(false);
  };

  const getNextQuote = () => {
    setDisable(true);
    const date = new Date();
    const currentTime = date.getTime();
    const timeDifference = currentTime - lastTimeQuoteGenerated;
    const showAfter = 2000;
    const roundOff = 10;
    if (timeDifference > showAfter) {
      // fecthAdvice();
      getQuote(allQuotes);
    } else {
      const timeGap = showAfter - timeDifference;
      setAdvice({
        author: "",
        quote: (
          <span className="wait">
            Please Wait...&#128521; (
            {Math.round((timeGap / 1000) * roundOff) / roundOff} secs)
          </span>
        ),
      });
      setTimeout(() => getQuote(allQuotes), timeGap);
    }
  };

  const getPreviousQuote = () => {
    const prevLen = previousQuotesIndexes.length;
    if (prevLen > 0) {
      getQuote(allQuotes, previousQuotesIndexes[prevLen - 1]);
      setPreviousQuotesIndexes((idxs) => {
        const x = [...idxs].filter((idx) => idx !== idxs[idxs.length - 1]);
        return x;
      });
    }
  };

  useEffect(() => {
    fecthAdvice();
  }, []);

  return (
    <div className="divQuoteGen">
      <h5>Random Quote Generator</h5>
      <p className="pQuote">" {advice.quote} "</p>
      <p className="pAuthor">{advice.author}</p>
      {previousQuotesIndexes.length > 0 && (
        <button
          disabled={disable}
          className="advicePrevious btn btn-sm btn-outline-warning"
          onClick={getPreviousQuote}
        >
          Previous
        </button>
      )}
      <button
        disabled={disable}
        className="adviceNext btn btn-sm btn-outline-primary"
        onClick={getNextQuote}
      >
        Next
      </button>
      <a
        disabled={disable}
        role="button"
        className={`btn btn-primary btn-sm btnTweet ${
          disable ? "disabled" : ""
        }`}
        href={encodeURI(
          `https://twitter.com/intent/tweet?text=${advice.quote} - ${advice.author}`,
        )}
        target="_blank"
        rel="noreferrer noopener"
      >
        Tweet
      </a>
    </div>
  );
}
