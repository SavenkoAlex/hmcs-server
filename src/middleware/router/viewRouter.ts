import Router from '@koa/router'
import {
  getMenuItems
} from '../../controllers/views/menuController'

const viewRouter = new Router({ prefix: '/view' })

viewRouter.get('/menu/all', getMenuItems)

export {
  viewRouter
}