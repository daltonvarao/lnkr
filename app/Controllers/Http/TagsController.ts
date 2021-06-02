import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Tag from 'App/Models/Tag'

export default class TagsController {
  public async show({ response, request, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const tag = await Tag.findOrFail(id)

      return {
        tag: tag.toJSON(),
      }
    } catch (err) {
      logger.error(err)

      return response.badRequest({
        errors: [
          {
            message: err.message,
          },
        ],
      })
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ errors: [{ message: 'Unauthorized access' }] })
    }

    const tags = await user.related('tags').query()

    return {
      tags: tags.map((tag) => tag.toJSON()),
    }
  }

  public async store({ auth, request, response, logger }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ errors: [{ message: 'Unauthorized access' }] })
    }

    const validationSchema = schema.create({
      title: schema.string({}, [
        rules.unique({
          table: 'tags',
          column: 'title',
          where: {
            user_id: user?.id,
          },
        }),
      ]),
      color: schema.string(),
    })

    const tagData = await request.validate({
      schema: validationSchema,
    })

    try {
      const tag = await Tag.create({ ...tagData, userId: user.id })

      return {
        tag,
        message: 'Categoria cadastrada',
      }
    } catch (err) {
      logger.error(err)

      return response.badRequest({
        errors: [
          {
            message: err.message,
          },
        ],
      })
    }
  }

  public async update({ request, response, logger, auth }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ errors: [{ message: 'Unauthorized access' }] })
    }

    const id = request.param('id')

    const validationSchema = schema.create({
      title: schema.string.optional({}, [
        rules.unique({
          table: 'tags',
          column: 'title',
          where: {
            user_id: user?.id,
          },
          whereNot: {
            id,
          },
        }),
      ]),
      color: schema.string.optional(),
    })

    const tagData = await request.validate({
      schema: validationSchema,
    })

    try {
      const tag = await Tag.findOrFail(id)

      await tag.merge(tagData).save()

      return { tag, message: 'Categoria atualizada' }
    } catch (error) {
      logger.error(error)
      response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }

  public async destroy({ request, response, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const tag = await Tag.findOrFail(id)

      await tag.delete()

      return { tag, message: 'Categoria removida' }
    } catch (error) {
      logger.error(error)
      response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }
}
