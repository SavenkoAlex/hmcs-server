import Router from '@koa/router'
import { authRouter } from './subRouters/authRouter'
import { testRouter } from './subRouters/deviceTestRouter'
import { storageRouter } from './subRouters/fileStorage'

const nestedRouters = [
    testRouter,
    storageRouter,
    authRouter
]

const apiRouter = new Router({ prefix: '/api' })

apiRouter.match('/^.*\/api\/((?!auth)\/*.)', '')

for (const r of nestedRouters) {
    apiRouter.use(r.routes(), r.allowedMethods())
}

export { apiRouter }