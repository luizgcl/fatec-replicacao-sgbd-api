import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { updateUserValidator, userValidator } from '../validators/user.js'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await User.all()

    return response.json({
      data: users,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const { name: fullName, email, password } = await userValidator.validate(data)

    const user = await User.create({
      fullName,
      email,
      password,
    })

    return response.json({
      message: 'Usuário cadastrado com sucesso',
      data: user,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await User.find(params['id'])

    return response.json({
      data: user,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const searchPayload = {
      id: params['id'],
    }

    const data = request.all()

    const { name: fullName, email } = await updateUserValidator.validate(data)

    const user = await User.updateOrCreate(searchPayload, {
      fullName,
      email,
    })

    return response.json({
      message: 'Usuário atualizado com sucesso',
      data: user,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params['id'])

    user?.delete()

    return response.json({
      message: 'Usuário deletado com sucesso',
    })
  }
}
