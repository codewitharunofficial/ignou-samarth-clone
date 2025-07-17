import mongoose, { Schema, Document, models, model } from 'mongoose'

export interface ICampus extends Document {
  name: string
  location: string
  types: string[]
}

const CampusSchema: Schema<ICampus> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  types: {
    type: [String],
    required: true,
    validate: [(arr: string[]) => arr.length > 0, 'At least one type is required'],
  },
})

export const Campus = models.Campus || model<ICampus>('Campus', CampusSchema)
