import React from 'react';
import './App.css';
import Clock from './projects/clock_app/clock_main';
import Weather from './projects/weather_app/weather_main';
import QuoteGenerator from './projects/quotegenerator_app/quote_generator';

class App extends React.Component {
  selectApp = () => {
    const apps = {
      'clock': <Clock/>,
      'weather': <Weather/>,
      'quotegenerator': <QuoteGenerator/>
    }
    const name = this.props.clickedProject;
    return apps[name];
  }
  render(){
    return <> {this.selectApp()} </>;
  }
}

export default App;
