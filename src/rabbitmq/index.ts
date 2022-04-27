import config from '../config/config'
import { connect as rabbitConnect, Options, Connection } from 'amqplib'


export class RabbitMQ {
  protected rabbitConfig: Options.Connect
  private static instance: RabbitMQ
  connection: Connection | null

  private constructor () {
    this.rabbitConfig = {
      protocol: 'amqp',
      hostname: config.rabbitmqHost,
      username: config.rabbitmqUser,
      password: config.rabbitmqPassword,
      port: Number.parseInt(config.rabbitmqPort) || 5672
    }
    this.connection = null
  }

  static getRabbinInstance (): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ()
    }
    return RabbitMQ.instance
  }
  connect () {
    rabbitConnect(this.rabbitConfig)
      .then(connection => {
        this.connection = connection
        console.log(`successfully connected to Rabbit on ${this.rabbitConfig.hostname} ${this.rabbitConfig.port}`)
      })
      .catch(err => {
        console.error(err)
        this.connection = null
      })
  } 
}