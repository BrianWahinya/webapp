import React, { useState } from "react";
import { Breadcrumbs } from "../../components";
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
    <>
      <Breadcrumbs crumbs={["home", "app", "statistics"]} />
      <div className="statistics">
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
    </>
  );
}
