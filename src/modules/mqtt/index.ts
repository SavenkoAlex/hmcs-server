import { config } from '../../config'
import { Broker } from '../broker'
import * as mqtt from 'mqtt'
import { CloseCallback, MqttClient } from 'mqtt'

const host = config.mqttHost
const port = config.mqttPort
const NOT_CONNECTED = 'isNotConnected'

interface IMqttBroker {
  publish: (pubishData: {
    topic: MqttTopic, 
    opt: mqtt.IClientOptions,
    payload?: MqttMessagePayLoad
  }) => Promise <Error | Published >
}

type Published = {
  on: (fn: (topic: MqttTopic, message: Buffer | string) => void) => void
  disp: (cb: CloseCallback) => void
}


export class MqttBroker extends Broker <mqtt.Client> implements IMqttBroker {

  protected publicationOptions: mqtt.IClientPublishOptions
  private static instance: MqttBroker

  private constructor() {
    super()
    this.publicationOptions = {
      qos: 0,
      retain: false
    }
  }
  
  static getInstance () {
    if (this.instance) {
      return this.instance
    }
    this.instance = new MqttBroker ()
    return this.instance
  }

  connect (): Promise <boolean | Error> {
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(`mqtt://${host}:${port}`, {
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        connectTimeout: 4000,
        username: config.mqttUser,
        password: config.mqttPassword,
        reconnectPeriod: 1000
      })

      this.client.on('connect', () => resolve(true))
      this.client.once('error', error => reject(error))
    })
  }

  subscribe (topic: MqttTopic) {
    
    if (NOT_CONNECTED in this.client) {
      new Error('client is not connected try to exec connect method')
    }
    //TODO: rewrite in Promise
    (this.client as mqtt.Client).subscribe(topic, err => {
      if (err) {
        console.error(err)
      }
    });
  }

  publish (publishData: {
    topic: MqttTopic, 
    options?: mqtt.IClientPublishOptions,
    payloadObject?: MqttMessagePayLoad
  }): Promise <Error | Published> {
   
    const {
      topic,
      options = this.publicationOptions,
      payloadObject = null
    } = publishData

    const payload = payloadObject 
    ? payloadObject.isBuffer 
      ? payloadObject.value as Buffer 
      //TODO: ? value
      : JSON.stringify(payloadObject)
    : ''

    return new Promise((resolve, reject) => {
      if (NOT_CONNECTED in this.client) {
        reject(new Error('client is not connected try to exec connect method'))
        return
      }

      (this.client as mqtt.Client)
        .publish(topic, payload, options || this.publicationOptions, (error) => {
          if (error) {
            reject(error)
          }
          resolve({
            on: (fn: (topic: MqttTopic, message: string | Buffer) => void) => {
              (this.client as mqtt.Client).on('message', fn)
            },
            disp: (fn: CloseCallback) => (this.client as mqtt.Client).end(true, {}, fn)
          })
        })
    })
  }
}