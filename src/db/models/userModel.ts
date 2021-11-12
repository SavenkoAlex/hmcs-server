import mongoose, { Model } from 'mongoose'
import { 
    createHash,
    createSalt,
    removeProperties,
    checkPassword
} from '../helper'

interface User {
    name: string,
    email: string,
    hashPassword: string,
    salt: string,
    created: Date,
    isActive: boolean,
}

type TUser = {
    [key in keyof User]: string
}

interface UserModel extends Model <User> {
    login: (email: string, password: string) => Promise <User | false>,
}

const userSchema = new mongoose.Schema <User, UserModel> ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'email is required',
        match: /.*@.*/
    },
    hashPassword: {
        type: String,
        required: true,
        select: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    salt: {
        type: String,
        select: false
    }},
    {
    
        toObject: {
            transform: removeProperties('hashPassword', 'salt')
        },
        
        toJSON: {
            transform: removeProperties('hashPassword', 'salt')
        }
    }
)

userSchema.pre('save', async function () {
    if (this.isModified('hashPassword')) {
        this.salt = await createSalt()
        this.hashPassword = await createHash(this.hashPassword, this.salt)
    }
})

userSchema.static('login', async function login (login, password)  {
    const user = await this.findOne({email: login}).select('+hashPassword +salt')
    if (!user){
        return false
    }
    if (!await checkPassword(password, user.hashPassword,  user.salt)) {
        return false
    }

    return user.toJSON()
})

const User = mongoose.model <User, UserModel> ('user', userSchema)

export {
    User,
    TUser
}