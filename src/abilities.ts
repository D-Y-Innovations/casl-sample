import { AbilityBuilder, Ability } from '@casl/ability'
import { UserDocu } from './user/model' 
import * as m from 'mongoose'

export function defineAbilitiesFor(user: UserDocu & m.Document) {
    const { rules, can } = AbilityBuilder.extract()

    if(user.type == 'admin') {
        can(['read', 'delete'], 'Essay')
        can('update', 'Essay', ['title', 'text'], {})

        can('read', 'User')
    } else {
        can('read', 'Essay')
        can('own', 'Essay', { author: user._id })
        can(['create', 'update'], 'Essay', ['title', 'text'], {})
        can('delete', 'Essay')

        can('read', 'User', ['email'], { _id: user._id })
        can('update', 'User')
    }

    return new Ability(rules)
}

export const Guest = AbilityBuilder.define((can: any) => {
    can('read', 'Essay', ['title', 'text'], {})
})
