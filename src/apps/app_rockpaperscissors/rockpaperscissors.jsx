import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToiletPaper,
  faHandBackFist,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumbs } from "../../components";
import "./rockpaperscissors.css";

export default function RockPaperScissors() {
  const [userOption, setUserOption] = useState("");
  const [compOption, setCompOption] = useState("");
  const [winner, setWinner] = useState("");
  const [previousResults, setPreviousResults] = useState([]);
  const userClick = (e) => {
    const userSelect = parseInt(e.target.id);
    const compSelect = Math.floor(Math.random() * 3) + 1;
    console.log("User: ", userSelect);
    console.log("Comp: ", compSelect);
    setCompOption(compSelect);
    setUserOption(userSelect);
    setWinner(winnerSelect(compSelect, userSelect));
  };
  const winnerSelect = (comp, user) => {
    let winner;
    switch (true) {
      case comp === user:
        winner = "draw";
        break;
      case comp === 1 && user === 3:
        winner = "comp";
        break;
      case comp === 2 && user === 1:
        winner = "comp";
        break;
      case comp === 3 && user === 2:
        winner = "comp";
        break;
      default:
        winner = "user";
    }
    const prevResults = [winner, ...previousResults];
    setPreviousResults(prevResults);
    return winner;
  };
  const reset = () => {
    console.log("User clicked: reset");
    setCompOption("");
    setUserOption("");
    setWinner("");
    setPreviousResults([]);
  };

  return (
    <>
      <Breadcrumbs crumbs={["home", "app", "rockpaperscissors"]} />
      <h5>Rock-Paper-Scissors Game</h5>
      <div className="gameDiv">
        <div>
          You: {userOption} vs Comp {compOption}
        </div>
        <div>Winner: {winner}</div>
        <div>
          <button className="btn btn-sm btn-primary" id="1" onClick={userClick}>
            Rock <FontAwesomeIcon icon={faHandBackFist} />
          </button>
          <button className="btn btn-sm btn-warning" id="2" onClick={userClick}>
            Paper <FontAwesomeIcon icon={faToiletPaper} />
          </button>
          <button className="btn btn-sm btn-info" id="3" onClick={userClick}>
            Scissors <FontAwesomeIcon icon={faScissors} />
          </button>
        </div>
        <div>
          <button className="btn btn-sm btn-secondary" onClick={reset}>
            Reset
          </button>
        </div>
        <div>
          Previous results:
          {previousResults.map((res, index) => (
            <p key={index}>{res}</p>
          ))}
        </div>
      </div>
    </>
  );
}
