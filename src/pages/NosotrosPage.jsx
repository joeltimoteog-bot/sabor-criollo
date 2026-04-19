import './NosotrosPage.css'

const valores = [
  { icon: '🌿', titulo: 'Autenticidad', desc: 'Preservamos las recetas originales de la cocina criolla peruana, sin modificar sus sabores tradicionales.' },
  { icon: '❤️', titulo: 'Pasion', desc: 'Cada plato se prepara con dedicacion y amor, siguiendo el legado gastronomico de nuestros ancestros.' },
  { icon: '🤝', titulo: 'Comunidad', desc: 'Apoyamos a productores locales y agricultores de la region para garantizar insumos de primera calidad.' },
  { icon: '✨', titulo: 'Excelencia', desc: 'Nos comprometemos a brindar la mejor experiencia gastronomica en cada visita de nuestros comensales.' },
]

const equipo = [
  { img: 'https://images.unsplash.com/photo-1583394293214-0a2faca2f1e4?w=400&q=80', nombre: 'Chef Carlos Quispe', cargo: 'Chef Ejecutivo', exp: '18 anos de experiencia en cocina criolla peruana' },
  { img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80', nombre: 'Sofia Mamani', cargo: 'Sous Chef', exp: 'Especialista en sazones y tecnicas andinas' },
  { img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80', nombre: 'Luis Paredes', cargo: 'Chef de Postres', exp: 'Maestro en dulces y postres tradicionales peruanos' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', nombre: 'Maria Torres', cargo: 'Gerente', exp: 'Mas de 10 anos en gestion gastronomica' },
]

export default function NosotrosPage() {
  return (
    <div className="nosotros-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Nuestra Historia</h1>
          <p className="page-header__sub">Conoce quienes somos y que nos apasiona</p>
        </div>
      </div>

      {/* Historia */}
      <section className="historia container">
        <div className="historia__content">
          <div className="historia__text">
            <h2 className="section-title" style={{ textAlign: 'left' }}>Desde el corazon de Lima</h2>
            <div className="section-divider" style={{ margin: '0.8rem 0 1.5rem' }} />
            <p>Sabor Criollo nacio en 2008 con un sueno sencillo pero poderoso: llevar la cocina criolla peruana mas autentica a cada mesa. Fundado por la familia Quispe, el restaurante inicio sus actividades en un pequeno local del centro historico de Lima.</p>
            <br />
            <p>Hoy, mas de 15 anos despues, Sabor Criollo se ha convertido en un referente de la gastronomia peruana en la ciudad, manteniendo intacta la esencia de sus origenes: ingredientes frescos, recetas transmitidas de generacion en generacion.</p>
            <br />
            <p>Cada plato que sale de nuestra cocina es una declaracion de amor por el Peru, por su diversidad culinaria y por la riqueza de sus tradiciones gastronomicas.</p>
            <div className="historia__stats">
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
          <div className="historia__visual">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Restaurante Sabor Criollo"
              className="historia__img"
            />
            <div className="historia__badge-overlay">
              <span>🏆</span>
              <strong>Premio Gastronomico 2023</strong>
              <small>Mejor restaurante criollo</small>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="valores">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>Nuestros Valores</h2>
          <div className="section-divider" />
          <div className="valores__grid">
            {valores.map((v, i) => (
              <div key={i} className="valor-card">
                <div className="valor-card__icon">{v.icon}</div>
                <h3>{v.titulo}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="galeria container">
        <h2 className="section-title">Nuestra Cocina</h2>
        <div className="section-divider" />
        <div className="galeria__grid">
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

      {/* Equipo */}
      <section className="equipo container">
        <h2 className="section-title">Nuestro Equipo</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Las personas apasionadas que hacen posible la magia en cada plato</p>
        <div className="equipo__grid">
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
