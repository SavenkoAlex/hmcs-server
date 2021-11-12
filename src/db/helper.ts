import { promisify } from 'util'
import { randomBytes, pbkdf2 } from 'crypto'
import { Document, SchemaOptions, RefType } from 'mongoose'

const randomBytePromise = promisify(randomBytes)
const pbkdf2Promise = promisify(pbkdf2)

async function createSalt(): Promise <string> {
    const salt = await randomBytePromise(20)
    const saltString = salt.toString('hex')
    return saltString
}

async function createHash (password: string, salt: string): Promise <string> {
    const hash = await pbkdf2Promise(password, `${salt}`, 1, 64, 'sha512')
    const hashString = hash.toString('hex')
    return hashString
}

function removeProperties <
    R extends object,
    O extends R,
    K extends keyof O
> (...properties: K[]): (doc: Document, ret: O, options?: SchemaOptions) => R {
   return function (doc: Document, ret: O, options?: SchemaOptions) {
       for (const prop of properties) {
            delete ret[prop]
       }
       return ret
   }
} 

export async function checkPassword (password: string, hashPassword: string, salt: string) {
    const hash = await createHash (password, salt)
    return hashPassword === hash

}
export {
    createHash,
    createSalt,
    removeProperties
}