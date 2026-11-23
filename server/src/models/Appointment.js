import mongoose from 'mongoose'

export const APPOINTMENT_STATUSES = ['Confirmada', 'Cancelada']

const requiredText = () => ({ type: String, required: true, trim: true })

const appointmentSchema = new mongoose.Schema(
  {
    patientUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    time: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
    center: requiredText(),
    specialty: requiredText(),
    doctor: requiredText(),
    box: { type: String, trim: true, default: 'Por asignar' },
    reason: { type: String, trim: true, default: '', maxlength: 500 },
    status: { type: String, enum: APPOINTMENT_STATUSES, default: 'Confirmada' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id
        delete ret.patientUser
        return ret
      },
    },
  },
)

// Un profesional no puede tener dos horas CONFIRMADAS a la misma fecha y hora
appointmentSchema.index(
  { doctor: 1, date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: 'Confirmada' } },
)

export const Appointment = mongoose.model('Appointment', appointmentSchema)