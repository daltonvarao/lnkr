import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Link from 'App/Models/Link'

export default class ShortLinksController {
  public async show({ request, response, logger }: HttpContextContract) {
    const shortId = request.param('id')

    console.log(shortId)

    try {
      const link = await Link.findByOrFail('short_id', shortId)

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
}
