import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileController {
  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user?.toJSON()

    if (!user) {
      return response.unauthorized({ errors: [{ message: 'Unauthorized access' }] })
    }

    return {
      user,
    }
  }
}
