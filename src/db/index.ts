import mongoose from 'mongoose'
import { Db } from 'mongodb'
import { config } from '../config'
import { mongooseBeautyfy } from 'mongoose-beautiful-unique-validation'

mongoose.plugin(mongooseBeautyfy)

export default async function (): Promise <Db> {
    const  {
        databaseHost,
        databasePort,
        dbName
    } = config
    
    const connection = await mongoose.connect(`${databaseHost}:${databasePort}/${dbName}`, {
        useNewUrlParser: true,
        family: 4,
        useUnifiedTopology: true
    })

    return connection.connection.db
}