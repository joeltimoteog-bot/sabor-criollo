// Importa el hook useState para manejar los estados del formulario de reservas
import { useState } from 'react'
// Importa los estilos específicos de la página de reservas
import './ReservasPage.css'

// Estado inicial del formulario: todos los campos vacíos excepto personas (default 2)
const initialForm = {
  nombre: '', apellido: '', email: '', telefono: '',
  fecha: '', hora: '', personas: '2', ocasion: '', comentarios: ''
}

// Arreglo de horas disponibles para reservar (almuerzo y cena)
const horas = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
               '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

// Arreglo de ocasiones especiales seleccionables en el formulario
const ocasiones = ['Sin ocasión especial', 'Cumpleaños', 'Aniversario',
                   'Reunión de negocios', 'Cena romántica', 'Celebración familiar']

/*
 * Componente ReservasPage
 * Permite al usuario llenar un formulario para reservar mesa.
 * Incluye validaciones de campos, confirmación visual y persistencia
 * de las reservas en localStorage para que el panel admin las pueda ver.
 */
export default function ReservasPage() {
  // Estado: objeto con todos los datos del formulario (controlado)
  const [form, setForm] = useState(initialForm)
  // Estado: objeto con los mensajes de error de cada campo (validación)
  const [errors, setErrors] = useState({})
  // Estado: indica si la reserva ya fue enviada exitosamente
  const [submitted, setSubmitted] = useState(false)
  // Estado: indica si el envío está en proceso (para mostrar loader)
  const [loading, setLoading] = useState(false)

  // Calcula la fecha de hoy en formato YYYY-MM-DD para el atributo "min" del input date
  const today = new Date().toISOString().split('T')[0]

  /*
   * Función de validación del formulario.
   * Recorre los campos y construye un objeto de errores; si está vacío, el form es válido.
   */
  const validate = () => {
    const e = {}
    // Validación: nombre requerido (sin espacios en blanco)
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    // Validación: apellido requerido
    if (!form.apellido.trim()) e.apellido = 'El apellido es requerido'
    // Validación: email requerido y con formato válido
    if (!form.email.trim()) e.email = 'El email es requerido'
    // Expresión regular básica para validar formato de email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido'
    // Validación: teléfono requerido y con 7 a 15 dígitos
    if (!form.telefono.trim()) e.telefono = 'El teléfono es requerido'
    // Quita espacios y verifica que solo haya 7-15 dígitos numéricos
    else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) e.telefono = 'Teléfono no válido'
    // Validaciones de fecha, hora y número de personas
    if (!form.fecha) e.fecha = 'Selecciona una fecha'
    if (!form.hora) e.hora = 'Selecciona una hora'
    if (!form.personas) e.personas = 'Indica el número de personas'
    return e
  }

  /*
   * Maneja el cambio de cualquier input/select/textarea del formulario.
   * Usa el atributo "name" para actualizar el campo correspondiente.
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    // Spread del estado anterior + sobrescribe el campo modificado (inmutabilidad)
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpia el error del campo si existía (UX: mejor feedback)
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  /*
   * Maneja el envío del formulario:
   * 1) previene el submit por defecto, 2) valida, 3) si hay errores los muestra,
   * 4) si todo es válido, simula un envío y guarda la reserva en localStorage.
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Evita la recarga de la página
    const errs = validate()
    // Si hay errores, los muestra y no continúa
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true) // Activa el indicador de carga
    // Simula una petición asíncrona con setTimeout (1.8 segundos)
    setTimeout(() => {
      setLoading(false)
      // Recupera reservas existentes desde localStorage (o array vacío si no hay)
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
      // Crea la nueva reserva con un ID basado en timestamp y fecha de registro
      const nuevaReserva = { ...form, id: Date.now(), fecha_registro: new Date().toLocaleString() }
      reservas.push(nuevaReserva)
      // Guarda el arreglo actualizado en localStorage (persistencia entre recargas)
      localStorage.setItem('reservas', JSON.stringify(reservas))
      setSubmitted(true) // Cambia a la vista de confirmación
    }, 1800)
  }

  /*
   * Reinicia el formulario para permitir hacer otra reserva.
   */
  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  // Renderizado condicional: si la reserva fue enviada, muestra pantalla de éxito
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
          {/* Caja de éxito con resumen de la reserva */}
          <div className="reservas-success">
            <div className="reservas-success__icon">🎉</div>
            <h2>¡Reserva Confirmada!</h2>
            <p>Gracias, <strong>{form.nombre} {form.apellido}</strong>. Tu reserva ha sido recibida exitosamente.</p>
            <div className="reservas-success__detail">
              <div><span>📅</span> {form.fecha} a las {form.hora}</div>
              {/* Pluraliza "persona" o "personas" según el número */}
              <div><span>👥</span> {form.personas} {form.personas === '1' ? 'persona' : 'personas'}</div>
              <div><span>✉️</span> Confirmación enviada a {form.email}</div>
              {/* Solo muestra la ocasión si fue seleccionada y no es "Sin ocasión especial" */}
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

  // Renderizado por defecto: muestra el formulario de reservas
  return (
    <div className="reservas-page">
      {/* Cabecera reutilizable de página */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Reservas</h1>
          <p className="page-header__sub">Asegura tu mesa con anticipación</p>
        </div>
      </div>

      <div className="container reservas-container">
        <div className="reservas-layout">
          {/* ── Panel lateral con información del restaurante ── */}
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

          {/* ── Formulario de reserva ── */}
          <div className="reservas-form-wrapper">
            <h2 className="reservas-form__title">Completa tu reserva</h2>
            {/* noValidate desactiva la validación nativa del navegador para usar la nuestra */}
            <form onSubmit={handleSubmit} noValidate>
              {/* ── Fila 1: Nombre + Apellido ── */}
              <div className="form-row">
                <div className={`form-group ${errors.nombre ? 'form-group--error' : form.nombre ? 'form-group--success' : ''}`}>
                  <label>Nombre *</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
                  {/* Mensaje de error condicional: solo se muestra si existe un error */}
                  {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                </div>
                <div className={`form-group ${errors.apellido ? 'form-group--error' : form.apellido ? 'form-group--success' : ''}`}>
                  <label>Apellido *</label>
                  <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Tu apellido" />
                  {errors.apellido && <span className="form-error">{errors.apellido}</span>}
                </div>
              </div>

              {/* ── Fila 2: Email + Teléfono ── */}
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

              {/* ── Fila 3: Fecha + Hora ── */}
              <div className="form-row">
                <div className={`form-group ${errors.fecha ? 'form-group--error' : form.fecha ? 'form-group--success' : ''}`}>
                  <label>Fecha *</label>
                  {/* min={today} impide seleccionar fechas anteriores a hoy */}
                  <input type="date" name="fecha" value={form.fecha} onChange={handleChange} min={today} />
                  {errors.fecha && <span className="form-error">{errors.fecha}</span>}
                </div>
                <div className={`form-group ${errors.hora ? 'form-group--error' : form.hora ? 'form-group--success' : ''}`}>
                  <label>Hora *</label>
                  <select name="hora" value={form.hora} onChange={handleChange}>
                    <option value="">Selecciona la hora</option>
                    {/* map sobre el arreglo "horas" para crear las opciones del select */}
                    {horas.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  {errors.hora && <span className="form-error">{errors.hora}</span>}
                </div>
              </div>

              {/* ── Fila 4: Personas + Ocasión ── */}
              <div className="form-row">
                <div className={`form-group ${errors.personas ? 'form-group--error' : 'form-group--success'}`}>
                  <label>Número de personas *</label>
                  <select name="personas" value={form.personas} onChange={handleChange}>
                    {/* Genera opciones del 1 al 10 dinámicamente con map */}
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={String(n)}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Ocasión especial</label>
                  <select name="ocasion" value={form.ocasion} onChange={handleChange}>
                    {/* map sobre el arreglo "ocasiones" para crear las opciones */}
                    {ocasiones.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Comentarios adicionales (campo opcional) */}
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

              {/* Botón de envío con estado de carga; deshabilitado mientras procesa */}
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
