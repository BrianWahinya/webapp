import React from "react";

class QuoteGenerator extends React.Component {
  state = {
    advice: "",
    buttons: "",
  };

  componentDidMount() {
    this.fecthAdvice();
    this.createButtons();
  }

  fecthAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((advice) => this.setState({ advice: advice.slip.advice }));
  };

  getNextQuote = () => {
    this.fecthAdvice();
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
    // return <div>Random Quote Generator App (Under Development) <br/> No hurry!!! &#128514; &#128514;</div>
    // console.log("render", this.state);
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
