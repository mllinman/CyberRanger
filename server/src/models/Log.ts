import mongoose, { Document, Schema } from 'mongoose'

export interface ILog extends Document {
    level: string
    message: string
    meta?: any
    timestamp: Date
}

const logSchema = new Schema<ILog>({
    level: { type: String, required: true, enum: ['info', 'warn', 'error', 'debug'], default: 'info' },
    message: { type: String, required: true },
    meta: { type: Schema.Types.Mixed }, // Flexible field for any JSON data
    timestamp: { type: Date, default: Date.now, index: true } // Indexed for efficient sorting/querying
})

export const Log = mongoose.model<ILog>('Log', logSchema)
