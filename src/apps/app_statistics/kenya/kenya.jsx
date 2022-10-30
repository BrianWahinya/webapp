import { useState } from "react";
import Population from "./population";
import Elections from "./elections/elections";

import "./css/kenya.css";

const topics = {
  // population: <Population />,
  elections: <Elections />,
};

export default function Kenya() {
  const [topic, setTopic] = useState("elections");
  const changeTopic = (e) => {
    setTopic(e.target.value);
  };
  return (
    <div className="kenyaDiv">
      <div className="dataSelectors">
        <label htmlFor="topics">Topic: </label>
        <select name="topics" id="topics" value={topic} onChange={changeTopic}>
          {Object.keys(topics).map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>
      {topics[topic]}
    </div>
  );
}
