import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Links extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('short_id')
      table.string('short_url')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('short_id')
      table.dropColumn('short_url')
    })
  }
}
