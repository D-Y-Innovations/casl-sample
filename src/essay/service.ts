import * as http_errors from 'http-errors'
import * as Koa from 'koa'
import * as Abilities from '../abilities'
import * as extra from '@casl/ability/extra'
import * as JWT from '../jwt'
import { Ability } from '@casl/ability'
import * as lo from 'lodash'

import { Essay, EssayDocu } from './model'
import { User, UserDocu } from '../user/model'
import * as userService from '../user/service'


export async function findAll(ctx: Koa.Context) {
    const token = JWT.verify(ctx.request.headers.token)

    const essays = await findEssays(token, 'read')

    ctx.response.body = { data: essays }
}

export async function findOwn(ctx: Koa.Context) {
    const token = JWT.verify(ctx.request.headers.token)

    const essays = await findEssays(token, 'own')

    ctx.response.body = { data: essays }
}

export async function createEssay(ctx: Koa.Context) {
    const token = JWT.verify(ctx.request.headers.token)

    const ability = new Ability(token.rules)
    ability.throwUnlessCan('create', 'Essay')

    const user = await userService.checkUserExisted(token._id)

    const data: EssayDocu = {
        author: user._id,
        title: ctx.request.body.title,
        text: ctx.request.body.text
    } 
    ctx.response.body = await Essay.insertMany([data])
}

interface ManageEssayRequest {
    essayId: string
    title: string
    text: string
}

export async function updateEssay(ctx: Koa.Context) {
    const token = JWT.verify(ctx.request.headers.token)

    const ability = new Ability(token.rules)
    ability.throwUnlessCan('update', 'Essay')

    const user = await userService.checkUserExisted(token._id)

    const allowFileds = extra.permittedFieldsOf(ability, 'update', 'Essay')

    const data = ctx.request.body as ManageEssayRequest
    const docu = lo.pick(data, allowFileds)

    await Essay.update({_id: data.essayId}, docu)

    ctx.response.body = { success: true }
}

export async function deleteEssay(ctx: Koa.Context) {
    const token = JWT.verify(ctx.request.headers.token)

    const ability = new Ability(token.rules)
    ability.throwUnlessCan('delete', 'Essay')

    await userService.checkUserExisted(token._id)

    const essayId = ctx.params.id

    await checkEssayExistedAndAuthor(essayId, token._id)

    await Essay.deleteOne({_id: essayId})

    ctx.response.body = { success: true }
}

async function findEssays(token: JWT.Token, action: string) {
    const ability = new Ability(token.rules)

    const fields = extra.permittedFieldsOf(ability, action, 'Essay')

    const essays = await Essay.accessibleBy(ability, action).find().select(fields)

    return essays
}

async function checkEssayExistedAndAuthor(essayId: string, authortId: string) {
    const essay = await Essay.findOne({_id: essayId})

    if(!essay) throw new http_errors.NotFound('essay does not existed')

    if(essay.author.toString() != authortId)
        throw new http_errors.NotAcceptable(`you can not delete this essay`)
}