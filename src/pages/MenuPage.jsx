import { useState } from 'react'
import './MenuPage.css'

const menu = [
  // Entradas
  { id: 1, categoria: 'Entradas', emoji: '🍋', nombre: 'Ceviche Clásico', desc: 'Pescado fresco marinado en limón con ají limo, cebolla morada y choclo serrano.', precio: 28 },
  { id: 2, categoria: 'Entradas', emoji: '🫑', nombre: 'Causa Limeña', desc: 'Papa amarilla sazonada con ají amarillo, rellena con atún o pollo desmenuzado.', precio: 22 },
  { id: 3, categoria: 'Entradas', emoji: '🦐', nombre: 'Chupe de Camarones', desc: 'Sopa cremosa de camarones con leche, huevo y arroz, preparada al estilo arequipeño.', precio: 32 },
  { id: 4, categoria: 'Entradas', emoji: '🥗', nombre: 'Ensalada de Palta', desc: 'Palta fresca con tomate, lechuga, aceitunas y aderezo de limón y cilantro.', precio: 18 },
  // Fondos
  { id: 5, categoria: 'Fondos', emoji: '🥩', nombre: 'Lomo Saltado', desc: 'Jugoso lomo de res salteado con cebolla, tomate, ají amarillo, sillao y papas fritas.', precio: 36 },
  { id: 6, categoria: 'Fondos', emoji: '🦆', nombre: 'Ají de Gallina', desc: 'Pollo deshilachado en cremosa salsa de ají amarillo, nueces, pan y queso parmesano.', precio: 30 },
  { id: 7, categoria: 'Fondos', emoji: '🐟', nombre: 'Sudado de Pescado', desc: 'Pescado fresco cocido en chicha de jora con tomate, cebolla y ají panca.', precio: 34 },
  { id: 8, categoria: 'Fondos', emoji: '🍛', nombre: 'Seco de Cordero', desc: 'Tierno cordero guisado con culantro, chicha de jora y cancha acompañado de frijoles.', precio: 38 },
  // Postres
  { id: 9, categoria: 'Postres', emoji: '🍮', nombre: 'Suspiro Limeño', desc: 'Suave manjar blanco coronado con merengue de oporto y canela al gusto.', precio: 14 },
  { id: 10, categoria: 'Postres', emoji: '🍰', nombre: 'Arroz con Leche', desc: 'Cremoso arroz cocido en leche con canela, clavo y azúcar al gusto.', precio: 12 },
  { id: 11, categoria: 'Postres', emoji: '🫐', nombre: 'Mazamorra Morada', desc: 'Deliciosa mazamorra de maíz morado con frutas secas y canela en rama.', precio: 11 },
  // Bebidas
  { id: 12, categoria: 'Bebidas', emoji: '🍹', nombre: 'Pisco Sour', desc: 'El cóctel más icónico del Perú: pisco quebranta, limón, clara de huevo y amargo de angostura.', precio: 22 },
  { id: 13, categoria: 'Bebidas', emoji: '🟣', nombre: 'Chicha Morada', desc: 'Bebida refrescante de maíz morado, piña, membrillo, canela y clavo de olor.', precio: 10 },
  { id: 14, categoria: 'Bebidas', emoji: '🍊', nombre: 'Maracuyá Frozen', desc: 'Refrescante bebida de maracuyá natural con hielo, menta y un toque de azúcar.', precio: 12 },
]

const categorias = ['Todos', 'Entradas', 'Fondos', 'Postres', 'Bebidas']

export default function MenuPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const filtered = menu.filter(item => {
    const matchCat = filtro === 'Todos' || item.categoria === filtro
    const matchSearch = item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.desc.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Nuestra Carta</h1>
          <p className="page-header__sub">Descubre los sabores auténticos de la gastronomía peruana</p>
        </div>
      </div>

      <div className="container menu-container">
        {/* Buscador */}
        <div className="menu__search">
          <span className="menu__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar plato o ingrediente..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="menu__search-input"
          />
          {busqueda && (
            <button className="menu__search-clear" onClick={() => setBusqueda('')}>✕</button>
          )}
        </div>

        {/* Filtros */}
        <div className="menu__filters">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`menu__filter ${filtro === cat ? 'menu__filter--active' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat === 'Todos' && '🍽️ '}
              {cat === 'Entradas' && '🥗 '}
              {cat === 'Fondos' && '🍛 '}
              {cat === 'Postres' && '🍮 '}
              {cat === 'Bebidas' && '🍹 '}
              {cat}
            </button>
          ))}
        </div>

        {/* Resultado */}
        <p className="menu__count">
          {filtered.length} {filtered.length === 1 ? 'plato encontrado' : 'platos encontrados'}
        </p>

        {filtered.length === 0 ? (
          <div className="menu__empty">
            <span>😕</span>
            <p>No encontramos platos con "{busqueda}". Intenta otra búsqueda.</p>
          </div>
        ) : (
          <div className="menu__grid">
            {filtered.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card__emoji">{item.emoji}</div>
                <div className="menu-card__body">
                  <div className="menu-card__header">
                    <h3 className="menu-card__name">{item.nombre}</h3>
                    <span className="menu-card__cat">{item.categoria}</span>
                  </div>
                  <p className="menu-card__desc">{item.desc}</p>
                  <div className="menu-card__price">S/. {item.precio.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
