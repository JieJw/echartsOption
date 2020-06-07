import { linearColors } from './colors';

const lineSeries = {
  showSymbol: false,
  lineStyle: {
    type: 'solid',
  },
  label: {
    show: false,
    position: 'top',
    color: '#333',
    formatter: '{c}',
  },
};
const pieSeries = {
  selectedOffset: 5,
  hoverOffset: 5,
  radius: ['55%', '85%'],
  hoverAnimation: false,
  label: {
    show: false,
    position: 'outside',
    formatter: '{b}:{c}',
    margin: '20%',
  },
};

const barSeries = {
  label: {
    show: false,
    position: 'top',
    formatter: '{c}',
    color: '#333',
  },
  barWidth: 10,
  itemStyle: {
    barBorderRadius: 5,
  },
};

const gaugeSeries = {
  center: ['50%', '70%'],
  type: 'gauge',
  name: '项目名称',
  radius: '100%',
  splitNumber: 0,
  startAngle: 180,
  endAngle: 0,
  splitLine: {
    show: false,
  },
  axisLabel: { show: false },
  axisTick: { show: false },
  pointer: { show: false },
  axisLine: {
    lineStyle: {
      width: 6,
      shadowBlur: 0,
      color: [[0.5, '#2772FF'], [1, '#F2F2F2']],
    },
  },
  detail: {
    show: false,
    offsetCenter: [0, '-10%'],
    rich: {
      name: {
        fontSize: 12,
        lineHeight: 12,
        color: '#2B2E33',
      },
      value: {
        fontSize: 16,
        lineHeight: 30,
        color: '#14CC81',
      },
    },
  },
};

// 合并对象,obj1是默认对象， obj2是传入对象
function objCombine(...obj) {
  const bool = obj.some(item => Array.isArray(item));
  const res = bool ? [] : {};

  function combine(key, item, res) {
    const isObj = typeof item[key] === 'object';
    if (isObj) {
      if (!res[key]) {
        res[key] = Array.isArray(res[key]) ? [] : {};
      }
      // 判断数组直接拷贝
      if (Array.isArray(item[key])) {
        res[key] = item[key];
      } else {
        Object.keys(item[key]).forEach(_item => {
          combine(_item, item[key], res[key]);
        });
      }
    } else {
      res[key] = item[key];
    }
  }
  obj.forEach(item => {
    Object.keys(item).forEach(key => {
      combine(key, item, res);
    });
  });

  return res;
}

const getSeries = item => {
  switch (item.type || 'line') {
    case 'line':
      return objCombine(lineSeries, item);
    case 'bar':
      return objCombine(barSeries, item);
    case 'pie':
      return objCombine(pieSeries, item);
    case 'gauge':
      return objCombine(gaugeSeries, item);
    default:
      return item;
  }
};

const getOption = (customize, type = false) => {
  const { grid, tooltip, yAxis, xAxis, series, legend, ...rest } = customize;
  const defaultxAxis = [
    {
      type: 'category',
      nameTextStyle: {
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: '22px',
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          type: 'dashed',
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: '22px',
      },
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false,
        },
        lineStyle: {
          color: '#979797',
          width: 1,
        },
        shadowStyle: {
          color: '#5594F2',
        },
        triggerTooltip: false,
      },
    },
  ];

  const defaultyAxis = [
    {
      show: true,
      data: yAxis.data,
      type: 'value',
      nameTextStyle: {
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: '22px',
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: '22px',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          type: 'dashed',
        },
      },
    },
    {
      show: true,
      data: yAxis.data,
      type: 'value',
      nameTextStyle: {
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: '22px',
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: '22px',
        lineHeight: '30px',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          type: 'dashed',
        },
      },
    },
  ];

  const defaultTooltip = {
    show: true,
    triggerOn: 'mousemove|click',
    confine: true,
    formatter: '{b}: {c}',
    backgroundColor: 'rgba(1,27,100,0.7)',
    textStyle: {
      fontSize: 10,
    },
  };
  const tempSeries = series.map(item => getSeries(item));
  const defautlLegend = {
    selectedMode: false,
  };

  let tempxAxis = [];
  let tempyAxis = [];
  let tempTooltip = {};
  let tempLegend = {};
  const yAxisStandard = {
    type: 'value',
    data: yAxis.data,
    // 轴线
    axisLine: {
      show: true,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      fontFamily: 'PingFangSC-Regular, sans-serif',
      fontSize: '22px',
    },
    splitLine: {
      // show: true,
      lineStyle: {
        color: '#ccc',
        type: 'dashed',
      },
    },
  };
  tempyAxis =
    yAxis instanceof Array
      ? yAxis.map(item => {
          return Object.assign({}, yAxisStandard, item);
        })
      : Object.assign(yAxisStandard, yAxis || {});
  tempxAxis = xAxis ? objCombine(defaultxAxis, xAxis) : defaultxAxis;
  // tempyAxis = yAxis ? objCombine(defaultyAxis, yAxis) : defaultyAxis;
  tempTooltip = tooltip ? objCombine(defaultTooltip, tooltip) : defaultTooltip;
  tempLegend = legend ? objCombine(defautlLegend, legend) : defautlLegend;
  return {
    color: type ? linearColors() : null,
    tooltip: tempTooltip,
    legend: tempLegend,
    grid: {
      containLabel: true,
      top: 10,
      left: 0,
      bottom: 0,
      right: 0,
      ...grid,
    },
    xAxis: tempxAxis,
    yAxis: tempyAxis,
    series: tempSeries,
    // series,
    ...rest,
  };
};

export default getOption;
