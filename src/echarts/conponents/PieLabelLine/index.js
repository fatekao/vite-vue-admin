export default domId => {
  const dom = document.querySelector('#' + domId)
  if (!dom) return {}

  return {
    label: {
      alignTo: 'edge',
      edgeDistance: '10%',
      minMargin: 5,
      lineHeight: 15,
      formatter: '{name|{b}} {percent|{d}%}\n{value|{c}}',
      fontSize: 14,
      rich: {
        name: {
          color: '#616A6E'
        },
        percent: {
          fontWeight: 'bold',
          color: '#19272E'
        },
        value: {
          fontWeight: 'bold',
          color: '#19272E'
        },
        left: {
          align: 'left',
          fontWeight: 'bold',
          color: '#19272E'
        }
      }
    },
    labelLayout: params => {
      const isLeft = params.labelRect.x < dom.clientWidth / 2
      const points = params.labelLinePoints
      points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
      return {
        labelLinePoints: points
      }
    },
    labelLine: {
      length: 15,
      length2: 0,
      maxSurfaceAngle: 80
    }
  }
}
