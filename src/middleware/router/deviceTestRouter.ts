import Router from "@koa/router"
import { 
  switchLamp,
  getSysInfo
} from "../../controllers/testDeviceController"

const testRouter = new Router({ prefix: '/testDevice' })

testRouter.get('/sys', getSysInfo)
testRouter.post('/test', switchLamp)

export {
  testRouter
}