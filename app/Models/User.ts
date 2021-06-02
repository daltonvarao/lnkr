import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import Link from './Link'
import Tag from './Tag'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Link)
  public links: HasMany<typeof Link>

  @hasMany(() => Tag)
  public tags: HasMany<typeof Tag>

  @computed()
  public get initials() {
    if (this.name.split(' ').length === 1) {
      return this.name[0]
    }

    const names = this.name.split(' ')

    return names[0][0] + names[names.length - 1][0]
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
