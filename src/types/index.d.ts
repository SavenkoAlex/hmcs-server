import { Request } from 'koa'

declare global {

  type MqttTopic = 'test/espruino' | `device/${string}` | 'system' | '_devices/system'

  type MqttMessagePayLoad = {
    value: string | Buffer | boolean,
    isBuffer: boolean
    [key?: string]: unknown,
  }

}