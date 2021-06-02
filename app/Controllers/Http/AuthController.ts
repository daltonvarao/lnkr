import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async store({ request, auth, response }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
    })

    const { email, password } = await request.validate({
      schema: validationSchema,
    })

    try {
      const { token, user } = await auth.use('api').attempt(email, password)

      return {
        token,
        user,
      }
    } catch (error) {
      return response.unauthorized({
        errors: [
          {
            message: 'Email or password incorrects.',
          },
        ],
      })
    }
  }

  public async destroy({}: HttpContextContract) {}
}
