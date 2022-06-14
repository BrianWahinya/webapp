import { useEffect, useState } from "react";

export default function WorldStatistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://restcountries.com/v3/all?fields=name,population",
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    };
    getData();
  }, []);

  const dataFormat = (datos) => {
    const sortData = datos.sort((a, b) => b.population - a.population);
    return (
      <ol>
        {sortData.map((sd) => (
          <li key={sd.name.common}>
            {sd.name.common}: {sd.population}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <>
      <h5>World Statistics</h5>
      <p>Population</p>
      {data.length && dataFormat(data)}
    </>
  );
}
