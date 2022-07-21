import Bar from "../../charts/bar";
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

  const years = [2013, 2017, 2022];
  const reformattedData = [
    ...new Set(sortedData.map((dt) => dt.county)),
  ].reduce((acc, curr) => {
    const county_data = years.reduce((yAcc, yCurr) => {
      const cyd = sortedData.filter((sd) => sd.county === curr)[0];
      yAcc.push({ year: yCurr, name: curr, value: cyd[yCurr] });
      return yAcc;
    }, []);
    acc.push(...county_data);
    return acc;
  }, []);

  return (
    <>
      <Bar datos={reformattedData} main="year" x="name" />
      <Table data={sortedData} cols={["code", "county", 2022, 2017, 2013]} />
    </>
  );
}
