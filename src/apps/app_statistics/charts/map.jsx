import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import * as kenya from "../charts/json_maps/kenya-counties.geo.json";

import { firstLetterUpper, renderChart } from "./chartUtils";

export default function Map({ datos }) {
  const mapRef = useRef();

  echarts.registerMap("kenya", kenya);
  const option = {
    title: {
      text: "Kenya Registered Voters (2022)",
      subtext: "<<<<-- Still being coded -->>>>",
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
      min: 70000,
      max: 3000000,
      formatter: function (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      inRange: {
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
        name: "Kenya counties",
        type: "map",
        roam: true,
        map: "kenya",
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
          console.log(dt);
          return { name: firstLetterUpper(dt.name), value: dt.value };
        }),
      },
    ],
  };

  useEffect(() => {
    renderChart(echarts, option, mapRef.current);
  }, []);
  return <div ref={mapRef} className="chartDiv"></div>;
}
