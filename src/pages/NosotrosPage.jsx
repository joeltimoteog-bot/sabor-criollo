// Importa los estilos específicos de la página Nosotros
import './NosotrosPage.css'

// Arreglo con los valores institucionales del restaurante
// Cada valor incluye una imagen, título y descripción
const valores = [
  { img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400', titulo: 'Autenticidad', desc: 'Preservamos las recetas originales de la cocina criolla peruana, sin modificar sus sabores tradicionales.' },
  { img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', titulo: 'Pasion', desc: 'Cada plato se prepara con dedicacion y amor, siguiendo el legado gastronomico de nuestros ancestros.' },
  { img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', titulo: 'Comunidad', desc: 'Apoyamos a productores locales y agricultores de la region para garantizar insumos de primera calidad.' },
  { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', titulo: 'Excelencia', desc: 'Nos comprometemos a brindar la mejor experiencia gastronomica en cada visita de nuestros comensales.' },
]

// Arreglo con la información del equipo del restaurante
// Cada miembro tiene foto, nombre, cargo y experiencia
const equipo = [
  { img: 'https://images.unsplash.com/photo-1583394293214-0a2faca2f1e4?w=400&q=80', nombre: 'Chef Carlos Quispe', cargo: 'Chef Ejecutivo', exp: '18 anos de experiencia en cocina criolla peruana' },
  { img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80', nombre: 'Sofia Mamani', cargo: 'Sous Chef', exp: 'Especialista en sazones y tecnicas andinas' },
  { img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80', nombre: 'Luis Paredes', cargo: 'Chef de Postres', exp: 'Maestro en dulces y postres tradicionales peruanos' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', nombre: 'Maria Torres', cargo: 'Gerente', exp: 'Mas de 10 anos en gestion gastronomica' },
]

/*
 * Componente NosotrosPage
 * Renderiza la página informativa con: historia del restaurante, estadísticas,
 * valores institucionales, galería de fotos y presentación del equipo.
 */
export default function NosotrosPage() {
  return (
    <div className="nosotros-page">
      {/* Cabecera de la página con título y subtítulo */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Nuestra Historia</h1>
          <p className="page-header__sub">Conoce quienes somos y que nos apasiona</p>
        </div>
      </div>

      {/* ── Sección Historia: texto + imagen + estadísticas ── */}
      <section className="historia container">
        <div className="historia__content">
          {/* Lado izquierdo: texto de la historia */}
          <div className="historia__text">
            <h2 className="section-title" style={{ textAlign: 'left' }}>Desde el corazon de Lima</h2>
            <div className="section-divider" style={{ margin: '0.8rem 0 1.5rem' }} />
            <p>Sabor Criollo nacio en 2008 con un sueno sencillo pero poderoso: llevar la cocina criolla peruana mas autentica a cada mesa. Fundado por la familia Quispe, el restaurante inicio sus actividades en un pequeno local del centro historico de Lima.</p>
            <br />
            <p>Hoy, mas de 15 anos despues, Sabor Criollo se ha convertido en un referente de la gastronomia peruana en la ciudad, manteniendo intacta la esencia de sus origenes: ingredientes frescos, recetas transmitidas de generacion en generacion.</p>
            <br />
            <p>Cada plato que sale de nuestra cocina es una declaracion de amor por el Peru, por su diversidad culinaria y por la riqueza de sus tradiciones gastronomicas.</p>
            {/* Grid de estadísticas del restaurante */}
            <div className="historia__stats">
              {/* Array inline con las estadísticas; map crea cada caja */}
              {[
                { num: '15+', label: 'Anos de experiencia' },
                { num: '50+', label: 'Platos en carta' },
                { num: '200+', label: 'Comensales diarios' },
                { num: '4.9', label: 'Valoracion promedio' },
              ].map((s, i) => (
                <div key={i} className="historia__stat">
                  <span className="historia__stat-num">{s.num}</span>
                  <span className="historia__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Lado derecho: imagen del restaurante con badge de premio */}
          <div className="historia__visual">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Restaurante Sabor Criollo"
              className="historia__img"
            />
            {/* Badge superpuesto que destaca un premio recibido */}
            <div className="historia__badge-overlay">
              <span>🏆</span>
              <strong>Premio Gastronomico 2023</strong>
              <small>Mejor restaurante criollo</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sección Valores: tarjetas con valores institucionales ── */}
      <section className="valores">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>Nuestros Valores</h2>
          <div className="section-divider" />
          <div className="valores__grid">
            {/* map sobre el arreglo "valores" para crear una tarjeta por cada valor */}
            {valores.map((v, i) => (
              <div key={i} className="valor-card">
                <div className="valor-card__img-wrap">
                  <img src={v.img} alt={v.titulo} className="valor-card__img" />
                </div>
                <h3>{v.titulo}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galería: imágenes de la cocina y el restaurante ── */}
      <section className="galeria container">
        <h2 className="section-title">Nuestra Cocina</h2>
        <div className="section-divider" />
        <div className="galeria__grid">
          {/* Array inline con URLs de imágenes; map crea un item por cada URL */}
          {[
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
            'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=400&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
          ].map((src, i) => (
            <div key={i} className="galeria__item">
              <img src={src} alt={`Cocina ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Sección Equipo: tarjetas con miembros del staff ── */}
      <section className="equipo container">
        <h2 className="section-title">Nuestro Equipo</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Las personas apasionadas que hacen posible la magia en cada plato</p>
        <div className="equipo__grid">
          {/* map sobre el arreglo "equipo" para crear una tarjeta por miembro */}
          {equipo.map((m, i) => (
            <div key={i} className="equipo-card">
              <div className="equipo-card__img-wrap">
                <img src={m.img} alt={m.nombre} className="equipo-card__img" />
              </div>
              <h3 className="equipo-card__name">{m.nombre}</h3>
              <span className="equipo-card__cargo">{m.cargo}</span>
              <p className="equipo-card__exp">{m.exp}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
