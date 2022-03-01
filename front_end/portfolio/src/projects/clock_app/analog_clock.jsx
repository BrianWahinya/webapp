import React from "react";
import '../../styles/clock_analog.css';

function AnalogClock({hourRatio, minuteRatio, secondRatio, ampm}){

  const sec = secondRatio / 60;
  const min = (sec + minuteRatio) / 60;
  const hour = (min + hourRatio) / 12;
  return (
    <>
      {/* <div>{localTime}</div> */}
      <div className={`clock ${ampm}`}>
        <div className="hand hour" style={{transform:`translate(-50%) rotate(${hour * 360}deg)`}}></div>
        <div className="hand minute" style={{transform:`translate(-50%) rotate(${min * 360}deg)`}}></div>
        <div className="hand second" style={{transform:`translate(-50%) rotate(${sec * 360}deg)`}}></div>

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
  )
}

export default AnalogClock;