// In this file you can configure migrate-mongo
const path = require('path')
const dotenv = require('dotenv')

const envPath = path.resolve(__dirname, '.env')
const envFound = dotenv.config({
  path: path.resolve(envPath)
})

if (envFound.error) {
    throw new Error('can\'t find env file')
}

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: `${process.env.MONGODB_HOST}:${process.env.MONGO_PORT}`,

    // TODO Change this to your database name:
    databaseName: process.env.MONGO_COLLECTION,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: path.resolve(__dirname, 'migrations'),

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,

  // Don't change this, unless you know what you're doing
  moduleSystem: 'commonjs',
}
module.exports = config;

