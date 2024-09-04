import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export default [
  {
    url: '/api/dashboard/pieTotal',
    method: 'get',
    response() {
      return {
        code: 200,
        data: {
          subItem1: faker.number.int(100),
          subItem2: faker.number.int(100),
          subItem3: faker.number.int(100),
          subItem4: faker.number.int(100)
        },
        msg: '登录成功'
      }
    }
  },
  {
    url: '/api/dashboard/trendLine',
    method: 'get',
    response(req) {
      const list = ['subItem1', 'subItem2', 'subItem3', 'subItem4']
      const data = []
      console.log(req)
      let [startDate, endDate] = req.query['date[]']
      while (dayjs(startDate).isBefore(dayjs(endDate))) {
        const temp = { date: dayjs(startDate).format('YYYY-MM-DD') }
        list.forEach(key => {
          temp[key] = faker.number.int(100)
        })
        temp.total = list.reduce((a, b) => a + temp[b], 0)
        data.push(temp)
        startDate = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD')
      }
      return {
        code: 200,
        data,
        msg: 'success'
      }
    }
  }
]
