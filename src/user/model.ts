import * as m from 'mongoose'
import * as casl_m from '@casl/mongoose'
import * as service from './service'

export interface UserDocu {
    email: string
    password: string
    type: string
}

const User_Schema = new m.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String, default: 'normal' }
  }, {
    timestamps: true
})

User_Schema.plugin(casl_m.accessibleRecordsPlugin)

export const User = m.model<UserDocu & m.Document>('User', User_Schema)

