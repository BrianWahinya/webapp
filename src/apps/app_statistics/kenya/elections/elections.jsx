import { useEffect, useState, Fragment } from "react";
import RegVotersPerCounty from "./regvoterspercounty";

const url = `${window.location.origin}/data/kenya/elections/registered_voters.json`;
const dataOrients = ["top", "bottom"];

export default function Elections() {
  const [regvoters, setRegVoters] = useState([]);
  const [dataOrient, setDataOrient] = useState("top");
  const fetchData = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    setRegVoters(jsonData.data);
  };
  const tableHeaders = (data) => {
    // console.log(data);
    const headers = ["code", "county", 2022, 2017, 2013];
    return (
      <tr>
        {headers.map((td) => (
          <th key={td}>{td}</th>
        ))}
      </tr>
    );
  };
  const tableRows = (rowdata) => {
    return (
      <>
        {rowdata.map((rd) => (
          <tr key={rd.code}>
            <td>{rd.code}</td>
            <td>{rd.county}</td>
            <td>{rd[2022]}</td>
            <td>{rd[2017]}</td>
            <td>{rd[2013]}</td>
          </tr>
        ))}
      </>
    );
  };

  const Choice = ({ op }) => {
    return <RegVotersPerCounty data={regvoters} option={op} />;
  };

  const changeOrient = (e) => {
    setDataOrient(e.target.id);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      Kenya Elections: Registered Voters
      <div>
        {dataOrients.map((op) => (
          <Fragment key={op}>
            <label htmlFor={op}>{op}</label>
            <input
              type="radio"
              key={op}
              id={op}
              name="data_options"
              checked={op === dataOrient}
              onChange={changeOrient}
            />
            &nbsp;
          </Fragment>
        ))}
      </div>
      {regvoters.length && <Choice op={dataOrient} />}
      {regvoters.length && (
        <details>
          <summary>Data-Table List</summary>
          <table>
            <thead>{tableHeaders(regvoters)}</thead>
            <tbody>{tableRows(regvoters)}</tbody>
          </table>
        </details>
      )}
    </>
  );
}
