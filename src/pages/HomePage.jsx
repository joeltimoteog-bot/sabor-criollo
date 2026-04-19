import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './HomePage.css'

const featuredDishes = [
  { id: 1, img: 'https://images.unsplash.com/photo-1535400255456-984e0e935757?w=400&q=80', name: 'Ceviche Clasico', desc: 'Fresco pescado marinado en limon, aji limo, cebolla morada y choclo.', price: 'S/. 28', category: 'Entrada' },
  { id: 2, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80', name: 'Lomo Saltado', desc: 'Jugoso lomo de res salteado con verduras, sillao y servido con papas fritas.', price: 'S/. 36', category: 'Fondo' },
  { id: 3, img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', name: 'Aji de Gallina', desc: 'Tiernos trozos de pollo en cremosa salsa de aji amarillo con nueces y olivas.', price: 'S/. 30', category: 'Fondo' },
  { id: 4, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', name: 'Suspiro Limeno', desc: 'El postre mas emblematico del Peru, manjar blanco con merengue de oporto.', price: 'S/. 14', category: 'Postre' },
  { id: 5, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', name: 'Causa Limena', desc: 'Papa amarilla sazonada con aji amarillo rellena con atun o pollo desmenuzado.', price: 'S/. 22', category: 'Entrada' },
  { id: 6, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', name: 'Chupe de Camarones', desc: 'Sopa cremosa de camarones con leche, huevo y arroz estilo arequipeno.', price: 'S/. 32', category: 'Entrada' },
  { id: 7, img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', name: 'Seco de Cordero', desc: 'Tierno cordero guisado en cilantro, chicha de jora, zanahoria y frijoles.', price: 'S/. 38', category: 'Fondo' },
  { id: 8, img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80', name: 'Pisco Sour', desc: 'El coctel bandera del Peru: pisco quebranta, limon, jarabe, clara y amargo.', price: 'S/. 22', category: 'Bebida' },
]

const heroSlides = [
  { title: 'Bienvenido a Sabor Criollo', subtitle: 'La mejor gastronomia peruana en un ambiente unico y acogedor', bg: '#8B2E00' },
  { title: 'Sabores que cuentan historias', subtitle: 'Recetas autenticas transmitidas de generacion en generacion', bg: '#7A2200' },
  { title: 'Reserva tu mesa hoy', subtitle: 'Vive una experiencia gastronomica inigualable con tu familia', bg: '#6B1C00' },
]

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [current, setCurrent] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [paused, setPaused] = useState(false)
  const carouselRef = useRef(null)

  // Hero autoplay
  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 4500)
    return () => clearInterval(timer)
  }, [])

  // Responsive visible cards
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  // Carousel autoplay
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent(c => {
        const maxIndex = featuredDishes.length - visibleCount
        return c >= maxIndex ? 0 : c + 1
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [paused, visibleCount])

  const maxIndex = featuredDishes.length - visibleCount
  const totalDots = maxIndex + 1

  const prev = () => setCurrent(c => (c <= 0 ? maxIndex : c - 1))
  const next = () => setCurrent(c => (c >= maxIndex ? 0 : c + 1))

  const cardWidth = 100 / visibleCount

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" style={{ background: heroSlides[slide].bg, position: 'relative' }}>
        <div className="hero__overlay" />
        <img src="/logo.png" alt="Sabor Criollo logo" className="hero__logo-bg" />
        <div className="hero__content animate-fadeInUp">
          <span className="hero__badge">Gastronomia Peruana Autentica</span>
          <h1 className="hero__title">{heroSlides[slide].title}</h1>
          <p className="hero__subtitle">{heroSlides[slide].subtitle}</p>
          <div className="hero__actions">
            <Link to="/reservas" className="btn-primary">Reservar Mesa</Link>
            <Link to="/menu" className="btn-outline">Ver Menu</Link>
          </div>
        </div>
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero__dot ${i === slide ? 'hero__dot--active' : ''}`}
              onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="hero__scroll">v</div>
      </section>

      {/* Carrusel de Platos */}
      <section className="featured container">
        <h2 className="section-title">Platos Estrella</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Una seleccion de nuestros platos mas amados, preparados con ingredientes frescos del dia</p>

        <div
          className="carousel"
          ref={carouselRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="carousel__arrow carousel__arrow--left" onClick={prev} aria-label="Anterior">
            &#8592;
          </button>

          <div className="carousel__window">
            <div
              className="carousel__track"
              style={{ transform: `translateX(-${current * cardWidth}%)` }}
            >
              {featuredDishes.map(dish => (
                <div key={dish.id}
                  className="dish-card"
                  style={{ minWidth: `${cardWidth}%` }}
                >
                  <div className="dish-card__img-wrap">
                    <img src={dish.img} alt={dish.name} className="dish-card__img" />
                  </div>
                  <span className="dish-card__category">{dish.category}</span>
                  <h3 className="dish-card__name">{dish.name}</h3>
                  <p className="dish-card__desc">{dish.desc}</p>
                  <div className="dish-card__footer">
                    <span className="dish-card__price">{dish.price}</span>
                    <Link to="/menu" className="dish-card__btn">Ver mas</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel__arrow carousel__arrow--right" onClick={next} aria-label="Siguiente">
            &#8594;
          </button>
        </div>

        {/* Dots */}
        <div className="carousel__dots">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al grupo ${i + 1}`}
            />
          ))}
        </div>

        <div className="featured__cta">
          <Link to="/menu" className="btn-primary">Ver Menu Completo</Link>
        </div>
      </section>

      {/* Por que elegirnos */}
      <section className="why">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>Por que elegirnos?</h2>
          <div className="section-divider" />
          <div className="why__grid">
            {[
              { img: 'https://images.unsplash.com/photo-1583394293214-0a2faca2f1e4?w=400', title: 'Chefs Expertos', desc: 'Nuestros cocineros tienen mas de 15 anos de experiencia en gastronomia peruana.' },
              { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', title: 'Ingredientes Frescos', desc: 'Trabajamos directamente con productores locales para garantizar calidad en cada plato.' },
              { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', title: 'Premio a la Excelencia', desc: 'Reconocidos como uno de los mejores restaurantes criollos de la ciudad.' },
              { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', title: 'Con Amor Peruano', desc: 'Cada receta lleva la tradicion y el sabor autentico de la cocina peruana.' },
            ].map((item, i) => (
              <div key={i} className="why__card">
                <div className="why__card__img-wrap">
                  <img src={item.img} alt={item.title} className="why__card__img" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Reservas */}
      <section className="cta-banner container">
        <div className="cta-banner__inner">
          <div className="cta-banner__text">
            <h2>Listo para una experiencia inolvidable?</h2>
            <p>Reserva tu mesa ahora y disfruta de lo mejor de la gastronomia peruana</p>
          </div>
          <Link to="/reservas" className="btn-primary">Reservar Ahora</Link>
        </div>
      </section>
    </div>
  )
}
