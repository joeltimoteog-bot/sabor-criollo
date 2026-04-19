import { useState } from 'react'
import './ReservasPage.css'

const initialForm = {
  nombre: '', apellido: '', email: '', telefono: '',
  fecha: '', hora: '', personas: '2', ocasion: '', comentarios: ''
}

const horas = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
               '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

const ocasiones = ['Sin ocasión especial', 'Cumpleaños', 'Aniversario',
                   'Reunión de negocios', 'Cena romántica', 'Celebración familiar']

export default function ReservasPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.apellido.trim()) e.apellido = 'El apellido es requerido'
    if (!form.email.trim()) e.email = 'El email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido'
    if (!form.telefono.trim()) e.telefono = 'El teléfono es requerido'
    else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) e.telefono = 'Teléfono no válido'
    if (!form.fecha) e.fecha = 'Selecciona una fecha'
    if (!form.hora) e.hora = 'Selecciona una hora'
    if (!form.personas) e.personas = 'Indica el número de personas'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpiar error al escribir
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
      const nuevaReserva = { ...form, id: Date.now(), fecha_registro: new Date().toLocaleString() }
      reservas.push(nuevaReserva)
      localStorage.setItem('reservas', JSON.stringify(reservas))
      setSubmitted(true)
    }, 1800)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="reservas-page">
        <div className="page-header">
          <div className="container">
            <h1 className="page-header__title">Reservas</h1>
            <p className="page-header__sub">Asegura tu mesa con anticipación</p>
          </div>
        </div>
        <div className="container reservas-container">
          <div className="reservas-success">
            <div className="reservas-success__icon">🎉</div>
            <h2>¡Reserva Confirmada!</h2>
            <p>Gracias, <strong>{form.nombre} {form.apellido}</strong>. Tu reserva ha sido recibida exitosamente.</p>
            <div className="reservas-success__detail">
              <div><span>📅</span> {form.fecha} a las {form.hora}</div>
              <div><span>👥</span> {form.personas} {form.personas === '1' ? 'persona' : 'personas'}</div>
              <div><span>✉️</span> Confirmación enviada a {form.email}</div>
              {form.ocasion && form.ocasion !== 'Sin ocasión especial' && (
                <div><span>🎊</span> Ocasión: {form.ocasion}</div>
              )}
            </div>
            <p className="reservas-success__note">Te contactaremos al {form.telefono} para confirmar. ¡Te esperamos!</p>
            <button className="btn-primary" onClick={handleReset}>Hacer otra reserva</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="reservas-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Reservas</h1>
          <p className="page-header__sub">Asegura tu mesa con anticipación</p>
        </div>
      </div>

      <div className="container reservas-container">
        <div className="reservas-layout">
          {/* Info lateral */}
          <aside className="reservas-info">
            <h3>Información de reservas</h3>
            <div className="reservas-info__item"><span>📍</span><div><strong>Ubicación</strong><p>Jr. de la Unión 456, Lima Centro</p></div></div>
            <div className="reservas-info__item"><span>🕐</span><div><strong>Horarios</strong><p>Lun–Vie: 12:00 – 22:00<br />Sáb–Dom: 11:00 – 23:00</p></div></div>
            <div className="reservas-info__item"><span>📞</span><div><strong>Teléfono</strong><p>(01) 234-5678</p></div></div>
            <div className="reservas-info__item"><span>✉️</span><div><strong>Email</strong><p>reservas@saborcriollo.pe</p></div></div>
            <div className="reservas-info__note">
              <strong>⚠️ Nota importante</strong>
              <p>Las reservas se confirman con 24 horas de anticipación. Para grupos mayores de 10 personas, contáctanos directamente.</p>
            </div>
          </aside>

          {/* Formulario */}
          <div className="reservas-form-wrapper">
            <h2 className="reservas-form__title">Completa tu reserva</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${errors.nombre ? 'form-group--error' : form.nombre ? 'form-group--success' : ''}`}>
                  <label>Nombre *</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
                  {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                </div>
                <div className={`form-group ${errors.apellido ? 'form-group--error' : form.apellido ? 'form-group--success' : ''}`}>
                  <label>Apellido *</label>
                  <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Tu apellido" />
                  {errors.apellido && <span className="form-error">{errors.apellido}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.email ? 'form-group--error' : form.email && !errors.email ? 'form-group--success' : ''}`}>
                  <label>Correo electrónico *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className={`form-group ${errors.telefono ? 'form-group--error' : form.telefono && !errors.telefono ? 'form-group--success' : ''}`}>
                  <label>Teléfono *</label>
                  <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="999 999 999" />
                  {errors.telefono && <span className="form-error">{errors.telefono}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.fecha ? 'form-group--error' : form.fecha ? 'form-group--success' : ''}`}>
                  <label>Fecha *</label>
                  <input type="date" name="fecha" value={form.fecha} onChange={handleChange} min={today} />
                  {errors.fecha && <span className="form-error">{errors.fecha}</span>}
                </div>
                <div className={`form-group ${errors.hora ? 'form-group--error' : form.hora ? 'form-group--success' : ''}`}>
                  <label>Hora *</label>
                  <select name="hora" value={form.hora} onChange={handleChange}>
                    <option value="">Selecciona la hora</option>
                    {horas.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  {errors.hora && <span className="form-error">{errors.hora}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.personas ? 'form-group--error' : 'form-group--success'}`}>
                  <label>Número de personas *</label>
                  <select name="personas" value={form.personas} onChange={handleChange}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={String(n)}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Ocasión especial</label>
                  <select name="ocasion" value={form.ocasion} onChange={handleChange}>
                    {ocasiones.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Comentarios adicionales</label>
                <textarea
                  name="comentarios"
                  value={form.comentarios}
                  onChange={handleChange}
                  placeholder="Alergias, preferencias de mesa, decoración especial..."
                  rows={3}
                />
              </div>

              <button type="submit" className={`reservas-submit ${loading ? 'reservas-submit--loading' : ''}`} disabled={loading}>
                {loading ? '⏳ Procesando reserva...' : '🍽️ Confirmar Reserva'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
