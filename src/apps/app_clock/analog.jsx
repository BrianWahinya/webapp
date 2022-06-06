import { useEffect, useState } from "react";
import "./analog.css";

export default function AnalogClock() {
  const [time, setTime] = useState({
    hourRatio: 0,
    minuteRatio: 0,
    secondRatio: 0,
  });
  const [amPm, setAmPm] = useState("");
  const [date, setDate] = useState("");

  let sec = time.secondRatio / 60;
  let min = (sec + time.minuteRatio) / 60;
  let hour = (min + time.hourRatio) / 12;

  const dateTimeGen = () => {
    const currentDate = new Date();
    const localDate = currentDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const localTime = {
      hourRatio: currentDate.getHours(),
      minuteRatio: currentDate.getMinutes(),
      secondRatio: currentDate.getSeconds(),
    };
    const ampm = time.hourRatio >= 12 ? "PM" : "AM";

    setTime(localTime);
    setAmPm(ampm);
    if (date !== localDate) {
      setDate(localDate);
    }
  };

  useEffect(() => {
    dateTimeGen();
    const timer = setInterval(() => {
      dateTimeGen();
    }, 1000);

    // Stops the old timer.
    return function stopTimer() {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <p>{date}</p>
      <div className={`clock ${amPm}`}>
        <div
          className="hand hour"
          style={{ transform: `translate(-50%) rotate(${hour * 360}deg)` }}
        ></div>
        <div
          className="hand minute"
          style={{ transform: `translate(-50%) rotate(${min * 360}deg)` }}
        ></div>
        <div
          className="hand second"
          style={{ transform: `translate(-50%) rotate(${sec * 360}deg)` }}
        ></div>

        <div className="number number1">
          <div>1</div>
        </div>
        <div className="number number2">
          <div>2</div>
        </div>
        <div className="number number3">
          <div>3</div>
        </div>
        <div className="number number4">
          <div>4</div>
        </div>
        <div className="number number5">
          <div>5</div>
        </div>
        <div className="number number6">
          <div>6</div>
        </div>
        <div className="number number7">
          <div>7</div>
        </div>
        <div className="number number8">
          <div>8</div>
        </div>
        <div className="number number9">
          <div>9</div>
        </div>
        <div className="number number10">
          <div>10</div>
        </div>
        <div className="number number11">
          <div>11</div>
        </div>
        <div className="number number12">
          <div>12</div>
        </div>
      </div>
    </>
  );
}
