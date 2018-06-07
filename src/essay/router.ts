import * as Router from 'koa-router'
import * as service from './service'

export const router = new Router()

router.get('/essay/all', async ctx => {
    await service.findAll(ctx)
})

router.get('/essay/own', async ctx => {
    await service.findOwn(ctx)
})

router.post('/essay', async ctx => {
    await service.createEssay(ctx)
})

router.put('/essay', async ctx => {
    await service.updateEssay(ctx)
})

router.delete('/essay/:id', async ctx => {
    await service.deleteEssay(ctx)
})