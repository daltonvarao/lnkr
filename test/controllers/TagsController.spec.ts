import test from 'japa'
import api from '../utils/api'
import Database from '@ioc:Adonis/Lucid/Database'
import { TagFactory, UserFactory } from 'Database/factories'
import User from 'App/Models/User'
import Tag from 'App/Models/Tag'

test.group('TagsController', (group) => {
  let user: User
  let token: string

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.create()

    const resp = await api.post('/auth').send({ email: user.email, password: '123456' })

    token = resp.body.token
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should GET in /api/tags list all tag', async (assert) => {
    await TagFactory.merge([
      { title: 'ASP', userId: user.id },
      { title: 'FM', userId: user.id },
      { title: 'TB', userId: user.id },
    ]).createMany(3)

    const response = await api.get('/tags').set('Authorization', `Bearer ${token}`).expect(200)

    assert.property(response.body, 'tags')
    assert.lengthOf(response.body.tags, 3)
  })

  test('should POST in /api/register with empty data not create tag', async (assert) => {
    const response = await api
      .post('/tags')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/tags with duplicate title not create tag', async (assert) => {
    await TagFactory.merge({ title: 'ASP', userId: user.id }).create()

    const response = await api
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ASP',
        color: 'orange',
      })
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/tags create tag', async (assert) => {
    await TagFactory.merge({ title: 'ASP' }).create()

    const response = await api
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ASP',
        color: 'orange',
      })
      .expect(200)

    assert.property(response.body, 'tag')
  })

  test('should DELETE in /api/tags/:id delete tag by id', async (assert) => {
    let tags = await TagFactory.merge([
      { title: 'ASP' },
      { title: 'FM' },
      { title: 'TB' },
    ]).createMany(4)

    assert.lengthOf(tags, 4)

    const response = await api
      .delete(`/tags/${tags[1].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.property(response.body, 'tag')

    tags = await Tag.all()
    assert.lengthOf(tags, 3)
  })

  test('should PUT in /api/tags/:id update tag by id', async (assert) => {
    const tag = await TagFactory.merge({ title: 'ASP' }).create()

    const response = await api
      .put(`/tags/${tag.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ASP',
        color: 'blue',
      })
      .expect(200)

    assert.property(response.body, 'tag')

    await tag.refresh()

    assert.equal(tag.color, 'blue')
  })

  test('should GET in /api/tags/:id return tag by id', async (assert) => {
    const tag = await TagFactory.merge({ title: 'ASP' }).create()

    const response = await api
      .get(`/tags/${tag.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.property(response.body, 'tag')
    assert.propertyVal(response.body.tag, 'color', tag.color)
  })
})
