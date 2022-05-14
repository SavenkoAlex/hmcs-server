import Router from '@koa/router'
import { authRouter } from './authRouter'
import { deviceRouter } from './deviceRouter'
import { viewRouter } from './viewRouter'

const nestedRouters = [
    authRouter,
    deviceRouter,
    viewRouter
]

const apiRouter = new Router({ prefix: '/api' })

// apiRouter.match('/^.*\/api\/((?!auth)\/*.)', '')

for (const r of nestedRouters) {
    apiRouter.use(r.routes(), r.allowedMethods())
}

export { apiRouter }