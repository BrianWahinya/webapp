import { useState } from "react";
import AnalogClock from "./analog";
import DigitalClock from "./digital";

export default function Clock() {
  const [checkedClock, setCheckedClock] = useState("analog");

  const changeClock = (event) => {
    setCheckedClock(event.target.value);
  };

  return (
    <>
      <h5>Clock App</h5>
      <label htmlFor="digital">
        Digital:
        <input
          type="radio"
          value="digital"
          id="digital"
          name="clockRadio"
          onChange={changeClock}
          checked={checkedClock === "digital" ? true : false}
        />
      </label>
      <label htmlFor="analog">
        Analog:
        <input
          type="radio"
          value="analog"
          id="analog"
          name="clockRadio"
          onChange={changeClock}
          checked={checkedClock === "analog" ? true : false}
        />
      </label>
      <br />
      <>{checkedClock === "digital" ? <DigitalClock /> : <AnalogClock />}</>
    </>
  );
}
