import React from "react";
import '../../styles/clock_digital.css';

function DigitalClock ({localTime}){
  return <>
    <span className="digitalClock">{(localTime.length === 10)? `0${localTime}`: localTime}</span>
  </>
}

export default DigitalClock;

/*
// SECOND SOLUTION
function DigitalClock(){
  
  const [clockState, setClockState] = useState();
  const [dateState, setDateState] = useState();

  useEffect(() => {
    const months = {
      1: {name:'January'},
      2: {name:'February'},
      3: {name:'March'},
      4: {name:'April'},
      5: {name:'May'},
      6: {name:'June'},
      7: {name:'July'},
      8: {name:'August'},
      9: {name:'September'},
      10: {name:'October'},
      11: {name:'November'}, 
      12: {name:'December'}
    }

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth() + 1].name;
    const year = today.getFullYear();
    setDateState(`${day}-${month}-${year}`);
    setClockState(today.toLocaleTimeString());

    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000)
  }, [])

  return <>
    <span>{dateState}</span>
    <br />
    <span>{clockState}</span>
  </>
}

export default DigitalClock;
*/

/* INITIAL SOLUTION */

// class Clock extends React.Component{
//   state = {
//     months: {
//       1: {name:'January'},
//       2: {name:'February'},
//       3: {name:'March'},
//       4: {name:'April'},
//       5: {name:'May'},
//       6: {name:'June'},
//       7: {name:'July'},
//       8: {name:'August'},
//       9: {name:'September'},
//       10: {name:'October'},
//       11: {name:'November'}, 
//       12: {name:'December'}
//     },
//     date: "default",
//     time: {hour:0, min:0, sec:0}
//   }

//   render(){
//     return <>
//       <h4>Clock App</h4>
//       <div>
//         {/* <label><input type='radio' name='clockType' id='analog' checked/>Analog</label>
//         <label><input type='radio' name='clockType' id='digital'/>Digital</label>
//         <br/> */}
//         <span id='date'>{this.state.date}</span>
//         <br/>
//         <span id='hour'>{this.state.time.hour}</span>: <span id='min'>{this.state.time.min}</span>: <span id='sec'>{this.state.time.sec}</span>
//       </div>
//     </>
//   }

//   async componentDidMount() {
//     // console.log('mount', this);
//     try {
//       await this.getDateComp()
//       await this.getTimeComp() 
//     } catch (error) {
//       // console.log(error)
//     }
//   }

//   getDateComp = () => {
//     // console.log('date func',this.state.date);
//     const today = new Date();
//     const month = this.state.months[today.getMonth() + 1].name;
//     const date = today.getFullYear() + "-" + month + "-" + today.getDate();
//     this.setState({date});
//   }

//   getTimeComp = () => {
//     // console.log('time', this);
//     const currentTime = () => {
//       const today = new Date();
//       let h = today.getHours();
//       let m = today.getMinutes();
//       let s = today.getSeconds();
  
//       const time = this.state.time;
//       time.hour = (h < 10)? '0' + h : h;
//       time.min = (m < 10)? '0' + m : m;
//       time.sec = (s < 10)? '0' + s : s;
//       this.setState({time});
//     }
//     currentTime();
//     setInterval(currentTime, 1000);
//   }
// }

// export default Clock;