import {
  IDeviceDescription, IDevicePresentation,
  IDevice,
  ILocation
} from '../../db/models/esp8266Model'
import { IClientPublishOptions, MqttClient, PacketCallback } from 'mqtt'
import { EventEmitter } from 'koa'

/**
 * @type { S extends number, R exteds string }
 * @description Mqtt topics S - stage, R - room number
 * + single level wildcard system/+ 
 * \# multi-level wildcard system/#
 */
type Topic = '#' | 
  'system/client_id' |
  'system/#' |
  'system/+' |
  `stage/${number}/#` |
  `stage/${number}/+` |
  `stage/${number}/${string}/#` |
  `stage/${number}/${string}/+`

interface IMessage <T> {
  topic: Topic,
  value: T
}

interface IEsp8266Device extends IDevicePresentation <IDevice> {
  getDeviceSystemInfo: (force: boolean) => Promise <IDevice>
  detect: () => void
  subscribe: (topic: Topic) => Promise <void>
  sendMessage: <T> (message: IMessage <T>, options: IClientPublishOptions, cb: PacketCallback) => void
}

export class Esp8266Device extends EventEmitter implements IEsp8266Device {

  device: IDevice
  description: IDeviceDescription
  location: ILocation
  brokerClient: MqttClient
  topics: Topic[] = ['system/#', '#']

  constructor (brokerClient: MqttClient, devicePresentation: IDevicePresentation <IDevice>, topicsToSubscribe: Topic []) {
    super()
    this.brokerClient = brokerClient
    this.device = devicePresentation.device
    this.description = devicePresentation.description
    this.location = devicePresentation.location
    this.topics.push(...topicsToSubscribe)

    for (const topic of this.topics) {
      this.brokerClient.subscribe(`${this.device.clientId}`)
    }

    brokerClient.on('message', (topic, message) => {
      if (this.topics.includes(topic as Topic)) {
        this.emit(`${this.device.clientId}-${topic}-message`, message)
      }
    })
  }

  /**
   * @method getClientInfo obtains controller system info
   * @argument { boolean } force force to recive info from controller is it even has stored preveously
   * @returns { Promise <IDevice | null> }
   */
  getDeviceSystemInfo (force = true): Promise <IDevice> {
    return new Promise((resolve, reject) => {
      if (this.device && !force) {
        resolve (this.device)
        return
      }
      this.on(`${this.device.clientId}-system-message`, data => {
        const { value } = JSON.parse(data)

        if (!value || Object.values(value).includes(null)) {
          reject('invalid device info: ' + data)
        } else {
          this.device = value
          resolve(value)
        }
      })
    })
  }

  /**
   * @description Turns on the led to recognize the device
   * @returns unknown
   */
  detect () {
    return undefined
  }

  /**
   * @description Add a topic to list of observed topics for device
   * @param topic topic to subscribe
   * @returns {Promise <void>}
   */
  subscribe(topic: Topic): Promise <void> {
    return new Promise ((resolve, reject) => {
      if (this.topics.includes(topic)) {
        return
      }

      this.topics.push(topic)
      this.brokerClient.subscribe(topic, error => {
        if (error) {
          reject()
        }
        resolve()
      })
    })
  }

  /**
   * @description sent the message to device
   * @param message {IMessage} message to send contains device/clientId topic by default
   * @param options { IClientPublishOptions } {qos: 0, retain: false} by default
   * @param cb { PacketCallback }
   */
  sendMessage <T>(message: IMessage<T>, options: IClientPublishOptions = { qos: 0, retain: false }, cb: PacketCallback): void {
    const { 
      topic = `device/${this.device.clientId}`,
      value  
    } = message
    this.brokerClient.publish(topic, JSON.stringify(value), options, cb)
  }
}


export function requestEsp8266Devices (client: MqttClient): Promise <IDevice[]> {
  const devices: IDevice[] = []
  
  return new Promise((resolve, reject) => {
    client.subscribe('_device/*', error => {
      if (error) {
        reject(error)
      }
    })
    
    client.on('message', (topic, message) => {
      const { value } =  JSON.parse(message.toString()) as { value: IDevice }
      if (value) {
        devices.push(value)
      }
    })
    setTimeout(() => devices.length ? resolve(devices) : reject('no devices were detected'), 30000)
    client.publish('system', '')
  })
}