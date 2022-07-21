import { useEffect } from "react";
import { useState } from "react";
import "./selectmultiple.css";

export default function SelectMultiple({ selectData, callback }) {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState([]);

  const showCheckboxes = () => {
    setExpanded((ex) => !ex);
  };
  const changeChecked = (e) => {
    if (e.target.checked) {
      setChecked((chk) => [...chk, e.target.id]);
    } else {
      setChecked((chk) => [...chk.filter((ck) => ck !== e.target.id)]);
    }
  };
  const displaySelectData = (datos) => {
    return (
      <>
        {datos.map((dt) => (
          <label htmlFor={dt} key={dt}>
            <input type="checkbox" id={dt} onChange={changeChecked} />
            &nbsp;{dt}
          </label>
        ))}
      </>
    );
  };
  useEffect(() => {
    callback(checked);
  }, [checked]);

  return (
    <div className="multiselect">
      <div className="selectBox" onClick={showCheckboxes}>
        <select>
          <option>
            {checked.length > 0 ? checked.join(",") : "Select counties"}
          </option>
        </select>
        <div className="overSelect"></div>
      </div>
      {selectData && (
        <div
          id="checkboxes"
          className={expanded ? "showCheckboxes" : "hideCheckboxes"}
        >
          {displaySelectData(selectData)}
        </div>
      )}
    </div>
  );
}
