import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { EMPTY_PATIENT_FORM, INITIAL_PATIENTS } from '../constants/patients'
import { PatientForm } from '../components/patients/PatientForm'
import { PatientList } from '../components/patients/PatientList'
import { PatientSearch } from '../components/patients/PatientSearch'
import type { PatientFormValues, PatientRecord } from '../types/patient'

type VerificationState = 'idle' | 'verified' | 'invalid' | 'duplicate'

function normalizeRut(rut: string) {
  return rut.replace(/\./g, '').replace(/\s/g, '').toLocaleUpperCase('es')
}

function isValidRut(rut: string) {
  const normalizedRut = normalizeRut(rut)
  const match = /^(\d{7,8})-([\dK])$/.exec(normalizedRut)
  if (!match) return false

  const body = match[1]
  const providedCheckDigit = match[2]
  if (!body || !providedCheckDigit) return false

  let multiplier = 2
  let sum = 0
  for (let index = body.length - 1; index >= 0; index -= 1) {
    sum += Number(body[index]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = 11 - (sum % 11)
  const expectedCheckDigit = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder)
  return providedCheckDigit === expectedCheckDigit
}

function isSameRut(firstRut: string, secondRut: string) {
  return normalizeRut(firstRut) === normalizeRut(secondRut)
}

function formValuesFromPatient(patient: PatientRecord): PatientFormValues {
  return {
    rut: patient.rut,
    fullName: patient.fullName,
    birthDate: patient.birthDate,
    healthPlan: patient.healthPlan,
    address: patient.address,
    commune: patient.commune,
    email: patient.email,
    phone: patient.phone,
    emergencyContactName: patient.emergencyContactName,
    emergencyRelationship: patient.emergencyRelationship,
    emergencyPhone: patient.emergencyPhone,
  }
}

export function AdminPatientsView() {
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(INITIAL_PATIENTS[0]?.id ?? null)
  const [values, setValues] = useState<PatientFormValues>(
    INITIAL_PATIENTS[0] ? formValuesFromPatient(INITIAL_PATIENTS[0]) : { ...EMPTY_PATIENT_FORM },
  )
  const [searchRut, setSearchRut] = useState('')
  const [verificationState, setVerificationState] = useState<VerificationState>('verified')
  const [verificationMessage, setVerificationMessage] = useState('RUT verificado, sin duplicados')

  const visiblePatients = useMemo(() => {
    const normalizedSearch = normalizeRut(searchRut)
    if (!normalizedSearch) return patients
    return patients.filter((patient) => normalizeRut(patient.rut).includes(normalizedSearch))
  }, [patients, searchRut])

  function handleSearchRut() {
    const rut = searchRut.trim()
    if (!isValidRut(rut)) {
      setVerificationState('invalid')
      setVerificationMessage('Ingresa un RUT válido para verificar el identificador.')
      return
    }

    const existingPatient = patients.find((patient) => isSameRut(patient.rut, rut))
    if (existingPatient) {
      setSelectedPatientId(existingPatient.id)
      setValues(formValuesFromPatient(existingPatient))
      setVerificationState('verified')
      setVerificationMessage('RUT verificado, sin duplicados')
      return
    }

    setSelectedPatientId(null)
    setValues({ ...EMPTY_PATIENT_FORM, rut })
    setVerificationState('verified')
    setVerificationMessage('RUT verificado, sin duplicados')
  }

  function handleSelectPatient(patient: PatientRecord) {
    setSelectedPatientId(patient.id)
    setValues(formValuesFromPatient(patient))
    setSearchRut(patient.rut)
    setVerificationState('verified')
    setVerificationMessage('RUT verificado, sin duplicados')
  }

  function handleRegisterPatient() {
    setSelectedPatientId(null)
    setValues({ ...EMPTY_PATIENT_FORM })
    setSearchRut('')
    setVerificationState('idle')
    setVerificationMessage('Verifica el RUT antes de guardar la información.')
  }

  function handleValueChange(field: keyof PatientFormValues, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    if (field === 'rut') {
      setVerificationState('idle')
      setVerificationMessage('Verifica el RUT antes de guardar la información.')
    }
  }

  function handleDiscardChanges() {
    const selectedPatient = patients.find((patient) => patient.id === selectedPatientId)
    if (selectedPatient) {
      setValues(formValuesFromPatient(selectedPatient))
      setVerificationState('verified')
      setVerificationMessage('RUT verificado, sin duplicados')
      return
    }

    setValues({ ...EMPTY_PATIENT_FORM })
    setVerificationState('idle')
    setVerificationMessage('Verifica el RUT antes de guardar la información.')
  }

  function handleSavePatient() {
    if (!isValidRut(values.rut)) {
      setVerificationState('invalid')
      setVerificationMessage('Ingresa un RUT válido antes de guardar.')
      return
    }

    const duplicatePatient = patients.find(
      (patient) => isSameRut(patient.rut, values.rut) && patient.id !== selectedPatientId,
    )
    if (duplicatePatient) {
      setVerificationState('duplicate')
      setVerificationMessage(`Este RUT ya está registrado a nombre de ${duplicatePatient.fullName}.`)
      return
    }

    const savedPatient: PatientRecord = {
      ...values,
      id: selectedPatientId ?? `patient-${Date.now()}`,
      initials: patients.find((patient) => patient.id === selectedPatientId)?.initials,
      status: 'Activo',
    }
    setPatients((currentPatients) => {
      if (selectedPatientId) {
        return currentPatients.map((patient) =>
          patient.id === selectedPatientId ? savedPatient : patient,
        )
      }
      return [savedPatient, ...currentPatients]
    })
    setSelectedPatientId(savedPatient.id)
    setValues(formValuesFromPatient(savedPatient))
    setSearchRut(savedPatient.rut)
    setVerificationState('verified')
    setVerificationMessage('RUT verificado, sin duplicados')
  }

  const isIdentifierVerified = verificationState === 'verified'

  return (
    <section aria-labelledby="patients-page-title">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.13em] text-[#147a72]">GESTIÓN CLÍNICA</p>
          <h1 id="patients-page-title" className="mt-1 text-2xl font-normal leading-tight text-[#283432] sm:text-[32px]">
            Gestión de pacientes
          </h1>
          <p className="mt-2 text-sm text-[#64716d]">
            Consulta y actualiza información personal y de contacto.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRegisterPatient}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#147a72] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72] sm:mt-[18px]"
        >
          <Plus size={17} aria-hidden="true" />
          Registrar paciente
        </button>
      </div>

      <PatientSearch
        rut={searchRut}
        onRutChange={(rut) => {
          setSearchRut(rut)
          if (verificationState !== 'idle') {
            setVerificationState('idle')
            setVerificationMessage('Verifica el RUT antes de guardar la información.')
          }
        }}
        onSearch={handleSearchRut}
      />

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.8fr)]">
        <PatientList
          patients={visiblePatients}
          selectedPatientId={selectedPatientId}
          onSelectPatient={handleSelectPatient}
        />
        <PatientForm
          values={values}
          isIdentifierVerified={isIdentifierVerified}
          verificationMessage={verificationMessage}
          onChange={handleValueChange}
          onSave={handleSavePatient}
          onDiscard={handleDiscardChanges}
        />
      </div>
    </section>
  )
}
