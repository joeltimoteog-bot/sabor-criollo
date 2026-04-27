// Importa Link de React Router para navegar entre páginas sin recargar
import { Link } from 'react-router-dom'
// Importa hooks: useState (estado), useEffect (efectos secundarios), useRef (referencias DOM)
import { useState, useEffect, useRef } from 'react'
// Importa los estilos específicos de la página de inicio
import './HomePage.css'

// Arreglo con los platos destacados que se mostrarán en el carrusel de la home
// Cada objeto contiene id, imagen, nombre, descripción, precio y categoría
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

// Arreglo con las diapositivas (slides) del banner principal "hero"
// Cada slide tiene un título, subtítulo y color de fondo
const heroSlides = [
  { title: 'Bienvenido a Sabor Criollo', subtitle: 'La mejor gastronomia peruana en un ambiente unico y acogedor', bg: '#8B2E00' },
  { title: 'Sabores que cuentan historias', subtitle: 'Recetas autenticas transmitidas de generacion en generacion', bg: '#7A2200' },
  { title: 'Reserva tu mesa hoy', subtitle: 'Vive una experiencia gastronomica inigualable con tu familia', bg: '#6B1C00' },
]

/*
 * Componente HomePage
 * Renderiza la página de inicio: banner hero rotativo, carrusel de platos
 * estrella, sección "Por qué elegirnos" y un banner final de llamada a reservar.
 */
export default function HomePage() {
  // Estado: índice del slide del hero que se está mostrando actualmente
  const [slide, setSlide] = useState(0)
  // Estado: índice actual del carrusel de platos (posición de la "ventana")
  const [current, setCurrent] = useState(0)
  // Estado: cuántas tarjetas se muestran a la vez en el carrusel (responsive)
  const [visibleCount, setVisibleCount] = useState(3)
  // Estado: pausa el autoplay del carrusel cuando el cursor está sobre él
  const [paused, setPaused] = useState(false)
  // Referencia DOM al elemento del carrusel (no usada actualmente, pero disponible)
  const carouselRef = useRef(null)

  // useEffect del autoplay del hero: avanza al siguiente slide cada 4.5 segundos
  useEffect(() => {
    // setInterval ejecuta el callback periódicamente; el módulo asegura el bucle infinito
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 4500)
    // Limpieza: detiene el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(timer)
  }, [])

  // useEffect que adapta el número de tarjetas visibles según el ancho de la ventana (responsive)
  useEffect(() => {
    // Función que calcula visibleCount según el ancho actual del viewport
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCount(1)        // Móvil: 1 tarjeta
      else if (window.innerWidth < 1024) setVisibleCount(2)  // Tablet: 2 tarjetas
      else setVisibleCount(3)                                // Escritorio: 3 tarjetas
    }
    updateVisible() // Ejecuta una vez al montar para establecer el valor inicial
    // Listener para reaccionar cuando el usuario cambie el tamaño de la ventana
    window.addEventListener('resize', updateVisible)
    // Limpieza: elimina el listener al desmontar
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  // useEffect del autoplay del carrusel de platos: avanza cada 3 segundos si no está pausado
  useEffect(() => {
    if (paused) return // Si está pausado, no inicia el intervalo
    const timer = setInterval(() => {
      // Avanza al siguiente índice; al llegar al final vuelve al inicio
      setCurrent(c => {
        const maxIndex = featuredDishes.length - visibleCount
        return c >= maxIndex ? 0 : c + 1
      })
    }, 3000)
    return () => clearInterval(timer)
  // Dependencias: el efecto se reinicia cuando cambia el estado pausado o las tarjetas visibles
  }, [paused, visibleCount])

  // Índice máximo válido: cuántos pasos puede avanzar el carrusel sin mostrar espacios vacíos
  const maxIndex = featuredDishes.length - visibleCount
  // Cantidad de "puntos" indicadores debajo del carrusel
  const totalDots = maxIndex + 1

  // Función para retroceder un slide en el carrusel (al inicio salta al final)
  const prev = () => setCurrent(c => (c <= 0 ? maxIndex : c - 1))
  // Función para avanzar un slide en el carrusel (al final salta al inicio)
  const next = () => setCurrent(c => (c >= maxIndex ? 0 : c + 1))

  // Ancho en porcentaje de cada tarjeta (100% dividido entre las visibles)
  const cardWidth = 100 / visibleCount

  return (
    <div className="home">
      {/* ── Hero: banner rotativo principal ── */}
      <section className="hero" style={{ background: heroSlides[slide].bg, position: 'relative' }}>
        {/* Capa de oscurecimiento sobre el fondo para que el texto sea legible */}
        <div className="hero__overlay" />
        {/* Logo grande de fondo decorativo */}
        <img src="/logo.png" alt="Sabor Criollo logo" className="hero__logo-bg" />
        {/* Contenido textual del hero con animación de aparición */}
        <div className="hero__content animate-fadeInUp">
          <span className="hero__badge">Gastronomia Peruana Autentica</span>
          {/* Título dinámico que cambia según el slide actual */}
          <h1 className="hero__title">{heroSlides[slide].title}</h1>
          <p className="hero__subtitle">{heroSlides[slide].subtitle}</p>
          {/* Botones de acción: reservar y ver menú */}
          <div className="hero__actions">
            <Link to="/reservas" className="btn-primary">Reservar Mesa</Link>
            <Link to="/menu" className="btn-outline">Ver Menu</Link>
          </div>
        </div>
        {/* Indicadores (dots) que permiten saltar a cualquier slide */}
        <div className="hero__dots">
          {/* map sobre los slides para crear un botón por cada uno */}
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero__dot ${i === slide ? 'hero__dot--active' : ''}`}
              onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        {/* Indicador animado de scroll en la esquina inferior derecha */}
        <div className="hero__scroll">v</div>
      </section>

      {/* ── Carrusel de Platos Estrella ── */}
      <section className="featured container">
        <h2 className="section-title">Platos Estrella</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Una seleccion de nuestros platos mas amados, preparados con ingredientes frescos del dia</p>

        {/* Contenedor del carrusel: pausa el autoplay al pasar el mouse */}
        <div
          className="carousel"
          ref={carouselRef}
          onMouseEnter={() => setPaused(true)}  // Pausa el carrusel al entrar el cursor
          onMouseLeave={() => setPaused(false)} // Reanuda al salir
        >
          {/* Botón flecha izquierda: retrocede el carrusel */}
          <button className="carousel__arrow carousel__arrow--left" onClick={prev} aria-label="Anterior">
            &#8592;
          </button>

          {/* Ventana del carrusel con overflow oculto: solo muestra las tarjetas visibles */}
          <div className="carousel__window">
            {/* Track con todas las tarjetas; se traslada horizontalmente según "current" */}
            <div
              className="carousel__track"
              // Cálculo del desplazamiento: porcentaje según la posición actual
              style={{ transform: `translateX(-${current * cardWidth}%)` }}
            >
              {/* map sobre los platos destacados para crear cada tarjeta */}
              {featuredDishes.map(dish => (
                <div key={dish.id}
                  className="dish-card"
                  // Ancho mínimo dinámico para mostrar exactamente "visibleCount" tarjetas
                  style={{ minWidth: `${cardWidth}%` }}
                >
                  {/* Contenedor de la imagen con overflow para efecto de zoom al hover */}
                  <div className="dish-card__img-wrap">
                    <img src={dish.img} alt={dish.name} className="dish-card__img" />
                  </div>
                  <span className="dish-card__category">{dish.category}</span>
                  <h3 className="dish-card__name">{dish.name}</h3>
                  <p className="dish-card__desc">{dish.desc}</p>
                  {/* Pie de tarjeta: precio y enlace a la carta completa */}
                  <div className="dish-card__footer">
                    <span className="dish-card__price">{dish.price}</span>
                    <Link to="/menu" className="dish-card__btn">Ver mas</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón flecha derecha: avanza el carrusel */}
          <button className="carousel__arrow carousel__arrow--right" onClick={next} aria-label="Siguiente">
            &#8594;
          </button>
        </div>

        {/* Dots indicadores del carrusel: permiten saltar a cualquier grupo */}
        <div className="carousel__dots">
          {/* Array.from genera un array de tamaño "totalDots" para iterar */}
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)} // Salta directamente al grupo seleccionado
              aria-label={`Ir al grupo ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA al final del carrusel: invita a ver el menú completo */}
        <div className="featured__cta">
          <Link to="/menu" className="btn-primary">Ver Menu Completo</Link>
        </div>
      </section>

      {/* ── Sección "Por qué elegirnos" ── */}
      <section className="why">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>Por que elegirnos?</h2>
          <div className="section-divider" />
          <div className="why__grid">
            {/* Array inline de razones; map crea una tarjeta por cada una */}
            {[
              { img: 'https://images.unsplash.com/photo-1583394293214-0a2faca2f1e4?w=400', title: 'Chefs Expertos', desc: 'Nuestros cocineros tienen mas de 15 anos de experiencia en gastronomia peruana.' },
              { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', title: 'Ingredientes Frescos', desc: 'Trabajamos directamente con productores locales para garantizar calidad en cada plato.' },
              { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', title: 'Premio a la Excelencia', desc: 'Reconocidos como uno de los mejores restaurantes criollos de la ciudad.' },
              { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', title: 'Con Amor Peruano', desc: 'Cada receta lleva la tradicion y el sabor autentico de la cocina peruana.' },
            ].map((item, i) => (
              // Como los items no tienen id, se usa el índice como key
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

      {/* ── Banner CTA final: invita a hacer una reserva ── */}
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
