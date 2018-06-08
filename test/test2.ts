import * as m from 'mongoose'
import { accessibleRecordsPlugin } from '@casl/mongoose'
import { Ability, AbilityBuilder } from '@casl/ability'

function defineModel() {

    const Post_Schema = new m.Schema({
        title: String,
        text: String,
        comments: Number
    })

    Post_Schema.plugin(accessibleRecordsPlugin)

    return m.model('Post', Post_Schema)
}

async function createPost() {
    const model = defineModel()
    await model.insertMany([
        {title:'title1', text:'text1', comments: '0'},
        {title:'title2', text:'text2', comments: '10'},
        {title:'title2', text:'text2', comments: '20'}
    ])
}

function defineAbility() {
    const { rules, can } = AbilityBuilder.extract()

    // can('read', 'Post', { 'comments.0': { $exists: false } })

    can('read', 'Post', { 'comments': 0 })

    return new Ability(rules)
}

(async () => {

    await m.connect('mongodb://localhost:27017/blog')

    const model = defineModel()
    const ability = defineAbility()

    const docu = await model.accessibleBy(ability, 'read').find()
    console.log(docu)

    await m.disconnect()

})()