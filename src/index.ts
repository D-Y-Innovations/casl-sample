import * as m from 'mongoose'
import * as app from './app'

(async () => {
    await m.connect('mongodb://localhost:27017/blog')

    app.createApp()

})()