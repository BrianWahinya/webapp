import React from "react";
import "../../styles/quote_generator.css";

class QuoteGenerator extends React.Component {
  state = {
    advice: "",
    buttons: "",
    intervalDifference: 0,
    lastTimeQuoteGenerated: "",
  };

  componentDidMount() {
    this.fecthAdvice();
    this.createButtons();
  }

  fecthAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((advice) => {
        this.setState({ advice: advice.slip.advice });
        this.setState({ lastTimeQuoteGenerated: new Date().getTime() });
      });
  };

  getNextQuote = () => {
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

  createButtons = () => {
    const buttons = (
      <button className="adviceNext" onClick={this.getNextQuote}>
        Next
      </button>
    );
    this.setState({ buttons });
  };

  render() {
    return (
      <>
        <h4>Random Quote Generator</h4>
        <p>{this.state.advice}</p>
        {this.state.buttons}
      </>
    );
  }
}

export default QuoteGenerator;
