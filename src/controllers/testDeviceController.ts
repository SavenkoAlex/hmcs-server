import { Context } from 'koa'
import { 
  turnOffLamp, 
  turnOnLamp,
  getDeviceSysInfos
} from '../services/mqttTestService'


export async function getSysInfo (ctx: Context) {
  try {
    const info = await getDeviceSysInfos()
    ctx.body = info
    ctx.status = 200
    return
  } catch (err) {
    ctx.status = 500
    return
  }
}

export async function switchLamp(ctx: Context) {
  const {
    lampState = 'ON'
  } =  <{lampState: string}> ctx.request.body
  

  try {
    if (lampState === 'ON') {
      await turnOnLamp()
    } else if (lampState === 'OFF') {
      await turnOffLamp()
    }
  } catch (err) {
    ctx.status = 500
    return
  }
  ctx.status = 200
}