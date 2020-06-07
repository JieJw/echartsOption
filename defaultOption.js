import { linearColors } from './colors';

const lineSeries = {
  showSymbol: false,
  lineStyle: {
    type: 'solid',
    shadowOffsetX: 0,
    shadowOffsetY: 2,
    shadowBlur: 6
  },
  label: {
    show: false,
    position: 'top',
    color: '#333',
    formatter: '{c}'
  }
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
    margin: '20%'
  }
};

const barSeries = {
  label: {
    show: false,
    position: 'top',
    formatter: '{c}',
    color: '#333'
  },
  barWidth: 10,
  itemStyle: {
    barBorderRadius: 5
  }
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
    show: false
  },
  axisLabel: { show: false },
  axisTick: { show: false },
  pointer: { show: false },
  axisLine: {
    lineStyle: {
      width: 6,
      shadowBlur: 0,
      color: [
        [0.5, '#2772FF'],
        [1, '#F2F2F2']
      ]
    }
  },
  detail: {
    show: false,
    offsetCenter: [0, '-10%'],
    rich: {
      name: {
        fontSize: 12,
        lineHeight: 12,
        color: '#2B2E33'
      },
      value: {
        fontSize: 16,
        lineHeight: 30,
        color: '#14CC81'
      }
    }
  }
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
  const { grid, tooltip, yAxis, xAxis, series = [], ...rest } = customize;
  // 判断serise内部是否使用的类目轴
  const seriesType = series.map(item => item.type);
  const bool = seriesType.some(item => ['bar', 'line'].includes(item));
  const defaultxAxis = [
    {
      type: 'category',
      nameLocation: 'end',
      nameTextStyle: {
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: 18
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
        interval: 0,
        inside: false
      },
      splitLine: {
        show: false,
        interval: 0,
        lineStyle: {
          color: '#ccc',
          width: 0.5,
          type: 'dashed',
          opacity: 0.5
        }
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: 12
      },
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false,
          margin: 5,
          color: '#999',
          fontFamily: 'PingFangSC-Regular, sans-serif',
          backgroundColor: 'none',
          fontSize: 8
        },
        lineStyle: {
          color: '#979797',
          width: 0.8
        },
        shadowStyle: {
          color: '#5594F2'
        },
        triggerTooltip: true
      }
    }
  ];
  const defaultyAxis = [
    {
      show: true,
      position: 'left',
      nameTextStyle: {
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: 18
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
        interval: 0,
        inside: false
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: 12
      },
      splitLine: {
        show: false,
        interval: 0,
        lineStyle: {
          color: '#ccc',
          width: 0.5,
          type: 'dashed',
          opacity: 0.5
        }
      }
    },
    {
      show: true,
      position: 'left',
      nameTextStyle: {
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: 18
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
        interval: 0,
        inside: false
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontSize: 12
      },
      splitLine: {
        show: false,
        interval: 0,
        lineStyle: {
          color: '#ccc',
          width: 0.5,
          type: 'dashed',
          opacity: 0.5
        }
      }
    }
  ];
  const defaultTooltip = {
    show: false,
    trigger: bool ? 'axis' : 'item',
    triggerOn: 'mousemove|click',
    confine: true,
    formatter: '{b}: {c}',
    backgroundColor: 'rgba(1,27,100,0.7)',
    textStyle: {
      fontSize: 10
    }
  };
  const tempSeries = series.map(item => getSeries(item));

  let tempxAxis = [];
  let tempyAxis = [];
  let tempTooltip = {};

  tempxAxis = xAxis ? objCombine(defaultxAxis, xAxis) : defaultxAxis;
  tempyAxis = yAxis ? objCombine(defaultyAxis, yAxis) : defaultyAxis;
  tempTooltip = tooltip ? objCombine(defaultTooltip, tooltip) : defaultTooltip;
  return {
    color: type ? linearColors() : null,
    tooltip: tempTooltip,
    grid: {
      containLabel: true,
      top: 10,
      left: 0,
      bottom: 0,
      right: 0,
      ...grid
    },
    xAxis: tempxAxis,
    yAxis: tempyAxis,
    series: tempSeries,
    // series,
    ...rest
  };
};

export default getOption;
