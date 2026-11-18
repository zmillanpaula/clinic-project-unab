import mongoose from 'mongoose'

export const RESOURCE_STATUSES = ['Operativo', 'Disponible', 'En uso', 'Mantención']

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    capacity: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: RESOURCE_STATUSES, default: 'Disponible' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      },
    },
  },
)

export const Resource = mongoose.model('Resource', resourceSchema)