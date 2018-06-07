import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import { router as user } from './user/router'
import { router as essay } from './essay/router'

export async function createApp() {

    const app = new Koa()

    app.use(bodyparser())

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.response.status = error.status || 500;
            ctx.body = { success: false, message: error.message };
        }
    })
    
    app.use(user.routes())

    app.use(essay.routes())

    app.listen(3000)
    console.log(`starting at port 3000`)
}