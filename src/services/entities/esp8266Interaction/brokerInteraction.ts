import { IClientPublishOptions, MqttClient, PacketCallback } from 'mqtt'

type Topic <S extends number, L extends string> = 
  '#' | 
  'client_id' |
  'system/#' |
  'system/+' | 
  `stage/${S}/#` |
  `stage/${S}/+` |
  `stage/${S}/${L}/#` |
  `stage/${S}/${L}/+`

interface IDevice {
  ip: `${string}.${string}.${string}.${string}`,
  mac: `${string}:${string}:${string}:${string}:${string}:${string}`
  clientId: string,
  status: 'enabled' | 'disabled' | 'unknown'
  isRemote: boolean,
  usageType: string
}

interface IDevicePresentationModel {
  name: string,
  stage: number,
  location: string
}

interface Imessage <T> {
  topic: Topic <number, string>,
  value: T
}

interface IController {
  device: IDevice | null
  presentation: IDevicePresentationModel | null
  clientId: string
  getPresentation: (clientId: string) => Promise <IDevicePresentationModel | undefined>
  getDeviceStatus: () => Promise <IDevice | undefined>
  publishMessage: <T> (message: Imessage <T>, opts: IClientPublishOptions, cb: PacketCallback) => void
}

class RemoteController implements IController {
  private client: MqttClient
  clientId: string
  device: IDevice | null
  presentation: IDevicePresentationModel | null

  constructor (client: MqttClient, clientId: string) {
    this.client = client
    this.clientId = clientId
    this.device = null
    this.presentation = null
    this.client.subscribe(`${this.clientId}`)
  }

  getDeviceStatus (force = false): Promise <IDevice | undefined > {
    return new Promise((resolve, reject) => {
      if (this.device && !force) {
        resolve(this.device)
      } else {
        this.client.on('message', data => {
          this.device = JSON.parse(data) as IDevice
          resolve(this.device)
        })
        this.client.publish(`${this.clientId}`, 'getSystemInfo', {
          qos: 0, retain: true
        }, error => {
          if (error) {
            reject(error)
          }
        })
      }
    }) 
  }

  getPresentation (clientId: string): Promise<IDevicePresentationModel | undefined> {
    return new Promise((resolve, reject) => {
      resolve({
        name: 'Test',
        stage: 1,
        location: 'hall'
      })
    })
  }

  publishMessage <T>(message: Imessage<T>, opts: IClientPublishOptions, cb: PacketCallback): void {
    this.client.publish(message.topic, JSON.stringify(message.value), { qos: 0, retain: false})
  }
}