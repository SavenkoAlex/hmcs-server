import config from '../config/config'
import * as mqtt from 'mqtt'
import { requestEsp8266Devices } from '../services/deviceInteraction/deviceClass'
const host = config.mqttHost
const port = config.mqttPort

const client = mqtt.connect(`mqtt://${host}:${port}`, {
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  connectTimeout: 4000,
  username: config.mqttUser,
  password: config.mqttPassword,
  reconnectPeriod: 1000
})

let disp: NodeJS.Timeout
let lamp = true
/*

  */
 
client.on('connect', () => {
  //client.subscribe('_device/*')
  console.log('connected to mqtt server')
  void requestEsp8266Devices(client).then(r => console.log(r))
  //client.publish('system', '')  
})

/*
client.on('message', (topic, message) => {
  console.log('topic\n', topic)
  const msgObject = JSON.parse(message.toString())
  const { clientId, ip, mac, usageType } = msgObject.value
  if (clientId) {
    disp = setInterval(() => {
    lamp = !lamp
    client.publish(`device/${clientId}`, JSON.stringify({value: lamp}), { qos: 0, retain: false }, error => {
      if (error) {
        console.error(error)
        clearInterval(disp)
      }
    })
  }, 3000)
  }
})
*/

export {
  client
}

