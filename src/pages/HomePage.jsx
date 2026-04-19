import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import './HomePage.css'

const featuredDishes = [
  { id: 1, emoji: '🍋', name: 'Ceviche Clásico', desc: 'Fresco pescado marinado en limón, ají limo, cebolla morada y choclo.', price: 'S/. 28', category: 'Entrada' },
  { id: 2, emoji: '🥩', name: 'Lomo Saltado', desc: 'Jugoso lomo de res salteado con verduras, sillao y servido con papas fritas.', price: 'S/. 36', category: 'Fondo' },
  { id: 3, emoji: '🦆', name: 'Ají de Gallina', desc: 'Tiernos trozos de pollo en cremosa salsa de ají amarillo con nueces y olivas.', price: 'S/. 30', category: 'Fondo' },
  { id: 4, emoji: '🍮', name: 'Suspiro Limeño', desc: 'El postre más emblemático del Perú, manjar blanco con merengue de oporto.', price: 'S/. 14', category: 'Postre' },
  { id: 5, emoji: '🫑', name: 'Causa Limeña', desc: 'Capas de papa amarilla sazonada con ají amarillo, rellena de pollo o atún.', price: 'S/. 22', category: 'Entrada' },
  { id: 6, emoji: '🦐', name: 'Chupe de Camarones', desc: 'Sopa cremosa arequipeña con camarones frescos, papas, choclo y ají panka.', price: 'S/. 32', category: 'Entrada' },
  { id: 7, emoji: '🍛', name: 'Seco de Cordero', desc: 'Tierno cordero guisado en cilantro, chicha de jora, zanahoria y frijoles.', price: 'S/. 38', category: 'Fondo' },
  { id: 8, emoji: '🍹', name: 'Pisco Sour', desc: 'El cóctel bandera del Perú: pisco quebranta, limón, jarabe, clara y amargo.', price: 'S/. 22', category: 'Bebida' },
]

const heroSlides = [
  { title: 'Bienvenido a Sabor Criollo', subtitle: 'La mejor gastronomía peruana en un ambiente único y acogedor', bg: '#8B2E00' },
  { title: 'Sabores que cuentan historias', subtitle: 'Recetas auténticas transmitidas de generación en generación', bg: '#7A2200' },
  { title: 'Reserva tu mesa hoy', subtitle: 'Vive una experiencia gastronómica inigualable con tu familia', bg: '#6B1C00' },
]

const VISIBLE = { desktop: 3, tablet: 2, mobile: 1 }

function useCarouselVisible() {
  const [visible, setVisible] = useState(VISIBLE.desktop)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(VISIBLE.mobile)
      else if (window.innerWidth < 1024) setVisible(VISIBLE.tablet)
      else setVisible(VISIBLE.desktop)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return visible
}

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const visible = useCarouselVisible()
  const totalGroups = Math.ceil(featuredDishes.length / visible)
  const autoRef = useRef(null)

  const next = useCallback(() => setCarouselIndex(i => (i + 1) % totalGroups), [totalGroups])
  const prev = useCallback(() => setCarouselIndex(i => (i - 1 + totalGroups) % totalGroups), [totalGroups])

  useEffect(() => {
    if (hovered) return
    autoRef.current = setInterval(next, 3000)
    return () => clearInterval(autoRef.current)
  }, [hovered, next])

  // Clamp index when visible count changes
  useEffect(() => {
    setCarouselIndex(i => Math.min(i, totalGroups - 1))
  }, [totalGroups])

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero" style={{ background: heroSlides[slide].bg }}>
        <div className="hero__overlay" />
        <div className="hero__content animate-fadeInUp">
          <span className="hero__badge">🇵🇪 Gastronomía Peruana Auténtica</span>
          <h1 className="hero__title">{heroSlides[slide].title}</h1>
          <p className="hero__subtitle">{heroSlides[slide].subtitle}</p>
          <div className="hero__actions">
            <Link to="/reservas" className="btn-primary">Reservar Mesa</Link>
            <Link to="/menu" className="btn-outline">Ver Menú</Link>
          </div>
        </div>
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === slide ? 'hero__dot--active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="hero__scroll">▼</div>
      </section>

      {/* ── Destacados ── */}
      <section className="featured container">
        <h2 className="section-title">Platos Estrella</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Una selección de nuestros platos más amados, preparados con ingredientes frescos del día</p>
        <div
          className="carousel"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button className="carousel__arrow carousel__arrow--left" onClick={prev} aria-label="Anterior">&#8592;</button>
          <div className="carousel__window">
            <div
              className="carousel__track"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {Array.from({ length: totalGroups }, (_, g) => (
                <div key={g} className="carousel__group" style={{ '--visible': visible }}>
                  {featuredDishes.slice(g * visible, g * visible + visible).map(dish => (
                    <div key={dish.id} className="dish-card">
                      <div className="dish-card__emoji">{dish.emoji}</div>
                      <span className="dish-card__category">{dish.category}</span>
                      <h3 className="dish-card__name">{dish.name}</h3>
                      <p className="dish-card__desc">{dish.desc}</p>
                      <div className="dish-card__footer">
                        <span className="dish-card__price">{dish.price}</span>
                        <Link to="/menu" className="dish-card__btn">Ver más →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button className="carousel__arrow carousel__arrow--right" onClick={next} aria-label="Siguiente">&#8594;</button>
        </div>
        <div className="carousel__dots">
          {Array.from({ length: totalGroups }, (_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === carouselIndex ? 'carousel__dot--active' : ''}`}
              onClick={() => setCarouselIndex(i)}
              aria-label={`Grupo ${i + 1}`}
            />
          ))}
        </div>
        <div className="featured__cta">
          <Link to="/menu" className="btn-primary">Ver Menú Completo</Link>
        </div>
      </section>

      {/* ── Por qué elegirnos ── */}
      <section className="why">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>¿Por qué elegirnos?</h2>
          <div className="section-divider" />
          <div className="why__grid">
            {[
              { icon: '👨‍🍳', title: 'Chefs Expertos', desc: 'Nuestros cocineros tienen más de 15 años de experiencia en gastronomía peruana.' },
              { icon: '🥬', title: 'Ingredientes Frescos', desc: 'Trabajamos directamente con productores locales para garantizar calidad en cada plato.' },
              { icon: '🏆', title: 'Premio a la Excelencia', desc: 'Reconocidos como uno de los mejores restaurantes criollos de la ciudad.' },
              { icon: '❤️', title: 'Con Amor Peruano', desc: 'Cada receta lleva la tradición y el sabor auténtico de la cocina peruana.' },
            ].map((item, i) => (
              <div key={i} className="why__card">
                <div className="why__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Reservas ── */}
      <section className="cta-banner container">
        <div className="cta-banner__inner">
          <div className="cta-banner__text">
            <h2>¿Listo para una experiencia inolvidable?</h2>
            <p>Reserva tu mesa ahora y disfruta de lo mejor de la gastronomía peruana</p>
          </div>
          <Link to="/reservas" className="btn-primary">Reservar Ahora</Link>
        </div>
      </section>
    </div>
  )
}
