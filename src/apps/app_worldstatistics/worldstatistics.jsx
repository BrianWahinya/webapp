import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "./worldstatistics.css";
import * as world from "./world.geo.json";

export default function WorldStatistics() {
  const [data, setData] = useState([]);
  const echartsRef = useRef();

  echarts.registerMap("world", world);
  const option = (datos) => ({
    title: {
      text: "World Population Estimates (2022)",
      subtext: "Data from Rest-Countries API",
      sublink: "https://restcountries.com/v3/all?fields=name,population",
      left: "left",
      textStyle: {
        fontSize: 14,
        width: 200,
        overflow: "breakAll",
      },
    },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: "right",
      top: "top",
      feature: {
        restore: {},
        saveAsImage: {
          type: "png",
        },
      },
    },
    visualMap: {
      left: "right",
      min: 500000,
      max: 380000000,
      inRange: {
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
      text: ["High", "Low"],
      calculable: true,
    },
    series: [
      {
        name: "World Pop Est.",
        type: "map",
        roam: true,
        map: "world",
        emphasis: {
          label: {
            show: true,
          },
        },
        data: datos.map((dt) => {
          return { name: dt.name.common, value: dt.population };
        }),
      },
    ],
  });

  const renderMap = (option) => {
    const myChart = echarts.init(echartsRef.current);
    myChart.setOption(option);
    window.onresize = function () {
      myChart.resize();
    };
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://restcountries.com/v3/all?fields=name,population",
      );
      const jsonData = await response.json();
      // console.log(jsonData);
      setData(jsonData);
      renderMap(option(jsonData));
    };
    getData();
  }, []);

  // const dataFormat = (datos) => {
  //   const sortData = datos.sort((a, b) => b.population - a.population);
  //   return (
  //     <ol>
  //       {sortData.map((sd) => (
  //         <li key={sd.name.common}>
  //           {sd.name.common}: {sd.population}
  //         </li>
  //       ))}
  //     </ol>
  //   );
  // };

  return (
    <>
      <h5>World Statistics</h5>
      <p>Population</p>
      <div ref={echartsRef} className="echartsDiv"></div>
      {/* {data.length && dataFormat(data)} */}
    </>
  );
}
