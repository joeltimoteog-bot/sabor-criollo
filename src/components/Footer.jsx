import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">🍽️ Sabor Criollo</div>
          <p>Lo mejor de la gastronomía peruana en un solo lugar. Tradición, sabor y calidez en cada plato.</p>
          <div className="footer__socials">
            <span title="Facebook">📘</span>
            <span title="Instagram">📸</span>
            <span title="WhatsApp">💬</span>
          </div>
        </div>

        <div className="footer__col">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

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

      <div className="footer__bottom">
        <p>© 2026 Sabor Criollo. Proyecto académico – IES CIBERTEC · Desarrollo de Entornos Web (5394)</p>
      </div>
    </footer>
  )
}
