// Importa los hooks useState (estado local) y useEffect (efectos secundarios) de React
import { useState, useEffect } from 'react'
// Importa NavLink (enlace con estilo "activo" automático) y Link (enlace simple) de React Router
import { NavLink, Link } from 'react-router-dom'
// Importa los estilos específicos del componente Navbar
import './Navbar.css'

// Arreglo de objetos con los enlaces del menú: cada entrada tiene la ruta (to) y el texto a mostrar (label)
const links = [
  { to: '/', label: 'Inicio' },
  { to: '/menu', label: 'Menú' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/reservas', label: 'Reservas' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/admin/reservas', label: 'Admin' },
]

/*
 * Componente Navbar
 * Renderiza la barra de navegación superior fija.
 * Cambia su estilo al hacer scroll y soporta menú hamburguesa en móviles.
 */
export default function Navbar() {
  // Estado que indica si la página fue desplazada hacia abajo (true cuando scrollY > 50)
  const [scrolled, setScrolled] = useState(false)
  // Estado que controla si el menú móvil (hamburguesa) está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false)

  // useEffect que se ejecuta una sola vez al montar el componente (dependencias [])
  // Suscribe un listener al evento "scroll" para actualizar el estado scrolled
  useEffect(() => {
    // Función que se ejecuta cada vez que el usuario hace scroll
    const handleScroll = () => setScrolled(window.scrollY > 50)
    // Registra el listener en el objeto window
    window.addEventListener('scroll', handleScroll)
    // Función de limpieza: elimina el listener cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    // Header con clase dinámica: agrega "navbar--scrolled" cuando el usuario hizo scroll
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Contenedor interno centrado y con ancho máximo */}
      <div className="container navbar__inner">
        {/* Logo del restaurante que enlaza a la página de inicio */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__icon">🍽️</span>
          <span className="navbar__title">Sabor Criollo</span>
        </Link>

        {/* Contenedor de los enlaces. Recibe la clase "--open" cuando el menú móvil está abierto */}
        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {/* Recorre el arreglo "links" y genera un NavLink por cada elemento (renderizado dinámico) */}
          {links.map(({ to, label }) => (
            <NavLink
              // key única requerida por React al usar map para optimizar el render
              key={to}
              // Ruta destino del enlace
              to={to}
              // "end" hace que el enlace "/" solo esté activo en la ruta exacta y no en sub-rutas
              end={to === '/'}
              // className como función: añade "--active" cuando NavLink detecta que la ruta coincide
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              // Al hacer clic en un enlace, cierra el menú móvil
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {/* Botón destacado de llamada a la acción que lleva al formulario de reservas */}
          <Link to="/reservas" className="navbar__cta" onClick={() => setMenuOpen(false)}>
            Reservar Mesa
          </Link>
        </nav>

        {/* Botón hamburguesa que solo se muestra en móviles (controlado por CSS) */}
        <button
          // Clases condicionales: se anima cuando el menú está abierto
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          // Alterna el estado del menú móvil entre abierto y cerrado
          onClick={() => setMenuOpen(!menuOpen)}
          // Etiqueta para accesibilidad (lectores de pantalla)
          aria-label="Menú"
        >
          {/* Tres líneas que forman el icono hamburguesa */}
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
