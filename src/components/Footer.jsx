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
          {/* Iconos representando redes sociales (decorativos) */}
          <div className="footer__socials">
            <span title="Facebook">📘</span>
            <span title="Instagram">📸</span>
            <span title="WhatsApp">💬</span>
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
