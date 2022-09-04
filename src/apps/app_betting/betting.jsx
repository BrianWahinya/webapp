import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import "lodash.multipermutations";
import _ from "lodash";
import { FaIcon, Table } from "../../components";
import Badge from "./badge";

import "../../components/table/table.css";

function differentFlagPermutations(X, arr, trial) {
  let ml = [];
  ml = arr;
  for (let i = 0; i < ml.length; i++) {
    const txt = ml[i].repeat(X);
    if (!trial.includes(txt) & (txt.length === X)) {
      trial.push(txt);
    }
  }

  let count = ml.length;

  // Traverse all possible lengths
  for (let z = 0; z < X - 1; z++) {
    // Stores all combinations
    // of length z
    let tmp = [];

    // Traverse the array
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < ml.length; k++) {
        // Generate all
        // combinations of length z
        tmp.push(ml[k] + arr[i]);
        count += 1;
      }
    }

    // Print all combinations of length z
    for (let i = 0; i < tmp.length; i++) {
      const txt = tmp[i];
      if (!trial.includes(txt) & (txt.length === X)) {
        trial.push(txt);
      }
    }

    // Replace all combinations of length z - 1
    // with all combinations of length z
    ml = tmp;
  }
}

export default function Betting() {
  const [teams, setTeams] = useState({
    teamA: "",
    teamB: "",
    result: "undecided",
  });
  const [games, setGames] = useState([]);
  const [probability, setProbability] = useState(0);
  const [tbData, setTbData] = useState([]);

  const changeTeams = (e) => {
    const { id, value } = e.target;
    setTeams((tms) => ({ ...tms, [id]: value }));
  };
  const selectResult = (e) => {
    setTeams((tms) => ({ ...tms, result: e.target.value }));
  };
  const submitGame = () => {
    if (teams.teamA && teams.teamB) {
      const modGame = { id: uuid(), ...teams };
      setGames((gms) => [...gms, modGame]);
      setTeams({
        teamA: "",
        teamB: "",
        result: "undecided",
      });
    }
  };
  const deleteAllGames = () => {
    setGames([]);
  };
  const deleteGame = (e) => {
    // console.log(e);
    const gmId = e.currentTarget.id;
    setGames((gms) => {
      return gms.filter((gm) => gm.id !== gmId);
    });
  };

  useEffect(() => {
    // console.log(games);
    // console.log(games.length);
    const gamesLen = games.length;
    const probs = gamesLen === 0 ? 0 : Math.pow(3, gamesLen);
    setProbability(probs);
    let arr = [
      ..."w".repeat(probs / 3),
      ..."d".repeat(probs / 3),
      ..."l".repeat(probs / 3),
    ];
    // console.log(arr);
    let r = gamesLen;
    let n = arr.length;
    // const trial = [];
    // differentFlagPermutations(r, arr, trial);
    // console.log(trial);

    let perms = _.multipermutations(["w", "l", "d"], gamesLen);
    // console.log(perms);
    setTbData(perms);
  }, [games]);

  return (
    <div>
      <h5>Betting</h5>
      <div>
        <input
          id="teamA"
          placeholder="Team A"
          value={teams.teamA}
          onChange={changeTeams}
        />
        &nbsp;&nbsp; vs &nbsp;&nbsp;
        <input
          id="teamB"
          placeholder="Team B"
          value={teams.teamB}
          onChange={changeTeams}
        />
        <select onChange={selectResult} value={teams.result}>
          <option value="win">Win</option>
          <option value="draw">Draw</option>
          <option value="lose">Lose</option>
          <option value="undecided">Undecided</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={submitGame} className="btn btn-sm btn-success">
          Enter
        </button>
        &nbsp;&nbsp;
        <button onClick={deleteAllGames} className="btn btn-sm btn-danger">
          Delete All
        </button>
      </div>
      <div>
        <p>All possible permutations: {probability}</p>
        {games.map((gm) => (
          <div key={gm.id}>
            {gm.teamA} - {gm.teamB}
            &nbsp;&nbsp;
            <Badge name={gm.result} />
            &nbsp;&nbsp;
            <button
              id={gm.id}
              onClickCapture={deleteGame}
              className="btn btn-sm btn-danger"
            >
              <FaIcon name="delete" />
            </button>
          </div>
        ))}
      </div>
      <div className="tableDiv">
        <table>
          <thead>
            <tr>
              {games.map((gm) => (
                <th key={gm.id}>
                  {gm.teamA} - {gm.teamB}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbData.map((td, idx1) => (
              <tr key={idx1}>
                {td.map((res, idx2) => (
                  <td key={`${idx1}-${idx2}`}>{res}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
