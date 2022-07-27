import dotenv from 'dotenv'
import path from 'path'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.TOKEN_KEY = 'some string'

const envPath = path.resolve(__dirname, '../../.env')

const envFound = dotenv.config({
    path: path.resolve(envPath)
})

if (envFound.error) {
    throw new Error('can\'t find env file')
}

const config = {
    databasePort: process.env.MONGO_PORT,
    dbName: process.env.MONGO_COLLECTION || 'treePalnter',
    databaseHost: process.env.MONGODB_HOST,
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttUser: process.env.MQTT_USER,
    mqttPassword: 'treeplanter'
 }

 export {
    config
 }