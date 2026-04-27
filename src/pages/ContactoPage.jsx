// Importa el hook useState para manejar el estado del formulario de contacto
import { useState } from 'react'
// Importa los estilos específicos de la página de contacto
import './ContactoPage.css'

// Estado inicial del formulario: todos los campos vacíos
const initialForm = { nombre: '', email: '', asunto: '', mensaje: '' }

/*
 * Componente ContactoPage
 * Renderiza la página de contacto con: tarjetas informativas (dirección, teléfono,
 * email, horarios), un mapa de OpenStreetMap embebido y un formulario para enviar
 * mensajes con validación y feedback de éxito.
 */
export default function ContactoPage() {
  // Estado: objeto con los datos del formulario (componente controlado)
  const [form, setForm] = useState(initialForm)
  // Estado: objeto con errores de validación de cada campo
  const [errors, setErrors] = useState({})
  // Estado: indica si el mensaje fue enviado exitosamente
  const [sent, setSent] = useState(false)
  // Estado: indica si está en proceso de envío (para mostrar loader)
  const [loading, setLoading] = useState(false)

  /*
   * Valida los campos del formulario y devuelve un objeto con errores (vacío si todo OK).
   */
  const validate = () => {
    const e = {}
    // Validación: nombre requerido (sin espacios)
    if (!form.nombre.trim()) e.nombre = 'Nombre requerido'
    // Validación: email requerido y con formato válido
    if (!form.email.trim()) e.email = 'Email requerido'
    // Regex de validación básica de formato de email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido'
    // Validación: asunto requerido
    if (!form.asunto.trim()) e.asunto = 'Asunto requerido'
    // Validación: mensaje requerido y con mínimo 20 caracteres
    if (!form.mensaje.trim()) e.mensaje = 'Mensaje requerido'
    else if (form.mensaje.trim().length < 20) e.mensaje = 'El mensaje debe tener al menos 20 caracteres'
    return e
  }

  /*
   * Maneja el cambio de cualquier input del formulario.
   * Usa el atributo "name" del input para saber qué campo actualizar.
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    // Actualiza solo el campo modificado, conservando el resto del estado
    setForm(prev => ({ ...prev, [name]: value }))
    // Si había un error en ese campo, lo limpia al empezar a escribir
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  /*
   * Maneja el envío del formulario:
   * previene el envío por defecto, valida y simula un envío asíncrono.
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Evita la recarga del formulario
    const errs = validate()
    // Si hay errores los muestra y aborta
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    // Simula petición asíncrona de 1.5 segundos
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <div className="contacto-page">
      {/* Cabecera de página */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Contacto</h1>
          <p className="page-header__sub">Estamos para atenderte con gusto</p>
        </div>
      </div>

      <div className="container contacto-container">
        {/* ── Tarjetas con datos de contacto (dirección, teléfono, email, horarios) ── */}
        <div className="contacto-cards">
          {/* Array inline con la info de contacto; map crea una tarjeta por cada dato */}
          {[
            { icon: '📍', titulo: 'Dirección', info: 'Jr. de la Unión 456\nLima Centro, Lima' },
            { icon: '📞', titulo: 'Teléfono', info: '(01) 234-5678\n+51 999 888 777' },
            { icon: '✉️', titulo: 'Email', info: 'hola@saborcriollo.pe\nreservas@saborcriollo.pe' },
            { icon: '🕐', titulo: 'Horarios', info: 'Lun–Vie: 12:00 – 22:00\nSáb–Dom: 11:00 – 23:00' },
          ].map((c, i) => (
            <div key={i} className="contacto-card">
              <div className="contacto-card__icon">{c.icon}</div>
              <h4>{c.titulo}</h4>
              {/* whiteSpace: 'pre-line' respeta los \n del string para crear saltos de línea */}
              <p style={{ whiteSpace: 'pre-line' }}>{c.info}</p>
            </div>
          ))}
        </div>

        {/* ── Layout de dos columnas: mapa + formulario ── */}
        <div className="contacto-layout">
          {/* Columna izquierda: mapa y redes sociales */}
          <div className="contacto-map">
            <h3>Encuéntranos</h3>
            <div className="contacto-map__embed">
              {/* iframe con mapa de OpenStreetMap centrado en la dirección del restaurante */}
              <iframe
                title="Ubicación Sabor Criollo"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-77.0420%2C-12.0575%2C-77.0250%2C-12.0425&layer=mapnik&marker=-12.0500%2C-77.0335"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy" // Carga diferida para mejorar rendimiento
              />
            </div>
            {/* Sección de redes sociales debajo del mapa */}
            <div className="contacto-map__social">
              <h4>Síguenos en redes</h4>
              <div className="contacto-map__social-links">
                <span>📘 Facebook: /SaborCriolloLima</span>
                <span>📸 Instagram: @saborcriollo_pe</span>
                <span>💬 WhatsApp: +51 999 888 777</span>
              </div>
            </div>
          </div>

          {/* Columna derecha: formulario de contacto */}
          <div className="contacto-form-wrapper">
            {/* Título dinámico: cambia tras enviar el mensaje */}
            <h3>{sent ? '¡Mensaje Enviado!' : 'Envíanos un mensaje'}</h3>

            {/* Renderizado condicional: pantalla de éxito o formulario */}
            {sent ? (
              <div className="contacto-success">
                <div className="contacto-success__icon">✉️</div>
                <p>Gracias por contactarnos, <strong>{form.nombre}</strong>. Responderemos a <strong>{form.email}</strong> en menos de 24 horas.</p>
                {/* Botón para volver a mostrar el formulario y enviar otro mensaje */}
                <button className="btn-primary" onClick={() => { setForm(initialForm); setSent(false) }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              // noValidate desactiva la validación nativa para usar la nuestra personalizada
              <form onSubmit={handleSubmit} noValidate>
                {/* Fila con nombre y email */}
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

                {/* Campo asunto */}
                <div className={`form-group ${errors.asunto ? 'form-group--error' : form.asunto ? 'form-group--success' : ''}`}>
                  <label>Asunto *</label>
                  <input name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" />
                  {errors.asunto && <span className="form-error">{errors.asunto}</span>}
                </div>

                {/* Campo mensaje con contador de caracteres */}
                <div className={`form-group ${errors.mensaje ? 'form-group--error' : form.mensaje.length >= 20 ? 'form-group--success' : ''}`}>
                  {/* Etiqueta con contador en vivo del mínimo de caracteres */}
                  <label>Mensaje * <span style={{ color: 'var(--gray)', fontWeight: 400, fontSize: '0.8rem' }}>({form.mensaje.length}/20 mín.)</span></label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..." rows={5} />
                  {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
                </div>

                {/* Botón de envío con texto dinámico según el estado de carga */}
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
