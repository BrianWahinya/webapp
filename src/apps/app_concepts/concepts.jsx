import { useState } from "react";
import SearchAlgo from "./search/search";
import SortAlgo from "./sort/sort";

export default function Concepts() {
  const [state, setState] = useState("sort");
  const algos = {
    sort: <SortAlgo />,
    search: <SearchAlgo />,
  };

  const selectConcept = (e) => {
    setState(e.target.id);
  };

  return (
    <div>
      <code>Men at work!! &#128187;Coding in progress</code>
      <p>This page will visualize how various programming algorithms work</p>

      <label htmlFor="sort">Sorting</label>
      <input
        type="radio"
        name="concepts"
        id="sort"
        value="sort"
        onChange={selectConcept}
        defaultChecked
      />
      <label htmlFor="search">Searching</label>
      <input
        type="radio"
        name="concepts"
        id="search"
        value="search"
        onChange={selectConcept}
      />
      {algos[state]}
    </div>
  );
}
