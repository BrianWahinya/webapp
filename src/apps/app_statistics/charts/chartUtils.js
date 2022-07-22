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
  return (
    replaceMapName(name.toLowerCase()) ||
    `${name[0].toUpperCase()}${name.substr(1).toLowerCase()}`
  );
};

export const replaceMapName = (name) => {
  const dict = {
    "tharaka - nithi": "Tharaka",
    "tana river": "Tana River",
    "taita taveta": "Taita Taveta",
    "west pokot": "West Pokot",
    "elgeyo/marakwet": "Elgeyo Marakwet",
    "homa bay": "Homa Bay",
    "uasin gishu": "Uasin Gishu",
    "trans nzoia": "Trans Nzoia",
  };
  return dict[name] || false;
};

export const valReplaceComma = (value, elem) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, elem || " ");
};
