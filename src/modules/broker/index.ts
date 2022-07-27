type IBrokerConnectionOptions <T> = {
  [key in keyof T]: T[key]
}

type BrokerClient <T> = T | { isNotConnected: true }

export abstract class Broker <C> {

  protected client: BrokerClient <C>

  constructor () {
    this.client = {
      isNotConnected: true 
    }
  }

  getMqttClient <C> () {
    return this.client as BrokerClient <C>
  }

  abstract connect (): Promise <boolean | Error>
}