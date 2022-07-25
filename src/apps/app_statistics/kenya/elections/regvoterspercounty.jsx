import Bar from "../../charts/bar";
import Map from "../../charts/map";
import Nightingale from "../../charts/nightingale";
import Table from "../../charts/table";

export default function RegVotersPerCounty({ data, option, selected }) {
  const filteredData =
    selected.length < 1
      ? data
      : data.filter((dt) => selected.includes(dt.county));
  const yearSort = 2022;
  const sortedData =
    option === "descending"
      ? filteredData.sort((a, b) => b[yearSort] - a[yearSort])
      : filteredData.sort((a, b) => a[yearSort] - b[yearSort]);

  const years = [2022, 2017, 2013];
  const counties = [...new Set(sortedData.map((dt) => dt.county))];
  const reformattedData = counties.reduce((acc, curr) => {
    const county_data = years.reduce((yAcc, yCurr) => {
      const cyd = sortedData.filter((sd) => sd.county === curr)[0];
      yAcc.push({ year: yCurr, name: curr, value: cyd[yCurr] });
      return yAcc;
    }, []);
    acc.push(...county_data);
    return acc;
  }, []);

  const nightingaleData = reformattedData.filter(
    (rd) => rd.year === years[0] || rd.year === years[1],
  );
  const nightCounties = counties.slice(0, 13);
  const nightingaleDatos =
    selected.length > 0
      ? nightingaleData
      : nightingaleData.filter((nd) => nightCounties.includes(nd.name));
  const mapData = reformattedData.filter((rd) => rd.year === years[0]);

  return (
    <>
      <Table data={sortedData} cols={["code", "county", 2022, 2017, 2013]} />
      <details open={counties.length === 1}>
        <summary>Bar Chart</summary>
        <Bar datos={reformattedData} main="year" x="name" />
      </details>
      <details open={counties.length < 13 && counties.length > 1}>
        <summary>Nightingale Chart</summary>
        <Nightingale datos={nightingaleDatos} main="year" x="name" />
      </details>
      <details open={counties.length > 8 || counties.length < 1}>
        <summary>Map Chart</summary>
        <Map datos={mapData} />
      </details>
    </>
  );
}
