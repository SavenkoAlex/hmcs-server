import { Context, Next } from 'koa'
import { verify } from 'jsonwebtoken'

export function verifyToken (ctx: Context, next: Next): void {

        const { token } = <{ token: string }> <unknown> ctx.request.body || ctx.request.query

        if (!token) {
            ctx.throw(403)
        }
    
        verify(token, process.env.TOKEN_KEY as string, function (err) {
            if (err) {
                ctx.throw(401)
            }
            return next()
        })
}