import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import * as kenya from "../charts/json_maps/kenya-counties.geo.json";

import { firstLetterUpper, renderChart, valReplaceComma } from "./chartUtils";

export default function Map({ datos }) {
  const mapRef = useRef();
  const values = [];
  const convertedData = datos.map((dt) => {
    const val = dt.value;
    values.push(val);
    return { name: firstLetterUpper(dt.name), value: val };
  });
  const max = Math.max(...values);
  const min = Math.min(...values);

  echarts.registerMap("kenya", kenya);
  const option = {
    title: {
      text: "Kenya Registered Voters (2022)",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
      confine: true,
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: 20,
      feature: {
        restore: {},
        saveAsImage: {
          type: "png",
        },
      },
    },
    visualMap: {
      left: "right",
      min: min,
      max: max,
      formatter: function (value) {
        return value === max || value === min
          ? ""
          : valReplaceComma(value.toFixed(0));
      },
      textStyle: {
        fontSize: 11,
      },
      inRange: {
        symbolSize: [10, 40],
        color: ["lightskyblue", "yellow", "orange", "red"],
      },
      text: [max, min],
      calculable: true,
      realtime: true,
    },
    series: [
      {
        name: "Kenya counties",
        type: "map",
        roam: true,
        map: "kenya",
        zoom: 1,
        colorBy: "data",
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
        data: convertedData,
      },
    ],
  };

  useEffect(() => {
    renderChart(echarts, option, mapRef.current);
  }, []);
  return <div ref={mapRef} className="chartDiv"></div>;
}
