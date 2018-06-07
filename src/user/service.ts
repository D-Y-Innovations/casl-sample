import * as http_errors from 'http-errors'
import { User, UserDocu } from './model'
import * as Koa from 'koa'
import * as Abilities from '../abilities'
import * as JWT from '../jwt'

export async function create(ctx: Koa.Context) {
    const data: UserDocu = ctx.request.body
 
    try {
        await User.insertMany([data])
    } catch (error) {
        throw new http_errors.NotAcceptable(`${data.email} is registed`)
    }
    
    ctx.request.body = { success: true }
}

export async function login(ctx: Koa.Context) {
    const data: UserDocu = ctx.request.body
    
    const user = await User.findOne({email: data.email})

    if(!user) throw new http_errors.NotFound(`${data.email} not found`)

    if(data.password != user.password)
        throw new http_errors.NotAcceptable(`password verify failed`)
    
    const ability = Abilities.defineAbilitiesFor(user)
        
    const token =  JWT.sign(ability, user._id)
    
    ctx.response.body = { token }
}

function guest(ctx: Koa.Context) {
    const ability = Abilities.Guest

    const token =  JWT.sign(ability)

    ctx.response.body = { token }
}

export async function session(ctx: Koa.Context) {

    const data: UserDocu = ctx.request.body

    if(!data.email) {
        guest(ctx)
    } else {
        await login(ctx)
    }
}

export async function checkUserExisted(_id: string) {
    const user = await User.findOne({_id})

    if(!user) throw new http_errors.NotFound(`user not found`)

    return user
}