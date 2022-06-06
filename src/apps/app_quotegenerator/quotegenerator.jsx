import { useEffect, useState } from "react";
import "./quotegenerator.css";

export default function QouteGenerator() {
  const [advice, setAdvice] = useState({ author: "", quote: "Loading..." });
  const [lastTimeQuoteGenerated, setlastTimeQuoteGenerated] = useState("");
  const [disable, setDisable] = useState(false);

  const fecthAdvice = async () => {
    try {
      setDisable(true);
      const response = await fetch("https://type.fit/api/quotes");
      const quotes = await response.json();
      const randomNum = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomNum];
      const genTime = new Date().getTime();
      setAdvice({ author: quote.author, quote: quote.text });
      setlastTimeQuoteGenerated(genTime);
      setDisable(false);
    } catch (e) {
      console.log("Quotes fetch error", e);
      setDisable(false);
    }
  };

  const getNextQuote = () => {
    setDisable(true);
    const date = new Date();
    const currentTime = date.getTime();
    const timeDifference = currentTime - lastTimeQuoteGenerated;
    const showAfter = 2000;
    const roundOff = 10;
    if (timeDifference > showAfter) {
      fecthAdvice();
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
      setTimeout(() => fecthAdvice(), timeGap);
    }
  };

  useEffect(() => {
    fecthAdvice();
  }, []);

  return (
    <>
      <h5>Random Quote Generator</h5>
      <p>"{advice.quote}"</p>
      <p>{advice.author}</p>
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
    </>
  );
}
