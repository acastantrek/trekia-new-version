import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  process: string
}
type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = { name: '', company: '', email: '', phone: '', process: '' }

// Atributos de cada campo: obligatorio, autorrelleno del navegador y longitud máxima
const fieldConfig: Record<
  keyof FormData,
  { required: boolean; autoComplete?: string; maxLength: number }
> = {
  name: { required: true, autoComplete: 'name', maxLength: 100 },
  company: { required: true, autoComplete: 'organization', maxLength: 120 },
  email: { required: true, autoComplete: 'email', maxLength: 254 },
  phone: { required: false, autoComplete: 'tel', maxLength: 20 },
  process: { required: true, maxLength: 2000 },
}

const fieldId = (field: keyof FormData | 'privacy') => `contact-${field}`
const errorId = (field: keyof FormData | 'privacy') => `contact-${field}-error`

interface FieldProps {
  field: keyof FormData
  label: string
  error?: string
  children: ReactNode
}

// Etiqueta, control y error de un campo. El error va fuera de la etiqueta y se enlaza con
// `aria-describedby`: el lector de pantalla lo lee después del nombre del campo
function Field({ field, label, error, children }: FieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={fieldId(field)}>
        {label}
        {fieldConfig[field].required && (
          <span className="form-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && <small id={errorId(field)}>{error}</small>}
    </div>
  )
}

// La access key de Web3Forms es pública por diseño: solo permite enviar al correo asociado
const WEB3FORMS_ACCESS_KEY = '5f80f6d1-7df1-4d24-8344-0ff0297350fe'

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [privacyError, setPrivacyError] = useState(false)

  const validate = () => {
    const next: FormErrors = {}
    if (form.name.trim().length < 2) next.name = 'Indica tu nombre.'
    if (form.company.trim().length < 2) next.company = 'Indica la empresa.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Introduce un email válido.'
    if (form.phone && !/^[+\d\s()-]{7,20}$/.test(form.phone))
      next.phone = 'Introduce un teléfono válido.'
    if (form.process.trim().length < 15)
      next.process = 'Cuéntanos un poco más (mínimo 15 caracteres).'
    setErrors(next)
    setPrivacyError(!privacyAccepted)
    // Primer campo con error, en el orden del formulario (los errores se añaden en ese orden)
    const [firstInvalid] = Object.keys(next) as (keyof FormData)[]
    return firstInvalid ?? (privacyAccepted ? null : 'privacy')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return
    // Los errores se pintan antes de mover el foco: si no, al aparecer los mensajes el navegador
    // ajusta el scroll (scroll anchoring) y deja el campo enfocado fuera de pantalla
    const firstInvalid = flushSync(validate)
    if (firstInvalid) {
      // El foco va al primer campo con error, que anuncia su mensaje por `aria-describedby`
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }
    // Campo trampa: si un bot lo rellena, se descarta el envío sin avisar
    const botcheck = event.currentTarget.elements.namedItem('botcheck') as HTMLInputElement
    setSending(true)
    setSendError(false)
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nueva solicitud web: ${form.company}`,
          from_name: 'Web Trekia',
          botcheck: botcheck.checked,
          name: form.name,
          email: form.email,
          Empresa: form.company,
          Teléfono: form.phone || '—',
          'Proceso a optimizar': form.process,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message)
      setSuccess(true)
      setForm(initialForm)
      setPrivacyAccepted(false)
    } catch (error) {
      console.error('Error al enviar el formulario de contacto:', error)
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const update = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  // Atributos comunes de los inputs y del textarea
  const control = (field: keyof FormData) => ({
    id: fieldId(field),
    name: field,
    value: form[field],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(field, event.target.value),
    autoComplete: fieldConfig[field].autoComplete,
    maxLength: fieldConfig[field].maxLength,
    'aria-required': fieldConfig[field].required,
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? errorId(field) : undefined,
  })

  if (success) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />
        <span>Solicitud recibida</span>
        <h2>Gracias por contarnos tu reto.</h2>
        <p>Revisaremos la información y te contactaremos para preparar el diagnóstico.</p>
        <button type="button" onClick={() => setSuccess(false)}>
          Enviar otra consulta
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <input
        type="checkbox"
        name="botcheck"
        className="form-botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <p className="form-required-note">
        Los campos con <span aria-hidden="true">*</span> son obligatorios.
      </p>
      <div className="form-row">
        <Field field="name" label="Nombre" error={errors.name}>
          <input {...control('name')} placeholder="Tu nombre" />
        </Field>
        <Field field="company" label="Empresa" error={errors.company}>
          <input {...control('company')} placeholder="Nombre de la empresa" />
        </Field>
      </div>
      <div className="form-row">
        <Field field="email" label="Email" error={errors.email}>
          <input {...control('email')} type="email" placeholder="nombre@empresa.com" />
        </Field>
        <Field field="phone" label="Teléfono" error={errors.phone}>
          <input {...control('phone')} type="tel" placeholder="+34 600 000 000" />
        </Field>
      </div>
      <Field field="process" label="¿Qué proceso quieres optimizar?" error={errors.process}>
        <textarea
          {...control('process')}
          rows={5}
          placeholder="Describe brevemente el proceso, las herramientas actuales y dónde detectas más fricción..."
        />
      </Field>
      {sendError && (
        <p className="form-error" role="alert">
          No se ha podido enviar la solicitud. Inténtalo de nuevo en unos minutos.
        </p>
      )}
      <div className="form-footer">
        <div className="form-consent">
          <label>
            <input
              type="checkbox"
              id={fieldId('privacy')}
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked)
                setPrivacyError(false)
              }}
              aria-required
              aria-invalid={privacyError}
              aria-describedby={privacyError ? errorId('privacy') : undefined}
            />
            <span>
              He leído y acepto la{' '}
              <Link to="/politica-privacidad" target="_blank" rel="noopener">
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {privacyError && (
            <small id={errorId('privacy')}>Debes aceptar la política de privacidad.</small>
          )}
        </div>
        <button className="submit-button" type="submit" disabled={sending}>
          {sending ? 'Enviando…' : 'Enviar solicitud'} <ArrowRight size={18} />
        </button>
      </div>
    </form>
  )
}
