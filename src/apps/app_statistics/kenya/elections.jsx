import { useEffect, useState } from "react";

const url = `${window.location.origin}/data/kenya/elections/registered_voters.json`;

export default function Elections() {
  const [regvoters, setRegVoters] = useState([]);
  const fetchData = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    setRegVoters(jsonData.data);
  };
  const tableHeaders = (data) => {
    // console.log(data);
    const headers = ["code", "county", 2013, 2017, 2022];
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
            <td>{rd[2013]}</td>
            <td>{rd[2017]}</td>
            <td>{rd[2022]}</td>
          </tr>
        ))}
      </>
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      Kenya Elections: Registered Voters
      {regvoters.length && (
        <table>
          <thead>{tableHeaders(regvoters)}</thead>
          <tbody>{tableRows(regvoters)}</tbody>
        </table>
      )}
    </>
  );
}
