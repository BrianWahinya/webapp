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

  const mapData = reformattedData.filter((rd) => rd.year === years[0]);
  console.log("map", mapData);
  return (
    <>
      To view more visualizations select at least two counties.
      <Table data={sortedData} cols={["code", "county", 2022, 2017, 2013]} />
      <details>
        <summary>Map Chart</summary>
        <Map datos={mapData} />
      </details>
      <details open={counties.length > 8 || counties.length < 2}>
        <summary>Bar Chart</summary>
        <Bar datos={reformattedData} main="year" x="name" />
      </details>
      {counties.length < 14 && counties.length > 1 && (
        <details open>
          <summary>Nightingale Chart</summary>
          <Nightingale datos={nightingaleData} main="year" x="name" />
        </details>
      )}
    </>
  );
}
