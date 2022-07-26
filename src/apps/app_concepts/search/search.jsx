import { useState } from "react";

const searchingAlgos = [
  { id: "jump", name: "Jump Search" },
  { id: "linear", name: "Linear Search" },
  { id: "binary", name: "Binary Search" },
  { id: "fibonacci", name: "Fibonacci Search" },
  { id: "exponential", name: "Exponential Search" },
  { id: "interpolation", name: "Interpolation Search" },
];
export default function SearchAlgo() {
  const [selectedAlgo, setSelectedAlgo] = useState("linear");
  const changeSelectedAlgo = (e) => {
    setSelectedAlgo(e.target.value);
  };
  return (
    <div>
      <p>
        <u>Searching Algorithms</u>
      </p>
      <select
        value={selectedAlgo}
        name="searchingAlgos"
        onChange={changeSelectedAlgo}
      >
        {searchingAlgos.map((sa) => (
          <option key={sa.id} value={sa.id}>
            {sa.name}
          </option>
        ))}
      </select>
    </div>
  );
}
