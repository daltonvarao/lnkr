// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TodosController {
  public async index() {
    return [
      { id: 1, task: 'Comer', done: true },
      { id: 2, task: 'Dormir', done: false },
      { id: 3, task: 'Jogar', done: true },
      { id: 4, task: 'Banhar', done: true },
      { id: 5, task: 'Ler', done: false },
    ]
  }
}
