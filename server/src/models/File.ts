import mongoose, { Document, Schema } from 'mongoose'

export interface IFile extends Document {
    filename: string
    mimetype: string
    size: number
    data: Buffer
    createdAt: Date
}

const fileSchema = new Schema<IFile>({
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
    createdAt: { type: Date, default: Date.now }
})

export const File = mongoose.model<IFile>('File', fileSchema)
