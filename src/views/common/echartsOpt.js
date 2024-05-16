import { getScientificCounting } from './index'
import { echartOptions } from '@/views/common/dataZoom.js'
import { deepClone } from '@/views/common'
import _ from 'lodash'

export const demoCharts1 = (tooltip, oepnDataZoom1, curveHorizontal, yData1, echarts, yData2, yData3) => {
  let colors = ['#a5c5d4', '#91CC75', '#EE6666'] //颜色
  return {
    dataZoom: oepnDataZoom1 ? deepClone(echartOptions.dataZoom) : '',
    color: colors,
    tooltip: tooltip,
    grid: {
      right: '20%', //echarts离容器左侧的距离
    },
    toolbox: {
      //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
      feature: {
        dataView: {
          show: true,
          readOnly: false,
        }, //数据视图
        restore: {
          show: true,
        }, //重置
        saveAsImage: {
          show: true,
        }, //下载
      },
    },
    legend: {
      //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
      data: ['浊度', 'PH', '水温'], //就是图表上面正中间那3，点击某个某个就能隐藏
    },
    xAxis: [
      {
        type: 'category', //类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据
        boundaryGap: false, //false从0开始,最少x会放0位置
        axisTick: {
          show: false,
          //坐标轴刻度|和数据是对齐的，加上这个
          alignWithLabel: false,
        },
        // prettier-ignore
        data: curveHorizontal, //x轴数据
      },
    ],
    yAxis: [
      //直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
      {
        type: 'value', //适用于连续数据
        name: '浊度（ntu）', //坐标轴名称
        position: 'left', //左边
        alignTicks: true, //开启该配置项自动对齐刻度
        min: 0, //初始
        // interval: 200, //间距   如果没这3，会自适应数据
        axisLine: {
          show: false, //y轴|  是否显示
          lineStyle: {
            color: colors[0], //颜色
          },
        },
        splitLine: {
          //隐藏纵轴的横线
          show: true, //展示
          lineStyle: {
            color: '#DCDFE6 ', //虚线颜色
            type: 'dashed', //虚线
          },
        },
        axisLabel: {
          //纵轴文字,就是0 200 400 600 800 1000
          show: true,
          // formatter: '{value} ',
          formatter: function (value, index) {
            return getScientificCounting(value)
          },
        },
      },
      {
        type: 'value', //适用于连续数据
        name: 'PH',
        position: 'right', //右边
        alignTicks: true, //开启该配置项自动对齐刻度
        min: 0, //初始
        // max: 14, //结束值
        // interval: 3, //间距   如果没这3，会自适应数据
        splitLine: {
          show: false, //y轴|  是否显示
          lineStyle: {
            color: '#1160a0',
            type: 'solid', //实体线
          },
        },
        axisLine: {
          //纵轴文字,就是0 3 6 9 12 14
          show: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: function (value, index) {
            return getScientificCounting(value)
          },
        },
      },
      {
        type: 'value',
        name: '水温（°C）',
        show: true, // 添加该配置来隐藏水温纵轴
        position: 'right',
        alignTicks: true,
        min: 0,
        offset: 80, //向右偏移80
        axisLine: {
          show: false, //y轴|  是否显示
          lineStyle: {
            color: colors[2],
          },
        },
        splitLine: {
          //隐藏纵轴的横线
          show: false,
          lineStyle: {
            color: '#DCDFE6 ',
            type: 'dashed',
          },
        },
        axisLabel: {
          //纵轴文字
          formatter: '{value} ',
        },
      },
    ],
    series: [
      //数据
      {
        name: '浊度',
        type: 'line', //折线
        symbol: 'none', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true, //是否平滑
        color: '',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#bed4e5',
                },
                {
                  offset: 0.6,
                  color: '#aac8d9',
                },
                {
                  offset: 1,
                  color: '#9dbec9',
                },
              ],
              false
            ),
          },
        },
        data: yData1,
      },
      {
        name: 'PH',
        type: 'line',
        yAxisIndex: 1, //默认是0就左边那个y轴，1是右边第一个
        data: yData2,
      },
      {
        name: '水温',
        type: 'bar',
        labelLayout: {
          hideOverlap: true,
        },

        barMaxWidth: 10, //粗细
        yAxisIndex: 2,
        color: '#FFAF14 ',
        label: {
          show: false, // 显示标签
          position: 'top', // 标签位置
          formatter: '{c}℃', // 添加单位“℃”，{c}表示数值
          color: '#FFAF14', // 标签颜色
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 标签字体
          fontSize: 10, // 标签字体大小
          distance: 5,
        },
        data: yData3,
      },
    ],
  }
}

// 液位/流量的配置项--------------------------------------------------------------------------------

export const liquidFlowOpt = (tooltip, dataZoom, curveHorizontal, liquidVerticalData, echarts, flowVerticalData) => {
  return {
    grid: {
      left: '7%', //图表距离左边
      right: '6%',
      containLabel: true, //grid 区域是否包含坐标轴的刻度标签
    },
    legend: [
      //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
      {
        data: [
          {
            name: '液位',
            icon: 'rect', //长方形的
          },
        ],
        itemWidth: 11, //宽
        itemHeight: 2, //高
        top: '4%', //距离上方
        left: '45%', //距离左
        textStyle: {
          //文字样式
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
      {
        data: [
          {
            name: '流量',
            icon: 'rect',
          },
        ],
        itemWidth: 11,
        itemHeight: 2,
        top: '4%',
        left: '55%',
        textStyle: {
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
    ],
    tooltip: tooltip, //悬浮提示
    dataZoom: dataZoom, //缩放
    //x轴
    xAxis: {
      data: curveHorizontal,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#DCDFE6',
        },
      },
      axisLabel: {
        color: '#999999 ', //坐标轴的文本颜色
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
        //坐标轴刻度|和数据是对齐的，加上这个
        alignWithLabel: true,
      },
    },
    //y轴没有显式设置，根据值自动生成y轴
    yAxis: [
      {
        name: '指标：液位(m)',
        nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
        // min: function (v) {
        //   //如果没数据时候默认展示的纵轴
        //   console.log(v);
        //   if (v.min == Infinity) {
        //     console.log(22222);
        //     return 0;
        //   }
        //   return v.min;
        // },
        min: 0,
        // offset: -30,
        max: function (v) {
          console.log(v)
          if (v.max == -Infinity) {
            console.log(1111)
            return 1.5
          }
          return v.max
        },

        type: 'value',
        position: 'left',
        axisTick: {
          show: false, //坐标轴刻度|隐藏
        },
        // alignTicks: true,  //开启该配置项自动对齐刻度,刻度都隐藏了就没有必要了
        axisLine: {
          //纵轴文字,就是0 3 6 9 12 14
          show: false,
          lineStyle: {
            color: '#999999',
          },
        },
        splitLine: {
          show: true, //隐藏纵轴的横线
          lineStyle: {
            color: '#DCDFE6 ',
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: function (value, index) {
            return translateScientificNotation(value)
          },
        },
      },
      {
        name: '指标：流量(m³/s)',
        nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
        // min: function (v) {
        //   console.log(v);
        //   if (v.min == Infinity) {
        //     return 0;
        //   }
        //   return v.min;
        // },
        min: 0,
        max: function (v) {
          console.log(v)
          if (v.max == -Infinity) {
            return 100
          }
          return v.max
        },
        // interval: 3,
        axisTick: {
          show: false, // 设置 axisTick 的 show 属性为 false
        },
        type: 'value',
        position: 'right',
        // alignTicks: true,
        splitLine: {
          show: true, //隐藏纵轴的横线
          lineStyle: {
            color: '#DCDFE6',
            type: 'dashed',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999999',
          },
        },
        axisLabel: {
          formatter: function (value, index) {
            return translateScientificNotation(value)
          },
        },
      },
    ],

    //数据-data是最终要显示的数据
    series: [
      {
        name: '液位',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        color: '#1d72f1',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#e5f5fe',
                },
                {
                  offset: 0.6,
                  color: '#e0f4fe',
                },
                {
                  offset: 1,
                  color: '#dcf3fe',
                },
              ],
              false
            ),
          },
        },
        data: liquidVerticalData,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: {
          width: 3, // 设置线的粗细，这里设置为 3
        },
      },
      {
        name: '流量',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        yAxisIndex: 1,
        color: '#00dbd5',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#fcfefe',
                },
                {
                  offset: 0.6,
                  color: '#d6f4fa',
                },
                {
                  offset: 1,
                  color: '#ccf7f6',
                },
              ],
              false
            ),
          },
        },
        data: flowVerticalData,
        // showSymbol: flowVerticalData.length == 1 ? true : false,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: {
          width: 3, // 设置线的粗细，这里设置为 3
        },
      },
    ],
  }
}

//水质的配置项
export const waterOpt = (tooltip, dataZoom, curveHorizontal, turbidityVerticalData, echarts, phVerticalData, temperatureVerticalData) => {
  return {
    grid: {
      left: '7%',
      right: '5%',
      containLabel: true,
    },

    legend: [
      {
        data: [
          {
            name: '浊度',
            icon: 'rect',
          },
        ],

        itemWidth: 11,
        itemHeight: 2,
        top: '4%',
        left: '35%',
        textStyle: {
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
      {
        data: [
          {
            name: 'ph值',
            icon: 'rect',
          },
        ],
        itemWidth: 11,
        itemHeight: 2,
        top: '4%',
        left: '50%',
        textStyle: {
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
      {
        data: [
          {
            name: '水温',
            icon: 'rect',
          },
        ],
        itemWidth: 11,
        itemHeight: 2,
        top: '4%',
        left: '65%',
        textStyle: {
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
    ],
    tooltip: tooltip,
    dataZoom: dataZoom,
    //x轴
    xAxis: {
      data: curveHorizontal,
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#DCDFE6',
        },
      },
      axisLabel: {
        color: '#999999 ', //坐标轴的文本颜色
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
        //坐标轴刻度|和数据是对齐的，加上这个
        alignWithLabel: true,
      },
    },
    //y轴没有显式设置，根据值自动生成y轴
    yAxis: [
      {
        name: '指标：浊度(NTU)',
        nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
        // min: function (v) {
        //   console.log(v);
        //   if (v.min == Infinity) {
        //     return 0;
        //   }
        //   return v.min;
        // },
        min: 0,

        max: function (v) {
          console.log(v)
          if (v.max == -Infinity) {
            return 99
          }
          return v.max
        },
        // interval: 200,
        type: 'value',
        position: 'left',
        axisTick: {
          show: false, // 设置 axisTick 的 show 属性为 false
        },
        // alignTicks: true,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999999',
          },
        },
        splitLine: {
          show: true, //隐藏纵轴的横线
          lineStyle: {
            color: '#DCDFE6 ',
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: function (value, index) {
            return translateScientificNotation(value)
          },

          padding: [0, 10, 0, 0], // 调整标签与轴线的距离
        },
      },
      {
        name: '指标：ph',
        nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
        // min: 0,
        // max: 14,
        // min: function (v) {
        //   console.log(v);
        //   if (v.min == Infinity) {
        //     return 0;
        //   }
        //   return v.min;
        // },
        min: 0,
        max: function (v) {
          console.log(v)
          if (v.max == -Infinity) {
            return 14
          }
          return v.max
        },
        // interval: 3,
        axisTick: {
          show: false, // 设置 axisTick 的 show 属性为 false
        },
        type: 'value',
        position: 'right',
        // alignTicks: true,
        splitLine: {
          show: true, //隐藏纵轴的横线
          lineStyle: {
            color: '#DCDFE6',
            type: 'dashed',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999999',
          },
        },
        axisLabel: {
          formatter: function (value, index) {
            return translateScientificNotation(value)
          },

          padding: [0, 0, 0, 10], // 调整标签与轴线的距离
        },
      },
      // {
      //   type: 'value',
      //   name: '水温（°C）',
      //   show: true, // 添加该配置来隐藏水温纵轴
      //   position: 'right',
      //   alignTicks: true,
      //   min: 0,
      //   max: 100,
      //   interval: 20,
      //   offset: 80,
      //   axisLine: {
      //     show: false,
      //     lineStyle: {
      //       color: '#FFAF14 '
      //     }
      //   },
      //   splitLine: {
      //     show: true,
      //     lineStyle: {
      //       color: '#DCDFE6 ',
      //       type: 'dashed'
      //     }
      //   },
      //   axisLabel: {
      //     formatter: '{value} '
      //   }
      // }
    ],

    //数据-data是最终要显示的数据
    series: [
      {
        name: '浊度',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        color: '#a8898c',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#e5f5fe',
                },
                {
                  offset: 0.6,
                  color: '#e0f4fe',
                },
                {
                  offset: 1,
                  color: '#dcf3fe',
                },
              ],
              false
            ),
          },
        },
        data: turbidityVerticalData,
        // showSymbol: turbidityVerticalData.length == 1 ? true : false,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: {
          width: 3, // 设置线的粗细，这里设置为 3
        },
      },
      {
        name: 'ph值',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        yAxisIndex: 1,
        color: '#00dbd5',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#fcfefe',
                },
                {
                  offset: 0.6,
                  color: '#d6f4fa',
                },
                {
                  offset: 1,
                  color: '#ccf7f6',
                },
              ],
              false
            ),
          },
        },
        data: phVerticalData,
        // showSymbol: phVerticalData.length == 1 ? true : false,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: {
          width: 3, // 设置线的粗细，这里设置为 3
        },
      },
      {
        name: '水温',
        type: 'bar',
        labelLayout: {
          hideOverlap: true,
        },
        barMaxWidth: 20, //粗细
        // barGap: 5,
        color: '#FFAF14 ',

        // emphasis: {
        //   //高亮   鼠标放在单个
        //   label: {
        //     show: true
        //   }
        // },
        // yAxisIndex: 2,
        label: {
          show: false, // 显示标签
          position: 'top', // 标签位置
          // formatter: '{c}℃', // 添加单位“℃”，{c}表示 数值
          formatter: (param) => {
            return translateScientificNotation(param.value) + '℃'
          }, // 添加单位“℃”，{c}表示 数值
          color: '#FFAF14', // 标签颜色
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 标签字体
          fontSize: 10, // 标签字体大小
          distance: 5,
        },
        data: temperatureVerticalData,
      },
    ],
  }
}