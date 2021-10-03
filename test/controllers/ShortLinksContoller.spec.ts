import test from 'japa'
import api from '../utils/api'
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User'
import { LinkFactory, UserFactory } from 'Database/factories'

test.group('ShortLinksController', (group) => {
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

  test.only('should GET in /api/short-links/:short_id return link by short_id', async (assert) => {
    const links = await LinkFactory.createMany(3)

    const response = await api
      .get(`/short-links/${links[1].shortId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.property(response.body, 'link')
    assert.equal(response.body.link.short_id, links[1].shortId)
  })
})
