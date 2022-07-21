import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import { renderChart, getTitle, arrToStr } from "./chartUtils";

/** Datos example
 * [{year:2013, name:"mombasa", value:400},
 * {year:2014, name:"mombasa", value:470},
 * {year:2015, name:"mombasa", value:832}]
 * */
export default function Bar({ datos, title, main, x }) {
  echarts.use([
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
  ]);

  const barRef = useRef();

  const legendData = [...new Set(datos.map((dt) => dt[main]))];
  // console.log('legendData', legendData);
  const xData = [...new Set(datos.map((dt) => dt[x]))];
  // console.log('xData', xData);

  const labelOption = {
    show: false,
    position: "insideBottom",
    distance: 10,
    align: "left",
    verticalAlign: "middle",
    rotate: 90,
    formatter: "{c}  {name|{a}}",
    fontSize: 11,
    rich: {
      name: {},
    },
  };

  // Series data
  const series = legendData.reduce((acc, curr) => {
    // serie data
    const serieData = xData.reduce((xAcc, xCurr) => {
      const d = datos
        .filter((dt) => dt[main] === curr && dt[x] === xCurr)
        .map((dt) => dt.value)[0];
      xAcc.push(d);
      return xAcc;
    }, []);
    // serie object
    const serie = {
      name: curr.toString(),
      type: "bar",
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: serieData,
      large: true,
    };
    acc.push(serie);
    return acc;
  }, []);

  const option = {
    grid: {
      left: 80,
      right: 0,
      bottom: xData.length > 8 ? 100 : 70,
    },
    title: {
      show: false,
      text: getTitle(title),
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: arrToStr(legendData),
    },
    dataZoom: xData.length > 8 && [
      {
        type: "inside",
        start: 0,
        end: xData.length < 15 ? 50 : 30,
      },
      {
        start: 0,
        end: xData.length < 15 ? 50 : 30,
      },
    ],
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
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        axisLabel: {
          show: true,
          rotate: 45,
          fontSize: 11,
          interval: 0,
          width: 62,
          overflow: "truncate",
          ellipsis: "...",
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: series,
  };

  useEffect(() => {
    renderChart(echarts, option, barRef.current);
  }, []);

  return <div ref={barRef} className="chartDiv"></div>;
}
