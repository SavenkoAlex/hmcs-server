import Router from '@koa/router'
import { register, authorize} from '../../controllers/authorization/authController'

const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/register', register)
authRouter.post('/login', authorize)
authRouter.post('/welcome', authorize)

export { authRouter }