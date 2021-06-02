import test from 'japa'
import api from '../utils/api'
import Database from '@ioc:Adonis/Lucid/Database'
// import User from 'App/Models/User'

test.group('RegistersController', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should POST in /api/register with empty data not create user', async (assert) => {
    const response = await api.post('/register').send({}).expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/register with invalid email not create user', async (assert) => {
    const response = await api
      .post('/register')
      .send({
        email: 'a',
        name: 'Dalton Felipe',
        password: '123456',
        password_confirmation: '123456',
      })
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/register with different password not create user', async (assert) => {
    const response = await api
      .post('/register')
      .send({
        email: 'daltonphellipe@gmail.com',
        name: 'Dalton Felipe',
        password: '123456',
        password_confirmation: '123465',
      })
      .expect(422)

    assert.property(response.body, 'errors')
  })

  test('should POST in /api/register with valid data create user', async (assert) => {
    const response = await api
      .post('/register')
      .send({
        email: 'daltonphellipe@gmail.com',
        name: 'Dalton Felipe',
        password: '123456',
        password_confirmation: '123456',
      })
      .expect(200)

    assert.property(response.body, 'user')
    assert.property(response.body, 'token')
  })
})
