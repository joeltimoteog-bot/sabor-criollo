// Importa Link de React Router para navegar entre páginas sin recargar el navegador
import { Link } from 'react-router-dom'
// Importa los estilos específicos del componente Footer
import './Footer.css'

/*
 * Componente Footer
 * Renderiza el pie de página del sitio con información de marca,
 * enlaces de navegación rápida, horarios y contacto.
 */
export default function Footer() {
  return (
    // Etiqueta semántica <footer> que agrupa el contenido del pie de página
    <footer className="footer">
      {/* Contenedor interno con grilla de tres columnas (marca, navegación, horarios) */}
      <div className="container footer__grid">
        {/* Columna 1: marca, descripción del restaurante y redes sociales */}
        <div className="footer__brand">
          <div className="footer__logo">🍽️ Sabor Criollo</div>
          <p>Lo mejor de la gastronomía peruana en un solo lugar. Tradición, sabor y calidez en cada plato.</p>
          {/* Enlaces a redes sociales con íconos SVG */}
          <div className="footer__socials">
            <a
              href="https://facebook.com/SaborCriolloLima"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer__social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12Z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/saborcriollo_pe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer__social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163Zm0 1.802c-3.155 0-3.507.012-4.74.068-1.001.046-1.832.211-2.498.877-.666.666-.831 1.497-.877 2.498-.056 1.233-.067 1.585-.067 4.74s.011 3.507.067 4.74c.046 1.001.211 1.832.877 2.498.666.666 1.497.831 2.498.877 1.233.056 1.585.067 4.74.067s3.507-.011 4.74-.067c1.001-.046 1.832-.211 2.498-.877.666-.666.831-1.497.877-2.498.056-1.233.067-1.585.067-4.74s-.011-3.507-.067-4.74c-.046-1.001-.211-1.832-.877-2.498-.666-.666-1.497-.831-2.498-.877-1.233-.056-1.585-.068-4.74-.068Zm0 3.063A4.972 4.972 0 1 1 12 17a4.972 4.972 0 0 1 0-9.972Zm0 8.2a3.228 3.228 0 1 0 0-6.456 3.228 3.228 0 0 0 0 6.456Zm6.406-8.4a1.162 1.162 0 1 1-2.324 0 1.162 1.162 0 0 1 2.324 0Z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/51999888777"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer__social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.09 1.09 0 0 0-.79.371c-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898 1.866 1.869 2.893 4.352 2.892 6.992-.003 5.45-4.437 9.886-9.885 9.886Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Columna 2: enlaces internos de navegación rápida */}
        <div className="footer__col">
          <h4>Navegación</h4>
          <ul>
            {/* Cada Link usa rutas internas de React Router para navegación SPA */}
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: horarios de atención y datos de contacto */}
        <div className="footer__col">
          <h4>Horarios</h4>
          <ul>
            <li>🕐 Lun – Vie: 12:00 – 22:00</li>
            <li>🕐 Sáb – Dom: 11:00 – 23:00</li>
            <li>📞 (01) 234-5678</li>
            <li>✉️ hola@saborcriollo.pe</li>
          </ul>
        </div>
      </div>

      {/* Línea inferior con créditos del proyecto académico */}
      <div className="footer__bottom">
        <p>© 2026 Sabor Criollo. Proyecto académico – IES CIBERTEC · Desarrollo de Entornos Web (5394)</p>
      </div>
    </footer>
  )
}
