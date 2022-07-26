import { useState } from "react";

const sortingAlgos = [
  { id: "heap", name: "Heap Sort" },
  { id: "quick", name: "Quick Sort" },
  { id: "radix", name: "Radix Sort" },
  { id: "merge", name: "Merge Sort" },
  { id: "bucket", name: "Bucket Sort" },
  { id: "bubble", name: "Bubble Sort" },
  { id: "insertion", name: "Insertion Sort" },
  { id: "selection", name: "Selection Sort" },
];
export default function SortAlgo() {
  const [selectedAlgo, setSelectedAlgo] = useState("quick");
  const changeSelectedAlgo = (e) => {
    setSelectedAlgo(e.target.value);
  };
  return (
    <div>
      <p>
        <u>Sorting Algorithms</u>
      </p>
      <select
        value={selectedAlgo}
        name="sortingAlgos"
        onChange={changeSelectedAlgo}
      >
        {sortingAlgos.map((sa) => (
          <option key={sa.id} value={sa.id}>
            {sa.name}
          </option>
        ))}
      </select>
    </div>
  );
}
