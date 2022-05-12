import Koa from 'koa'
import rout from './middleware/router'
import dbConnect from './db'
import { client } from './services/mqtt'
const app = new Koa()

dbConnect()
    .then(conn => {
        console.log('Successfully connect to database', conn.databaseName)
    })
    .catch(err => {
        console.error('Database connection error: ', err.message)
        process.exit(1)
    })

app.use(async (ctx, next) => {
    try {
        await next()
    } catch ({ message }) {
        ctx.throw(message as string, 500)
    }
})

app.context.mqttClient = client

rout(app)

client.on('packetsend', (e) => {
    console.log('packagesend ', e)
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})