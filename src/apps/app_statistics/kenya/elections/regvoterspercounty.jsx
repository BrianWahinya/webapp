import Bar from "../../charts/bar";

export default function RegVotersPerCounty({ data, option }) {
  const yearSort = 2022;
  const numShow = 10;
  const sortedData = (
    option === "top"
      ? data.sort((a, b) => b[yearSort] - a[yearSort])
      : data.sort((a, b) => a[yearSort] - b[yearSort])
  ).slice(0, numShow);

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

  return <Bar datos={reformattedData} main="year" x="name" />;
}
