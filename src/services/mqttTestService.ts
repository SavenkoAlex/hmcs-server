import { MqttClient } from 'mqtt'
import { MqttBroker } from '../modules/mqtt'

const broker = MqttBroker.getInstance()

enum LampState {
  ON = 1,
  OFF = 0
}

const topic = 'test/espruino'

export function getDeviceSysInfos () {
  (broker as MqttBroker).subscribe('_devices/system');

  (broker as MqttBroker).publish({
    topic: 'system'
  });

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
