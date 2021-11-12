import mongoose from 'mongoose'
import { Db } from 'mongodb'
import config from '../config/config'
import { mongooseBeautyfy } from 'mongoose-beautiful-unique-validation'

mongoose.plugin(mongooseBeautyfy)

export default async function (): Promise <Db> {
    const connection = await mongoose.connect(`${config.databaseHost}:${config.databasePort}/${config.dbName}`, {
        useNewUrlParser: true,
        family: 4
    })

    return connection.connection.db
}