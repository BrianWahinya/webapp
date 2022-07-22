export const renderChart = (echarts, option, ref) => {
  const myChart = echarts.init(ref);
  myChart.setOption(option, true);
  window.onresize = function () {
    myChart.resize();
  };
};

export const getTitle = (title) => {
  return title ? title : `brianweb_${Date.now()}`;
};

export const arrToStr = (arr) => {
  return arr.map((elem) => elem.toString());
};

export const firstLetterUpper = (name) => {
  return `${name[0].toUpperCase()}${name.substr(1)}`;
};
