import { useState } from "react";
import Population from "./population";
const topics = {
  population: <Population />,
};

export default function World() {
  const [topic, setTopic] = useState("population");
  const changeTopic = (e) => {
    setTopic(e.target.value);
  };
  return (
    <div>
      <label htmlFor="topics">Topic: </label>
      <select name="topics" id="topics" value={topic} onChange={changeTopic}>
        {Object.keys(topics).map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      <div>{topics[topic]}</div>
    </div>
  );
}
