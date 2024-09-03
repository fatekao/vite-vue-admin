import { faker } from '@faker-js/faker'

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response(req) {
      const { username, password } = req.body
      if (username === 'admin' || password === '123456') {
        return {
          code: 200,
          data: faker.string.uuid(),
          msg: '登录成功'
        }
      } else {
        return {
          code: 400,
          msg: '帐号或密码错误'
        }
      }
    }
  },
  {
    url: '/api/auth/login',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '退出成功'
      }
    }
  },
  {
    url: '/api/auth/userInfo',
    method: 'get',
    response() {
      return {
        code: 200,
        data: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.address.streetAddress()
        }
      }
    }
  }
]
