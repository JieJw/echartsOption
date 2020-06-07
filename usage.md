#### 简介

主要针对项目中需用使用 echarts 库。该文件主要包含 4 个部分

1. bright.json 该文主要是基本的主题配置
2. colors.js 该文件主要是默认的渐进色颜色
3. defautOption.js 该文件主要包含 echarts 额外的 option 配置，并且暴露 getOption 方法，快速生成一个有效的 option, **当 getOption 方法第二个参数为 true 时使用渐变颜色作为主题色**
4. echarts.js 该文件主要是用于引入 echarts 和注册主题'bright'

#### 使用说明

##### vue 项目

```
// xxx为echarts.js 文件所在位置
import echarts from 'xxx/echarts'
import getOption from 'xxx/defaultOption'

// 初始化一个echarts实例， 并使用注册的bright主题
const instance = echarts.init(this.refs[refName], 'bright')

// 个性化主题配置
const defaultOption = {
  xAxis: {
    data: ["1月", "2月", "3月"],
  },
  series: [
    {
      type: "line",
      data: [10, 20, 30],
    },
  ],
}

// 使用getOption加上自定义的option
instance.setOption(getOption(defaultOption), true)
```

#### react 项目

```
// 如果有引入echarts-for-react包 则使用方式有变化， 未使用该包则和vue项目一样
import ReactEcharts from 'echarts-for-react';
import echarts from 'xxx/echarts'
import getOption from 'xxx/defaultOption'

const defaultOption = {
  xAxis: {
    data: ["1月", "2月", "3月"],
  },
  series: [
    {
      type: "line",
      data: [10, 20, 30],
    },
  ],
}

return (
  <ReactEcahrts
    style={{
      height: '100%',
      width: '100%',
    }}
    option={getOption(defaultOption)}
    theme="bright"
    notMerge={true}
    lazyUpdate={true}>
  </ReactEcahrts>
)
```

#### 注意事项

- defaultOption 文件的里面的默认配置根据数据组的项目配置的 option，如果调用文件修改的样式过多，可直接在上述文件中修改
- defaultOption 内部的很多属性因为使用不多会配置 show：false， 如果需要使用则在对应的属性下添加 show：true 即可显示
- 注意对公共文件的修改，可能修改玩之后其他 option 会受到影响
- 如果项目中使用的图表不多，可以引入 echarts 的部分图表
- 默认 option 支支持 line， bar， pie， guage，横纵坐标，legend，grid，tooltip，地图的默认属性配置，其余需要自己书写

#### 常见问题

1. series 需要是一个数组，且需要有 type 属性表名
2. xAxis，yAxis，series 未写入默认 data 值，需要在渲染之前配置
