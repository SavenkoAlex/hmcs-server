import Koa from 'koa'
import rout from './middleware/router'
import dbConnect from './db'
import { MqttBroker } from './modules/mqtt'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import koaBody from 'koa-body'

const app = new Koa()
app.use(koaBody({ multipart: true }))

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



app.use(jwt({
    secret: process.env.TOKEN_KEY || '',
    passthrough: true
}).unless({
    path: [/^\/api\/auth\/(login|register)/,]
}))

rout(app)

MqttBroker.getInstance()
    .connect()
    .then(() => console.info('mqtt connected'))
    .catch(err => {
        console.error(err)
    });

app.listen(3000, () => {
    console.log('Server started on port 3000')
})