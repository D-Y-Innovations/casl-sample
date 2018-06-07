import * as jwt from 'jsonwebtoken'
import { RawRule, Ability } from '@casl/ability'

export interface Token {
    _id: string
    rules: RawRule[]
}

export function sign(ability: Ability, _id?: string,) {
    const token: Token = {
        _id: _id || '',
        rules: ability.rules
    }
    
    return jwt.sign({
        data: token
    }, 'secret', { expiresIn: '1h' })

}

export function verify(token: string) {
    try {
        const decoded = jwt.verify(token, 'secret') as any
        return decoded.data as Token
    } catch (error) {
        throw error
    }
}