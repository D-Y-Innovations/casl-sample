import * as m from 'mongoose'
import * as casl_m from '@casl/mongoose'

export interface EssayDocu {
    author: m.Schema.Types.ObjectId
    title: string
    text: string
}

const Essay_Schema = new m.Schema({
    author: { type: m.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  }, {
    timestamps: true
})

Essay_Schema.plugin(casl_m.accessibleRecordsPlugin)

export const Essay = m.model<EssayDocu & m.Document>('Essay', Essay_Schema)