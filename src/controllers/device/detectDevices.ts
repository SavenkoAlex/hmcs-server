import koa from 'koa'
import { devicePresentationModel, IDevicePresentation } from '../../db/models/esp8266Model'
import { requestEsp8266Devices } from '../../services/deviceInteraction/deviceClass'

export async function requestAvailableDevices (ctx: koa.Context): Promise <void> {
  const availableDevices = await requestEsp8266Devices(ctx.mqttClient)
  ctx.body = availableDevices
  ctx.status = 200
}