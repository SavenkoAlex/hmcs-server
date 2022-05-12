import Router from '@koa/router'
import { authRouter } from './authRouter'
import { deviceRouter } from './deviceRouter'

const nestedRouters = [
    authRouter,
    deviceRouter
]

const apiRouter = new Router({ prefix: '/api' })

// apiRouter.match('/^.*\/api\/((?!auth)\/*.)', '')

for (const r of nestedRouters) {
    apiRouter.use(r.routes(), r.allowedMethods())
}

export { apiRouter }