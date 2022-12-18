import koa from 'koa'
import { User, TUser } from '../db/models/userModel'
import { login } from '../services/authorization'

async function authorize (ctx: koa.Context, next: koa.Next): Promise <void> {
    const { email, hashPassword: password } = <TUser> ctx.request.body

    const { user = null, token = null } = await login (email, password)
    
    if (user && token ) {
        ctx.body = { ...user, ...{ token } }
        ctx.cookies.set('access_token', token, {
            httpOnly: true,
            sameSite: 'strict'
        })
        ctx.status = 200
        return
    }

    ctx.body = 'Invalid credentials'
    ctx.status = 401
}


async function register (ctx: koa.Context, next: koa.Next): Promise <void> {
    const { name, email, hashPassword } =  <TUser> ctx.request.body

    const user = new User({ email, hashPassword, name })
    await user.save()
    ctx.status = 201
}


export {
    authorize,
    register
}