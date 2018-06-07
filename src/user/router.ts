import * as Router from 'koa-router'
import * as service from './service'

export const router = new Router()

router.post('/user', async ctx => {
    await service.create(ctx)
})

router.post('/session', async ctx => {
    await service.session(ctx)
})