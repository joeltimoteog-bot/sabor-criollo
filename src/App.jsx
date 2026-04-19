import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import NosotrosPage from './pages/NosotrosPage'
import ReservasPage from './pages/ReservasPage'
import ContactoPage from './pages/ContactoPage'
import ReservasAdmin from './pages/ReservasAdmin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/admin/reservas" element={<ReservasAdmin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
