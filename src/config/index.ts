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

export const config = {
    databasePort: process.env.MONGO_PORT,
    dbName: process.env.MONGO_COLLECTION || 'treePalnter',
    databaseHost: process.env.MONGODB_HOST,
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttUser: process.env.MQTT_USER,
    mqttPassword: 'treeplanter',
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8887,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: '/usr/bin/ffmpeg',
            tasks: [{
                app: 'live',
                hls: true,
                vc: 'libx264',
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                hlsKeep: true,
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                dashKeep: true
            }]
        }
    }
 }
