import { MqttClient } from 'mqtt'
import { MqttBroker } from '../modules/mqtt'

const broker = MqttBroker.getInstance()

enum LampState {
  ON = 1,
  OFF = 0
}

const topic = 'test/espruino'

export async function getDeviceSysInfos () {
  (broker as MqttBroker).subscribe('_devices/system');

  const listener = await (broker as MqttBroker).publish({
    topic: 'system'
  })

  if (listener instanceof Error) {
    return
  }

  return new Promise((resolve, reject) => {
    listener.on((topic: MqttTopic, message: string | Buffer) => {
      if (topic) {
        console.log(topic)
      }
      console.log(message.toString())
      listener.disp((err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
      })
      void resolve(message)
    })
  })
}

export function turnOffLamp () {
  (broker as MqttBroker).publish({
    topic,
    payloadObject: {
      value: !!LampState.OFF,
      isBuffer: false
    }
  })
}

export function turnOnLamp () {
  return (broker as MqttBroker).publish({
    topic,
    payloadObject: {
      value: !!LampState.ON,
      isBuffer: false
    }
  })
}
