import './NosotrosPage.css'

const valores = [
  { icon: '🌿', titulo: 'Autenticidad', desc: 'Preservamos las recetas originales de la cocina criolla peruana, sin modificar sus sabores tradicionales.' },
  { icon: '❤️', titulo: 'Pasión', desc: 'Cada plato se prepara con dedicación y amor, siguiendo el legado gastronómico de nuestros ancestros.' },
  { icon: '🤝', titulo: 'Comunidad', desc: 'Apoyamos a productores locales y agricultores de la región para garantizar insumos de primera calidad.' },
  { icon: '✨', titulo: 'Excelencia', desc: 'Nos comprometemos a brindar la mejor experiencia gastronómica en cada visita de nuestros comensales.' },
]

const equipo = [
  { emoji: '👨‍🍳', nombre: 'Chef Carlos Quispe', cargo: 'Chef Ejecutivo', exp: '18 años de experiencia en cocina criolla peruana' },
  { emoji: '👩‍🍳', nombre: 'Sofía Mamani', cargo: 'Sous Chef', exp: 'Especialista en sazones y técnicas andinas' },
  { emoji: '🧑‍🍳', nombre: 'Luis Paredes', cargo: 'Chef de Postres', exp: 'Maestro en dulces y postres tradicionales peruanos' },
  { emoji: '👨‍💼', nombre: 'María Torres', cargo: 'Gerente del restaurante', exp: 'Más de 10 años en gestión gastronómica' },
]

export default function NosotrosPage() {
  return (
    <div className="nosotros-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Nuestra Historia</h1>
          <p className="page-header__sub">Conoce quiénes somos y qué nos apasiona</p>
        </div>
      </div>

      {/* Historia */}
      <section className="historia container">
        <div className="historia__content">
          <div className="historia__text">
            <h2 className="section-title" style={{ textAlign: 'left' }}>Desde el corazón de Lima</h2>
            <div className="section-divider" style={{ margin: '0.8rem 0 1.5rem' }} />
            <p>Sabor Criollo nació en 2008 con un sueño sencillo pero poderoso: llevar la cocina criolla peruana más auténtica a cada mesa. Fundado por la familia Quispe, el restaurante inició sus actividades en un pequeño local del centro histórico de Lima, con solo seis mesas y una carta de ocho platos.</p>
            <br />
            <p>Hoy, más de 15 años después, Sabor Criollo se ha convertido en un referente de la gastronomía peruana en la ciudad, manteniendo intacta la esencia de sus orígenes: ingredientes frescos del mercado, recetas transmitidas de generación en generación y el inconfundible sabor de la cocina criolla.</p>
            <br />
            <p>Cada plato que sale de nuestra cocina es una declaración de amor por el Perú, por su diversidad culinaria y por la riqueza de sus tradiciones gastronómicas que nos han hecho reconocidos internacionalmente.</p>
            <div className="historia__stats">
              {[
                { num: '15+', label: 'Años de experiencia' },
                { num: '50+', label: 'Platos en carta' },
                { num: '200+', label: 'Comensales diarios' },
                { num: '4.9⭐', label: 'Valoración promedio' },
              ].map((s, i) => (
                <div key={i} className="historia__stat">
                  <span className="historia__stat-num">{s.num}</span>
                  <span className="historia__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="historia__visual">
            <div className="historia__emoji-grid">
              {['🍋', '🥩', '🦐', '🍮', '🫔', '🌽'].map((e, i) => (
                <div key={i} className="historia__emoji-cell">{e}</div>
              ))}
            </div>
            <div className="historia__badge-overlay">
              <span>🏆</span>
              <strong>Premio Gastronómico 2023</strong>
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

      {/* Equipo */}
      <section className="equipo container">
        <h2 className="section-title">Nuestro Equipo</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Las personas apasionadas que hacen posible la magia en cada plato</p>
        <div className="equipo__grid">
          {equipo.map((m, i) => (
            <div key={i} className="equipo-card">
              <div className="equipo-card__avatar">{m.emoji}</div>
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
