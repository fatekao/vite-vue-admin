export const defaultColorList = [
  ['#12A3E8', '#63E3FF'],
  ['#5AD8A6', '#93EED2'],
  ['#F2D647', '#F9F4C2'],
  ['#FA9D14', '#FCDF83'],
  ['#FC8A72', '#FC7131']
]

/**
 * 根据颜色列表获取渐变颜色列表
 *
 * @param {*} [colorList=defaultColorList]  二维数组颜色列表
 * @return {*}
 */

export const getLinearGradientColorList = (colorList = defaultColorList) => {
  const linearGradientcolorList = []

  colorList.forEach((item, index) => {
    let color = item
    if (Array.isArray(item)) {
      color = getLinearGradientcolor(item[0], item[1])
    }
    linearGradientcolorList.push(color)
  })

  return linearGradientcolorList
}
/**
 * 根据起点颜色和终点颜色获取渐变颜色
 *
 * @param {*} startColor 起点颜色
 * @param {*} endColor 终点颜色
 * @return {*}
 */
export const getLinearGradientcolor = (startColor, endColor) => {
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: startColor
      },
      {
        offset: 1,
        color: endColor
      }
    ]
  }
}
