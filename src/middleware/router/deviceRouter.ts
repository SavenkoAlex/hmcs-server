import Router from '@koa/router'
import {
  requestAvailableDevices
} from '../../controllers/device/detectDevices'

const deviceRouter = new Router({ prefix: '/device' })

deviceRouter.get('/request/all', requestAvailableDevices)

export {
  deviceRouter
}
