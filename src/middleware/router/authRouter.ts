import Router from '@koa/router'
import { register, authorize} from '../../controllers/authController'
import { verifyToken } from '../auth'

const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/register', register)
authRouter.post('/login', authorize)
authRouter.post('/welcome', authorize)

export { authRouter }