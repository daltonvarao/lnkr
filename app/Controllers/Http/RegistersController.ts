import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class RegistersController {
  public async store({ request, auth, response }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({}),
      email: schema.string({}, [
        rules.email(),
        rules.unique({
          column: 'email',
          table: 'users',
        }),
      ]),
      password: schema.string(),
      password_confirmation: schema.string({}, [rules.confirmed('password')]),
    })

    const { name, email, password } = await request.validate({
      schema: validationSchema,
    })

    try {
      const user = await User.create({ name, email, password })

      const { token } = await auth.use('api').login(user)

      return {
        user,
        token,
      }
    } catch (error) {
      return response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }
}
