import test from 'japa'
import api from '../utils/api'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import User from 'App/Models/User'

test.group('AuthController', (group) => {
  let user: User

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  group.before(async () => {
    user = await UserFactory.create()
  })

  test('should POST in /api/auth with invalid email value not authenticate user', async (assert) => {
    const response = await api
      .post('/auth')
      .send({
        email: 'a',
        password: '123456',
      })
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/auth with valid email authenticate user', async (assert) => {
    const response = await api
      .post('/auth')
      .send({
        email: user.email,
        password: '123456',
      })
      .expect(200)

    assert.property(response.body, 'token')
  })
})
