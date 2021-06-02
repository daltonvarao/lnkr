import test from 'japa'
import api from '../utils/api'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import User from 'App/Models/User'

test.group('ProfileController', (group) => {
  let user: User
  let token: string

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.create()

    const resp = await api.post('/auth').send({ email: user.email, password: '123456' })

    token = resp.body.token
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  group.before(async () => {
    user = await UserFactory.create()
  })

  test('should GET in /api/profile return logged user', async (assert) => {
    const response = await api.get('/profile').set('Authorization', `Bearer ${token}`).expect(200)

    assert.property(response.body, 'user')
    assert.equal(response.body.user.name, user.name)
  })
})
