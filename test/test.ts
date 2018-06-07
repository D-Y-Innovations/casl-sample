import { AbilityBuilder, Ability } from '@casl/ability'
import * as modules from './player'

const player = new modules.Player()
const musicPlayer = new modules.MusicPlayer()
const moviePlayer = new modules.MoviePlayer()

const ability = AbilityBuilder.define((can: any, cannot: any) => {
    can('manage', 'all')
    cannot('delete', 'all')
    can('delete', 'Post')

    can('play', player)
    can('music', musicPlayer)
    can('movie', moviePlayer)

})

// console.log(ability)

console.log(`can('delete', 'all')`,ability.can('delete', 'all'))  //false

console.log(`can('delete', 'Post')`, ability.can('delete', 'Post'))  //true

class Player {}
console.log(`can('play', new Player()`, ability.can('play', new Player()))  //true

console.log(`can('play', musicPlayer)`, ability.can('play', musicPlayer))   //false

console.log(`can('music', player)`, ability.can('music', player))       //false

console.log(`can('movie', moviePlayer)`, ability.can('movie', moviePlayer))  //true


