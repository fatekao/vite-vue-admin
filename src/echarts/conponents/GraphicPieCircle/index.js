import InsiderCircle from './insider_circle.png'
import OutsiderCircle from './outsider_circle.png'

export default (domId, center = ['50%', '50%']) => {
  const dom = document.querySelector('#' + domId)
  if (!dom) return

  const domWidth = dom.clientWidth
  const domHeight = dom.clientHeight
  const size = Math.min(domWidth, domHeight)

  const left = Number.isFinite(domWidth) && typeof center[0] === 'string' ? (domWidth * parseFloat(center[0])) / 100 - size / 2 : center[0] - size / 2
  const top = Number.isFinite(domHeight) && typeof center[1] === 'string' ? (domHeight * parseFloat(center[1])) / 100 - size / 2 : center[1] - size / 2
  return {
    elements: [
      {
        type: 'group',
        left,
        top,
        children: [
          {
            // 内圈
            type: 'image',
            style: {
              image: InsiderCircle,
              width: 109,
              height: 109
            },
            left: 'center',
            top: 'center',
            originX: 109 / 2,
            originY: 109 / 2,
            keyframeAnimation: [
              {
                duration: 3000,
                loop: true,
                keyframes: [
                  {
                    percent: 0,
                    rotation: 0
                  },
                  {
                    percent: 0.5,
                    rotation: Math.PI
                  },
                  {
                    percent: 1,
                    rotation: Math.PI * 2
                  }
                ]
              }
            ]
          },
          {
            // 外圈
            type: 'image',
            style: {
              image: OutsiderCircle,
              width: 283,
              height: 283
            },
            left: 'center',
            top: 'center',
            originX: 283 / 2,
            originY: 283 / 2,
            keyframeAnimation: [
              {
                duration: 3000,
                loop: true,
                keyframes: [
                  {
                    percent: 0,
                    rotation: 0
                  },
                  {
                    percent: 0.5,
                    rotation: -Math.PI
                  },
                  {
                    percent: 1,
                    rotation: -Math.PI * 2
                  }
                ]
              }
            ]
          },
          {
            // 补位块
            type: 'rect',
            shape: {
              width: 300,
              height: 300
            },
            style: {
              fill: 'transparent'
            },
            left: 'center',
            top: 'center'
          }
        ]
      }
    ]
  }
}
