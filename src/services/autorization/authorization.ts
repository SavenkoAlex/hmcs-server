import { User } from '../../db/models/userModel'
import { sign } from 'jsonwebtoken'

export async function login (login: string, password: string): Promise <{user: User, token: string} | undefined> {
    const user = await User.login(login, password)
    if (user) {
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.TOKEN_KEY as string, {
            expiresIn: '1h'
        })

        return { user, token }
    }
    return
}

