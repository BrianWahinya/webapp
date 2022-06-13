import { useState } from "react";
import "./stopwatch.css";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timer, setTimer] = useState(0);

  const start = (e) => {
    if (!timerOn) {
      setTimerOn(true);
      const interval = setInterval(() => {
        setTime((tm) => (tm += 100));
      }, 100);
      setTimer(interval);
    }
  };
  const stop = (e) => {
    if (timerOn) {
      setTimerOn(false);
      clearInterval(timer);
      setTimer(0);
    }
  };
  const reset = () => {
    setTimerOn(false);
    clearInterval(timer);
    setTimer(0);
    setTime(0);
  };
  const resume = () => {
    if (time !== 0) {
      setTimerOn(true);
      const interval = setInterval(() => {
        setTime((tm) => (tm += 100));
      }, 100);
      setTimer(interval);
    }
  };
  const timeFormat = (tm) => {
    const hr = Math.floor(tm / 3600000);
    const min = Math.floor((tm / 60000) % 60);
    const sec = Math.floor((tm / 1000) % 60);
    const mil = Math.floor((tm / 10) % 100);
    return {
      hr: hr < 10 ? `0${hr}` : hr,
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec,
      mil: mil < 10 ? `0${mil}` : mil,
    };
  };

  return (
    <>
      <h5>Stop Watch</h5>
      <div className="time">
        {timeFormat(time).hr !== "00" && <span>{timeFormat(time).hr}:</span>}
        <span>{timeFormat(time).min}:</span>
        <span>{timeFormat(time).sec}:</span>
        <span>{timeFormat(time).mil}</span>
      </div>
      <div className="timeBtnDiv">
        {!timerOn && time === 0 && (
          <button className="btn btn-sm btn-primary" onClick={start}>
            Start
          </button>
        )}
        {timerOn && time !== 0 && (
          <button className="btn btn-sm btn-warning" onClick={stop}>
            Stop
          </button>
        )}
        {!timerOn && time !== 0 && (
          <button className="btn btn-sm btn-info" onClick={resume}>
            Resume
          </button>
        )}
        {time !== 0 && (
          <button className="btn btn-sm btn-secondary" onClick={reset}>
            Reset
          </button>
        )}
      </div>
    </>
  );
}

/****************************SOLUTION 2*********************************/

/*
import { useEffect, useState } from "react";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((tm) => (tm += 100));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const start = (e) => {
    setTimerOn(true);
  };
  const stop = (e) => {
    setTimerOn(false);
  };
  const reset = (e) => {
    setTimerOn(false);
    setTime(0);
  };
  const resume = (e) => {
    setTimerOn(true);
  };
  const timeFormat = (tm) => {
    const hr = Math.floor(tm / 3600000);
    const min = Math.floor((tm / 60000) % 60);
    const sec = Math.floor((tm / 1000) % 60);
    const mil = Math.floor((tm / 10) % 100);
    return {
      hr: hr < 10 ? `0${hr}` : hr,
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec,
      mil: mil < 10 ? `0${mil}` : mil,
    };
  };

  return (
    <>
      <h5>Stop Watch</h5>
      <div>
        {timeFormat(time).hr !== "00" && <span>{timeFormat(time).hr}:</span>}
        <span>{timeFormat(time).min}:</span>
        <span>{timeFormat(time).sec}:</span>
        <span>{timeFormat(time).mil}</span>
      </div>
      <div>
        {!timerOn && time === 0 && <button onClick={start}>Start</button>}
        {timerOn && time !== 0 && <button onClick={stop}>Stop</button>}
        {!timerOn && time !== 0 && <button onClick={resume}>Resume</button>}
        {time !== 0 && <button onClick={reset}>Reset</button>}
      </div>
    </>
  );
}

*/
