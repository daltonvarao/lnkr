import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

const api = supertest(BASE_URL)

export default api
