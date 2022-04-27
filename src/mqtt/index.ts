import config from '../config/config'
import * as mqtt from 'mqtt'

const host = config.mqttHost
const port = config.mqttPort

const client = mqtt.connect(`mqtt://${host}:${port}`, {
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  connectTimeout: 4000,
  username: config.mqttUser,
  password: config.mqttPassword,
  reconnectPeriod: 1000
})

const topic = 'test/espruino'
let disp: NodeJS.Timeout
let lamp = true
client.on('connect', () => {
  console.log('connected to mqtt server')
    disp = setInterval(() => {
      lamp = !lamp
      client.publish(topic, JSON.stringify({payload: {value: lamp}}), { qos: 0, retain: false }, error => {
      if (error) {
        console.error(error)
        clearInterval(disp)
      }
    })
  }, 30000)
})

export {
  client
}