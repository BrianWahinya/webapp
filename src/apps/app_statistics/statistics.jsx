import React, { useState } from "react";
import Kenya from "./kenya/kenya";
import World from "./world/world";

const options = {
  world: <World />,
  kenya: <Kenya />,
};

export default function Statistics() {
  const [option, setOption] = useState("kenya");
  const changeOption = (e) => {
    setOption(e.target.id);
  };
  return (
    <div className="statistics">
      <h5>Statistics</h5>
      <code>Men at work!! &#128187;Coding in progress</code>
      <div>
        {Object.keys(options).map((op) => (
          <React.Fragment key={op}>
            <label htmlFor={op}>{op}</label>
            <input
              type="radio"
              key={op}
              id={op}
              name="options"
              checked={op === option}
              onChange={changeOption}
            />
            &nbsp;
          </React.Fragment>
        ))}
      </div>
      {options[option]}
    </div>
  );
}
