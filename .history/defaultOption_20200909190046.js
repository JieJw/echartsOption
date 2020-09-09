import { linearColors } from './colors';
require('echarts/map/js/china.js');
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
    barBorderRadius: 0
  }
};

const gaugeSeries = {
  center: ['50%', '50%'],
  type: 'gauge',
  name: '项目名称',
  radius: '96%',
  splitNumber: 4,
  startAngle: 225,
  endAngle: -45,
  min: 0,
  max: 100,
  // 仪表盘之间的分割线
  splitLine: {
    show: false,
    length: 7,
    lineStyle: {
      color: 'auto',
      width: 1
    }
  },
  // 仪表盘之间的刻度
  axisTick: {
    show: false,
    length: 0,
    lineStyle: {
      color: 'auto'
    }
  },
  axisLabel: {
    show: false,
    color: '#454a55',
    distance: 2,
    fontSize: 12,
    fontFamily: 'PingFangSC-Regular'
  },

  pointer: { show: false, length: 20, width: 2 },

  axisLine: {
    lineStyle: {
      width: 3,
      color: [[1, '#454A55']]
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
  const {
    grid,
    tooltip,
    yAxis,
    xAxis,
    series = [],
    legend,
    geo,
    ...rest
  } = customize;
  // 判断serise内部是否使用的类目轴
  const seriesType = series.map(item => item.type);
  const bool = seriesType.some(item => ['bar', 'line'].includes(item));

  const defaultLegend = {
    show: false,
    bottom: 0,
    itemGap: 60,
    itemWidth: 20,
    itemHeight: 20,
    borderRadius: 0,
    icon: 'rect',
    textStyle: {
      color: '#666',
      borderRadius: 0
    },
    data: []
  };

  const defaultxAxis = {
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
      fontSize: 12,
      color: '#6D6E71'
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
  };

  const defaultyAxis = {
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
        color: 'rgba(204,204,204,0.5)',
        width: 0.5,
        type: 'dashed'
      }
    }
  };

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

  const defaultGeo = {
    map: 'china',
    zoom: 1.25,
    roam: false,
    itemStyle: {
      borderColor: '#232532',
      borderWidth: 1.5,
      areaColor: '#8d9bc8',
      emphasis: {
        borderWidth: 1.6,
        areaColor: '#8d9bc8',
        borderColor: '#232532'
      }
    }
  };

  const tempSeries = series.map(item => getSeries(item));

  // const tempxAxis, tempLegend, tempyAxis, tempTooltip, tempGeo;

  const tempxAxis =
    xAxis instanceof Array
      ? xAxis.map(item => {
          return objCombine(defaultxAxis, item);
        })
      : objCombine(defaultxAxis, xAxis || {});
  const tempyAxis =
    yAxis instanceof Array
      ? yAxis.map(item => {
          return objCombine(defaultyAxis, item);
        })
      : objCombine(defaultyAxis, yAxis || {});
  const tempGeo = geo ? objCombine(defaultGeo, geo) : null;

  const tempTooltip = tooltip
    ? objCombine(defaultTooltip, tooltip)
    : defaultTooltip;
  const tempLegend = legend ? objCombine(defaultLegend, legend) : defaultLegend;
  return {
    color: type ? linearColors() : null,
    tooltip: tempTooltip,
    grid: {
      containLabel: true,
      top: 0,
      left: 0,
      bottom: tempLegend.show ? 30 : 0,
      right: 0,
      ...grid
    },
    geo: tempGeo,
    legend: tempLegend,
    xAxis: tempxAxis,
    yAxis: tempyAxis,
    series: tempSeries,
    ...rest
  };
};

export default getOption;
