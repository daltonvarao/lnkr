/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('auth', 'AuthController').apiOnly().only(['store'])
  Route.resource('register', 'RegistersController').apiOnly().only(['store'])
}).prefix('api')

Route.group(() => {
  Route.resource('links', 'LinksController').apiOnly()
  Route.resource('tags', 'TagsController').apiOnly()
  Route.resource('profile', 'ProfileController').apiOnly().only(['index'])
})
  .prefix('api')
  .middleware(['auth:api'])

Route.get('*', async ({ view }) => {
  return view.render('app')
})
