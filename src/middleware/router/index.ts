import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import { apiRouter } from './router'

export default (app: Koa) => {
    app.use(bodyParser())
    app.use(apiRouter.middleware())
}