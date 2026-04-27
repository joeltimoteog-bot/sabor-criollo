// Importa los componentes de React Router para manejar la navegación SPA (Single Page Application)
// BrowserRouter: envuelve la app y habilita el enrutado basado en la URL del navegador
// Routes: contenedor donde se declaran las rutas
// Route: define una ruta concreta (path -> componente)
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Importa el componente Navbar (barra de navegación superior)
import Navbar from './components/Navbar'
// Importa el componente Footer (pie de página)
import Footer from './components/Footer'
// Importa la página de inicio
import HomePage from './pages/HomePage'
// Importa la página del menú de platos
import MenuPage from './pages/MenuPage'
// Importa la página "Nosotros" (historia, valores, equipo)
import NosotrosPage from './pages/NosotrosPage'
// Importa la página del formulario de reservas
import ReservasPage from './pages/ReservasPage'
// Importa la página del formulario de contacto
import ContactoPage from './pages/ContactoPage'
// Importa la página administrativa donde se listan las reservas guardadas
import ReservasAdmin from './pages/ReservasAdmin'

/*
 * Componente raíz de la aplicación.
 * Define la estructura general (Navbar + contenido + Footer)
 * y declara todas las rutas disponibles en el sitio.
 */
function App() {
  return (
    // BrowserRouter habilita la navegación SPA usando la History API del navegador
    <BrowserRouter>
      {/* Barra de navegación, visible en todas las páginas */}
      <Navbar />
      {/* Etiqueta semántica <main> que envuelve el contenido principal de cada página */}
      <main>
        {/* Routes evalúa cuál Route coincide con la URL actual y renderiza solo esa */}
        <Routes>
          {/* Ruta raíz "/" -> muestra la página de inicio */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta "/menu" -> muestra la carta de platos */}
          <Route path="/menu" element={<MenuPage />} />
          {/* Ruta "/nosotros" -> muestra la página de información del restaurante */}
          <Route path="/nosotros" element={<NosotrosPage />} />
          {/* Ruta "/reservas" -> muestra el formulario de reserva de mesa */}
          <Route path="/reservas" element={<ReservasPage />} />
          {/* Ruta "/contacto" -> muestra el formulario de contacto */}
          <Route path="/contacto" element={<ContactoPage />} />
          {/* Ruta "/admin/reservas" -> panel administrativo con la lista de reservas */}
          <Route path="/admin/reservas" element={<ReservasAdmin />} />
        </Routes>
      </main>
      {/* Pie de página, visible en todas las páginas */}
      <Footer />
    </BrowserRouter>
  )
}

// Exporta el componente App como exportación por defecto para que main.jsx pueda usarlo
export default App
