import Factory from '@ioc:Adonis/Lucid/Factory'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'
import Link from 'App/Models/Link'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName().concat(' ').concat(faker.name.lastName()),
    password: '123456',
  }
}).build()

export const TagFactory = Factory.define(Tag, ({ faker }) => {
  return {
    color: faker.internet.color(),
    title: faker.internet.userName(),
  }
})
  .relation('links', () => LinkFactory)
  .build()

export const LinkFactory = Factory.define(Link, ({ faker }) => {
  return {
    title: faker.internet.userName(),
    description: faker.lorem.sentence(20),
    url: faker.internet.domainName(),
    shortId: faker.random.alphaNumeric(6),
    shortUrl: faker.internet.domainName(),
  }
})
  .relation('tags', () => TagFactory)
  .build()
