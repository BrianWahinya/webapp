import React from "react";
import "../../styles/quote_generator.css";

class QuoteGenerator extends React.Component {
  state = {
    advice: "",
    disable: false,
    lastTimeQuoteGenerated: "",
  };

  componentDidMount() {
    this.fecthAdvice();
  }

  fecthAdvice = () => {
    this.setState({ disable: true });
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((advice) => {
        this.setState({ advice: advice.slip.advice });
        this.setState({ lastTimeQuoteGenerated: new Date().getTime() });
        this.setState({ disable: false });
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
      });
      setTimeout(() => this.fecthAdvice(), timeGap);
    }
  };

  render() {
    const { advice, disable } = this.state;
    return (
      <>
        <h4>Random Quote Generator</h4>
        <p>{advice}</p>
        <a
          disabled={disable}
          role="button"
          className={`btn btn-primary btnTweet ${disable ? "disabled" : ""}`}
          href={encodeURI(`https://twitter.com/intent/tweet?text=${advice}`)}
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
