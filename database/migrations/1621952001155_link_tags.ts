import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LinkTags extends BaseSchema {
  protected tableName = 'link_tag'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('link_id').unsigned().references('id').inTable('links').onDelete('CASCADE')
      table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
