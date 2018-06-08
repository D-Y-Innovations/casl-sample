import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'

const payload = {
    Name: 'Lee',
    Admin: true
}

const privateKey = fs.readFileSync('/home/dy/private.key', { encoding:'utf8' })

const publicKey = fs.readFileSync('/home/dy/public.key', { encoding:'utf8' })

const enToken = jwt.sign(payload, privateKey, { algorithm:'RS256', noTimestamp: true })
console.log(enToken)

// const r = jwt.verify(enToken, publicKey, {})
// console.log(r)

setTimeout(() => {
    const r = jwt.verify(enToken, publicKey, { maxAge: '1s' }, (err, playload) => {
        console.log(err)
    })
    
}, 2000);

