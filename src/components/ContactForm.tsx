import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  process: string
}
type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = { name: '', company: '', email: '', phone: '', process: '' }

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)

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
    return Object.keys(next).length === 0
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setSuccess(true)
    setForm(initialForm)
  }

  const update = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

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
      <div className="form-row">
        <label>
          Nombre
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Tu nombre"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          Empresa
          <input
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Nombre de la empresa"
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company && <small>{errors.company}</small>}
        </label>
      </div>
      <div className="form-row">
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="nombre@empresa.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <small>{errors.email}</small>}
        </label>
        <label>
          Teléfono
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+34 600 000 000"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <small>{errors.phone}</small>}
        </label>
      </div>
      <label>
        ¿Qué proceso quieres optimizar?
        <textarea
          rows={5}
          value={form.process}
          onChange={(e) => update('process', e.target.value)}
          placeholder="Describe brevemente el proceso, las herramientas actuales y dónde detectas más fricción..."
          aria-invalid={Boolean(errors.process)}
        />
        {errors.process && <small>{errors.process}</small>}
      </label>
      <div className="form-footer">
        <p>Al enviar aceptas que tratemos tus datos para responder a esta solicitud.</p>
        <button className="submit-button" type="submit">
          Enviar solicitud <ArrowRight size={18} />
        </button>
      </div>
    </form>
  )
}
