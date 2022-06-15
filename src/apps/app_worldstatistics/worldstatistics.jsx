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
      min: 10000000,
      max: 200000000,
      formatter: function (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      inRange: {
        // color: ["#b4c7ad", "#86a879", "#629150", "#396e25", "#1c4d0b"],
        // ["#f0efeb",
        // "#E9E5D6",
        // "#ACB992",
        // "#a6bd60",
        // "#6f7d46",
        // "#566e27",
        // "#464E2E",
        // "#362706",]
        color: [
          "#f0efeb",
          "#d6e3e9",
          "#92adb9",
          "#6090bd",
          "#46487d",
          "#27286e",
          "#2f2e4e",
          "#0d0636",
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
        zoom: 1,
        colorBy: "data",
        left: "5%",
        scaleLimit: {
          min: 0.7,
          max: 4,
        },
        aspectScale: 1,
        emphasis: {
          label: {
            show: true,
            color: "#012940",
          },
          itemStyle: {
            areaColor: "#dcecf5",
            borderColor: "#026b31",
            borderWidth: 1.2,
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
