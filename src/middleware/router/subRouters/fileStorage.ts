import Router from '@koa/router'
import { saveFile } from '../../../controllers/fileStorage'
const storageRouter = new Router({ prefix: '/file'})

storageRouter.post('/store', saveFile)

export { storageRouter }