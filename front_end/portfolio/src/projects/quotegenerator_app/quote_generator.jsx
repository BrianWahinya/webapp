import React from "react";
import "../../styles/quote_generator.css";

class QuoteGenerator extends React.Component {
  state = {
    advice: "Loading...",
    author: "",
    disable: false,
    lastTimeQuoteGenerated: "",
  };

  componentDidMount() {
    this.fecthAdvice();
  }

  fecthAdvice = () => {
    this.setState({ disable: true });
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((quotes) => {
        const randomNum = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomNum];
        const genTime = new Date().getTime();
        this.setState({
          advice: quote.text,
          author: quote.author,
          disable: false,
          lastTimeQuoteGenerated: genTime,
        });
      });
  };

  getNextQuote = () => {
    this.setState({ disable: true });
    const date = new Date();
    const currentTime = date.getTime();
    const timeDifference = currentTime - this.state.lastTimeQuoteGenerated;
    const showAfter = 2000;
    const roundOff = 10;
    if (timeDifference > showAfter) {
      this.fecthAdvice();
    } else {
      const timeGap = showAfter - timeDifference;
      this.setState({
        advice: (
          <span className="wait">
            Please Wait...&#128521; (
            {Math.round((timeGap / 1000) * roundOff) / roundOff} secs)
          </span>
        ),
        author: "",
      });
      setTimeout(() => this.fecthAdvice(), timeGap);
    }
  };

  render() {
    const { advice, author, disable } = this.state;
    return (
      <>
        <h4>Random Quote Generator</h4>
        <p>"{advice}"</p>
        <p>{author}</p>
        <a
          disabled={disable}
          role="button"
          className={`btn btn-primary btnTweet ${disable ? "disabled" : ""}`}
          href={encodeURI(
            `https://twitter.com/intent/tweet?text=${advice} - ${author}`,
          )}
          target="_blank"
          rel="noreferrer noopener"
        >
          Tweet
        </a>
        <button
          disabled={disable}
          className="adviceNext btn btn-outline-primary"
          onClick={this.getNextQuote}
        >
          Next
        </button>
      </>
    );
  }
}

export default QuoteGenerator;
