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
                <a
                  href="https://facebook.com/SaborCriolloLima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacto-social contacto-social--facebook"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12Z"/>
                  </svg>
                  <span className="contacto-social__text">
                    <strong>Facebook</strong>
                    <small>/SaborCriolloLima</small>
                  </span>
                </a>
                <a
                  href="https://instagram.com/saborcriollo_pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacto-social contacto-social--instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163Zm0 1.802c-3.155 0-3.507.012-4.74.068-1.001.046-1.832.211-2.498.877-.666.666-.831 1.497-.877 2.498-.056 1.233-.067 1.585-.067 4.74s.011 3.507.067 4.74c.046 1.001.211 1.832.877 2.498.666.666 1.497.831 2.498.877 1.233.056 1.585.067 4.74.067s3.507-.011 4.74-.067c1.001-.046 1.832-.211 2.498-.877.666-.666.831-1.497.877-2.498.056-1.233.067-1.585.067-4.74s-.011-3.507-.067-4.74c-.046-1.001-.211-1.832-.877-2.498-.666-.666-1.497-.831-2.498-.877-1.233-.056-1.585-.068-4.74-.068Zm0 3.063A4.972 4.972 0 1 1 12 17a4.972 4.972 0 0 1 0-9.972Zm0 8.2a3.228 3.228 0 1 0 0-6.456 3.228 3.228 0 0 0 0 6.456Zm6.406-8.4a1.162 1.162 0 1 1-2.324 0 1.162 1.162 0 0 1 2.324 0Z"/>
                  </svg>
                  <span className="contacto-social__text">
                    <strong>Instagram</strong>
                    <small>@saborcriollo_pe</small>
                  </span>
                </a>
                <a
                  href="https://wa.me/51999888777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacto-social contacto-social--whatsapp"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.09 1.09 0 0 0-.79.371c-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898 1.866 1.869 2.893 4.352 2.892 6.992-.003 5.45-4.437 9.886-9.885 9.886Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span className="contacto-social__text">
                    <strong>WhatsApp</strong>
                    <small>+51 999 888 777</small>
                  </span>
                </a>
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
