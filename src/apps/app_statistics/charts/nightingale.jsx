import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

import { renderChart } from "./chartUtils";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

export default function Nightingale({ datos, main, x }) {
  const nightRef = useRef();

  const uniqueMain = [...new Set(datos.map((ds) => ds[main]))];
  const series = uniqueMain.reduce((acc, curr) => {
    // serie data
    const data = datos.filter((ds) => ds[main] === curr);
    acc.push(data);
    return acc;
  }, []);

  const option = {
    title: [
      {
        text: `Comparison ${uniqueMain.join(", ")}`,
        subtext: "",
        left: "center",
      },
      {
        subtext: "2017",
        left: "69.5%",
        top: "46%",
        textAlign: "center",
        subtextStyle: {
          fontWeight: "bold",
        },
      },
      {
        subtext: "2022",
        left: "19.5%",
        top: "46%",
        textAlign: "center",
        subtextStyle: {
          fontWeight: "bold",
        },
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      confine: true,
    },
    legend: {
      left: "center",
      top: 40,
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "top",
      feature: {
        mark: { show: true },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: uniqueMain[0],
        type: "pie",
        radius: ["10%", "60%"],
        center: ["20%", "50%"],
        roseType: "radius",
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        data: series[0],
      },
      {
        name: uniqueMain[1],
        type: "pie",
        radius: ["10%", "60%"],
        center: ["70%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        data: series[1],
      },
    ],
  };

  useEffect(() => {
    renderChart(echarts, option, nightRef.current);
  }, []);
  return <div ref={nightRef} className="chartDiv"></div>;
}
