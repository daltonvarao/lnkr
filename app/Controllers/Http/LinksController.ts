import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Link from 'App/Models/Link'

export default class LinksController {
  public async index({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    const { title, tag } = request.qs()

    if (!user) {
      return response.unauthorized('Unauthorized access')
    }

    let query = user.related('links').query().preload('tags')

    if (title) {
      query = query
        .where('title', 'ilike', `%${title.toLowerCase()}%`)
        .orWhere('description', 'ilike', `%${title.toLowerCase()}%`)
        .orWhereHas('tags', (tags) => {
          tags.where('title', 'ilike', `%${title.toLowerCase()}%`)
        })
        .distinct()
    } else if (tag) {
      query = query.whereHas('tags', (tags) => {
        tags.where('title', 'ilike', `%${tag.toLowerCase()}%`)
      })
    }

    const links = await query

    return {
      links: links.map((link) => link.toJSON()),
    }
  }

  public async show({ request, response, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const link = await Link.query().where({ id }).preload('tags').firstOrFail()

      return {
        link: link.toJSON(),
      }
    } catch (error) {
      logger.error(error)
      return response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }

  public async store({ request, logger, response, auth }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized('Unauthorized access')
    }

    const validationSchema = schema.create({
      title: schema.string({}, [
        rules.unique({
          column: 'title',
          table: 'links',
          where: {
            user_id: user.id,
          },
        }),
      ]),
      description: schema.string(),
      url: schema.string(),
      tagIds: schema.array().members(schema.number()),
    })

    const { tagIds, ...data } = await request.validate({
      schema: validationSchema,
    })

    try {
      const link = await user.related('links').create(data)
      await link.related('tags').attach(tagIds)

      return {
        link,
        message: 'Link cadastrado',
      }
    } catch (error) {
      logger.error(error)

      return response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }

  public async update({ request, response, logger, auth }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized('Unauthorized access')
    }

    const id = request.param('id')

    const validationSchema = schema.create({
      title: schema.string.optional({}, [
        rules.unique({
          column: 'title',
          table: 'links',
          where: {
            user_id: user.id,
          },
          whereNot: { id },
        }),
      ]),
      description: schema.string.optional(),
      url: schema.string.optional(),
      tagIds: schema.array.optional().members(schema.number()),
    })

    const { tagIds, ...data } = await request.validate({
      schema: validationSchema,
    })

    try {
      const link = await Link.findOrFail(id)

      await link.merge(data).save()

      if (tagIds) {
        await link.related('tags').detach()
        await link.related('tags').attach(tagIds)
      }

      return {
        link,
        message: 'Link atualizado',
      }
    } catch (error) {
      logger.error(error)
      return response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    try {
      const link = await Link.findOrFail(id)

      await link.delete()

      return {
        link,
        message: 'Link removido',
      }
    } catch (error) {
      return response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }
}
