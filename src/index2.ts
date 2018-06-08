import { AbilityBuilder, Ability } from '@casl/ability'
import * as extra from '@casl/ability/extra'
import { User, UserDocu } from "./user/model"
import { Essay, EssayDocu } from "./essay/model"
import * as m from 'mongoose'

(async () => {
    
    // await m.connect('mongodb://localhost:27017/blog')

    // const user = await User.findOne({email: 'l@dy.com'})

    

    // if(user != null) {

    //     console.log(user._id.toString())

    //     if('5b17d39d8adb3e37e8d59cee' == user._id.toString()){
    //         console.log(true)
    //     }

    //     // const ability = defineAbility(user)
    //     // console.log(ability.rules)

    //     // const fileds = extra.permittedFieldsOf(ability, 'own', 'Essay')
    //     // console.log(fileds)

    //     // const users = await Essay.accessibleBy(ability, 'own').find()
    //     // console.log(users)
     
    //     // console.log(ability.can('create', 'Essay', ''))

    // }
    

    // await m.disconnect()

    

    const ability = AbilityBuilder.define((can: any) => {
        Ability.addAlias('read', 'read /home/lt')
        can('read', 'all')
    })

    console.log(ability.can('read', '/home/lt/a/b/c/d/e/f/g/i.txt'))

})()


async function createEssay(email: string, title: string, text: string) {
    const user = await User.findOne({email})

    if(user != null) {
        const essay: EssayDocu = {
            author: user._id,
            title,
            text
        }

        const r = await Essay.insertMany([essay])
        console.log(r)
    }
}

async function createUser(email: string, password: string) {
    const user = {
        email,
        password
    }

    const r = await User.insertMany([user])
}

function defineAbility(user: UserDocu & m.Document) {
    const { rules, can } = AbilityBuilder.extract()

    // can('manage', 'Essay', { author: user._id })
    // can(['read'], 'User', { email: user.email })

    // can('own', 'User', { email: user.email })
    
    can('create', '/home/lt/')

    // can('create', 'Essay', { email: user.email })

    return new Ability(rules)
}