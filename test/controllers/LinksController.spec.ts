import test from 'japa'
import api from '../utils/api'
import Database from '@ioc:Adonis/Lucid/Database'
import { LinkFactory, TagFactory, UserFactory } from 'Database/factories'
import User from 'App/Models/User'
import Link from 'App/Models/Link'
import Tag from 'App/Models/Tag'

test.group('LinksController', (group) => {
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

  test('should POST in /api/links with empty data not create tag', async (assert) => {
    const response = await api
      .post('/links')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/links with duplicate title not create tag', async (assert) => {
    await LinkFactory.merge({ title: 'Lnkr', userId: user.id }).create()

    const response = await api
      .post('/links')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lnkr',
        description: 'lorem ipsum',
        url: 'http://lnkr.site',
        tagIds: [1, 2, 3],
      })
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/links create tag', async (assert) => {
    await LinkFactory.merge({ title: 'Aula de Automação', userId: user.id }).create()
    const tags = await TagFactory.createMany(3)

    await tags[2].load('links')
    assert.lengthOf(tags[2].links, 0)

    const response = await api
      .post('/links')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lnkr',
        description: 'lorem ipsum',
        url: 'http://lnkr.site',
        tagIds: [tags[0].id, tags[2].id],
      })
      .expect(200)

    const newTags = await Promise.all(
      tags.map(async (tag) => {
        await tag.load('links')
        return tag
      })
    )

    assert.lengthOf(newTags[0].links, 1)
    assert.lengthOf(newTags[1].links, 0)
    assert.lengthOf(newTags[2].links, 1)

    assert.property(response.body, 'link')
  })

  test('should POST in /api/links short link if short defined', async (assert) => {
    await LinkFactory.merge({ title: 'Aula de Automação', userId: user.id }).create()
    const tags = await TagFactory.createMany(2)

    await tags[0].load('links')
    assert.lengthOf(tags[0].links, 0)

    const response = await api
      .post('/links')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lnkr',
        description: 'lorem ipsum',
        url: 'http://lnkr.site',
        tagIds: [tags[0].id],
        short: true,
      })
      .expect(200)

    const newTags = await Promise.all(
      tags.map(async (tag) => {
        await tag.load('links')
        return tag
      })
    )

    assert.lengthOf(newTags[0].links, 1)
    assert.lengthOf(newTags[1].links, 0)

    assert.property(response.body, 'link')
    assert.property(response.body.link, 'short_url')
    assert.property(response.body.link, 'short_id')
  })

  test('should GET in /api/links list all links', async (assert) => {
    const links = await LinkFactory.merge({ userId: user.id }).createMany(5)

    const response = await api.get('/links').set('Authorization', `Bearer ${token}`).expect(200)

    assert.property(response.body, 'links')
    assert.lengthOf(response.body.links, links.length)
  })

  test('should GET in /api/links/:id show link by id', async (assert) => {
    const links = await LinkFactory.merge({ userId: user.id }).createMany(3)

    const response = await api
      .get(`/links/${links[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.property(response.body, 'link')
    assert.equal(response.body.link.title, links[0].title)
  })

  test('should PUT in /api/links/:id update link by id', async (assert) => {
    const link = await LinkFactory.merge({
      userId: user.id,
      title: 'Aula de FM',
      description: 'Link para a aula',
    })
      .with('tags', 3)
      .create()

    const tags = await Tag.all()

    const response = await api
      .put(`/links/${link.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Aula de Fisica Moderna',
        tagIds: [tags[0].id, tags[1].id],
      })
      .expect(200)

    await link.refresh()
    await link.load('tags')

    assert.property(response.body, 'link')
    assert.equal(link.title, 'Aula de Fisica Moderna')
    assert.lengthOf(link.tags, 2)
  })

  test('should GET in /api/links?params=values list links that match with search param', async (assert) => {
    await LinkFactory.merge([
      { title: 'Aula', userId: user.id },
      { title: 'Avaliação', userId: user.id },
      { title: 'Materiais', userId: user.id },
    ]).createMany(3)

    const response = await api
      .get('/links?title=Aula')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.property(response.body, 'links')
    assert.lengthOf(response.body.links, 1)
  })

  test('should DELETE in /api/links/:id delete link by id', async (assert) => {
    let links = await LinkFactory.createMany(3)

    const response = await api
      .delete(`/links/${links[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.property(response.body, 'link')
    assert.equal(response.body.link.title, links[0].title)

    links = await Link.all()
    assert.lengthOf(links, 2)
  })
})
