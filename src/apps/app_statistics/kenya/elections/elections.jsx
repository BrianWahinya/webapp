import { useEffect, useState, Fragment } from "react";
import { Loader } from "../../../../components";
import SelectMultiple from "../../../../components/selectmultiple/selectmultiple";
import RegVotersPerCounty from "./regvoterspercounty";

const url = `${window.location.origin}/data/kenya/elections/registered_voters.json`;
const dataOrients = ["ascending", "descending"];

export default function Elections() {
  const [regvoters, setRegVoters] = useState([]);
  const [dataOrient, setDataOrient] = useState("descending");
  const [counties, setCounties] = useState([]);
  const [selectCounties, setSelectCounties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(url);
    const jsonData = await data.json();
    const jsonCounties = [...new Set(jsonData.data.map((jd) => jd.county))];
    setCounties(jsonCounties);
    setRegVoters(jsonData.data);
    setLoading(false);
  };

  const selectCallback = (selected) => {
    setSelectCounties((sc) => [...selected]);
  };

  const Choice = ({ rg, op, sc }) => {
    return <RegVotersPerCounty data={rg} option={op} selected={sc} />;
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
        <SelectMultiple selectData={counties} callback={selectCallback} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Choice rg={regvoters} op={dataOrient} sc={selectCounties} />
      )}
    </>
  );
}
