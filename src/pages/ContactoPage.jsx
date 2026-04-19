import { useState } from 'react'
import './ContactoPage.css'

const initialForm = { nombre: '', email: '', asunto: '', mensaje: '' }

export default function ContactoPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Nombre requerido'
    if (!form.email.trim()) e.email = 'Email requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido'
    if (!form.asunto.trim()) e.asunto = 'Asunto requerido'
    if (!form.mensaje.trim()) e.mensaje = 'Mensaje requerido'
    else if (form.mensaje.trim().length < 20) e.mensaje = 'El mensaje debe tener al menos 20 caracteres'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <div className="contacto-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Contacto</h1>
          <p className="page-header__sub">Estamos para atenderte con gusto</p>
        </div>
      </div>

      <div className="container contacto-container">
        {/* Info cards */}
        <div className="contacto-cards">
          {[
            { icon: '📍', titulo: 'Dirección', info: 'Jr. de la Unión 456\nLima Centro, Lima' },
            { icon: '📞', titulo: 'Teléfono', info: '(01) 234-5678\n+51 999 888 777' },
            { icon: '✉️', titulo: 'Email', info: 'hola@saborcriollo.pe\nreservas@saborcriollo.pe' },
            { icon: '🕐', titulo: 'Horarios', info: 'Lun–Vie: 12:00 – 22:00\nSáb–Dom: 11:00 – 23:00' },
          ].map((c, i) => (
            <div key={i} className="contacto-card">
              <div className="contacto-card__icon">{c.icon}</div>
              <h4>{c.titulo}</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{c.info}</p>
            </div>
          ))}
        </div>

        {/* Layout mapa + form */}
        <div className="contacto-layout">
          {/* Mapa */}
          <div className="contacto-map">
            <h3>Encuéntranos</h3>
            <div className="contacto-map__embed">
              <iframe
                title="Ubicación Sabor Criollo"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-77.0420%2C-12.0575%2C-77.0250%2C-12.0425&layer=mapnik&marker=-12.0500%2C-77.0335"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="contacto-map__social">
              <h4>Síguenos en redes</h4>
              <div className="contacto-map__social-links">
                <span>📘 Facebook: /SaborCriolloLima</span>
                <span>📸 Instagram: @saborcriollo_pe</span>
                <span>💬 WhatsApp: +51 999 888 777</span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="contacto-form-wrapper">
            <h3>{sent ? '¡Mensaje Enviado!' : 'Envíanos un mensaje'}</h3>

            {sent ? (
              <div className="contacto-success">
                <div className="contacto-success__icon">✉️</div>
                <p>Gracias por contactarnos, <strong>{form.nombre}</strong>. Responderemos a <strong>{form.email}</strong> en menos de 24 horas.</p>
                <button className="btn-primary" onClick={() => { setForm(initialForm); setSent(false) }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`form-group ${errors.nombre ? 'form-group--error' : form.nombre ? 'form-group--success' : ''}`}>
                    <label>Nombre *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
                    {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                  </div>
                  <div className={`form-group ${errors.email ? 'form-group--error' : form.email && !errors.email ? 'form-group--success' : ''}`}>
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className={`form-group ${errors.asunto ? 'form-group--error' : form.asunto ? 'form-group--success' : ''}`}>
                  <label>Asunto *</label>
                  <input name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" />
                  {errors.asunto && <span className="form-error">{errors.asunto}</span>}
                </div>

                <div className={`form-group ${errors.mensaje ? 'form-group--error' : form.mensaje.length >= 20 ? 'form-group--success' : ''}`}>
                  <label>Mensaje * <span style={{ color: 'var(--gray)', fontWeight: 400, fontSize: '0.8rem' }}>({form.mensaje.length}/20 mín.)</span></label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..." rows={5} />
                  {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
                </div>

                <button type="submit" className="reservas-submit" disabled={loading}>
                  {loading ? '⏳ Enviando...' : '📨 Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
