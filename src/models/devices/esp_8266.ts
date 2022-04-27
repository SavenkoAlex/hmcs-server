import { Channel } from 'amqplib'

interface BaseEspDevice {
  mac: string,
  v4addr: '/ddd:ddd:ddd:ddd/'
  [key: string]: unknown
}


interface Message {
  type: 'SYSTEM' | 'DEFAULT'
  payload: string,
  [key: string]: unknown
}

