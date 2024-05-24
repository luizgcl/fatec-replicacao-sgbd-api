/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
const UsersController = () => import('../app/controllers/users_controller.js')

router.get('/hello-world', async ({ response }: HttpContext) => {
  return response.json({
    message: 'Hello world',
  })
})

router
  .group(() => {
    router.resource('users', UsersController).apiOnly()
  })
  .prefix('/api')
