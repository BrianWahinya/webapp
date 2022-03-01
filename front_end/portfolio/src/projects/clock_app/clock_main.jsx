import React from 'react';
import DigitalClock from './digital_clock';
import AnalogClock from './analog_clock';
import '../../styles/clock_main.css';

class Clock extends React.Component{
  state = {
    localTime: '',
    ampm: '',
    time: {
      hourRatio: 0,
      minuteRatio: 0,
      secondRatio: 0
    },
    switchBtns:{
      active: 'analog',
      btns: [
        {id:'analog', name: 'Analog'},
        {id:'digital', name: 'Digital'}
      ]
    },
    clockApps: {
      'digital': <DigitalClock/>,
      'analog': <AnalogClock/>
    }    
  }

  getAllSwitchBtns = () => {
    return <>
      {this.state.switchBtns.btns.map(btn =>{
        return <label className='labelClockRadios'>
          <input type='radio' name='clockRadioBtns' className='clockRadioBtns' key={btn.id} value={btn.id} checked={btn.id === this.state.switchBtns.active} onChange={this.radioOnChange} />
          {btn.name}
          </label>
        })
      }
    </>    
  }

  render(){
    const {clockApps, switchBtns, time, localTime, ampm} = this.state;
    const props = {hourRatio:time.hourRatio, minuteRatio:time.minuteRatio, secondRatio:time.secondRatio, localTime:localTime, ampm:ampm};
    const app = React.cloneElement(clockApps[switchBtns.active], props);
    // console.log('props', app.props)
    return <>
      {this.getAllSwitchBtns()}
      <div className='clockApps'>{app}</div>
    </>
  }

  radioOnChange = (event) => {
    // console.log('radio event target', event.target);
    const switchBtns = this.state.switchBtns;
    switchBtns.active = event.target.value;
    event.target.checked = true;
    this.setState({switchBtns});
    // console.log('radio state', this.state.switchBtns);
  }

  componentDidMount() {
    this.setTime();
    setInterval(() => {
      this.setTime()
    }, 1000);
  }

  setTime = () => {
    const today = new Date();
    // console.log('today', today);
    const localTime = today.toLocaleTimeString();
    const time = {
      hourRatio: today.getHours(),
      minuteRatio: today.getMinutes(),
      secondRatio: today.getSeconds(),
    }
    const ampm = (time.hourRatio >= 12)? 'PM': 'AM';
    this.setState({time});
    this.setState({localTime});
    this.setState({ampm});
  }
}

export default Clock;
