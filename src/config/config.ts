import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.TOKEN_KEY = 'some string'

const envFound = dotenv.config()

if (envFound.error) {
    throw new Error('can\'t find env file')
}

export default {
    databasePort: process.env.MONGO_PORT,
    dbName: process.env.MONGO_COLLECTION || 'treePalnter',
    databaseHost: process.env.MONGODB_HOST
}