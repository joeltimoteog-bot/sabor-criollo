// Importa el hook useState para manejar el estado local del componente
import { useState } from 'react'
// Importa los estilos específicos de la página de menú
import './MenuPage.css'

// Arreglo con todos los platos de la carta del restaurante
// Cada plato tiene: id, categoria, imagen, nombre, descripcion y precio (numérico)
const menu = [
  // Entradas
  { id: 1, categoria: 'Entradas', img: 'https://images.unsplash.com/photo-1535400255456-984e0e935757?w=400&q=80', nombre: 'Ceviche Clasico', desc: 'Pescado fresco marinado en limon con aji limo, cebolla morada y choclo serrano.', precio: 28 },
  { id: 2, categoria: 'Entradas', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', nombre: 'Causa Limena', desc: 'Papa amarilla sazonada con aji amarillo, rellena con atun o pollo desmenuzado.', precio: 22 },
  { id: 3, categoria: 'Entradas', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', nombre: 'Chupe de Camarones', desc: 'Sopa cremosa de camarones con leche, huevo y arroz, preparada al estilo arequipeno.', precio: 32 },
  { id: 4, categoria: 'Entradas', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80', nombre: 'Ensalada de Palta', desc: 'Palta fresca con tomate, lechuga, aceitunas y aderezo de limon y cilantro.', precio: 18 },
  // Fondos
  { id: 5, categoria: 'Fondos', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80', nombre: 'Lomo Saltado', desc: 'Jugoso lomo de res salteado con cebolla, tomate, aji amarillo, sillao y papas fritas.', precio: 36 },
  { id: 6, categoria: 'Fondos', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', nombre: 'Aji de Gallina', desc: 'Pollo deshilachado en cremosa salsa de aji amarillo, nueces, pan y queso parmesano.', precio: 30 },
  { id: 7, categoria: 'Fondos', img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80', nombre: 'Sudado de Pescado', desc: 'Pescado fresco cocido en chicha de jora con tomate, cebolla y aji panca.', precio: 34 },
  { id: 8, categoria: 'Fondos', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', nombre: 'Seco de Cordero', desc: 'Tierno cordero guisado con culantro, chicha de jora y cancha acompanado de frijoles.', precio: 38 },
  // Postres
  { id: 9, categoria: 'Postres', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', nombre: 'Suspiro Limeno', desc: 'Suave manjar blanco coronado con merengue de oporto y canela al gusto.', precio: 14 },
  { id: 10, categoria: 'Postres', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', nombre: 'Arroz con Leche', desc: 'Cremoso arroz cocido en leche con canela, clavo y azucar al gusto.', precio: 12 },
  { id: 11, categoria: 'Postres', img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80', nombre: 'Mazamorra Morada', desc: 'Deliciosa mazamorra de maiz morado con frutas secas y canela en rama.', precio: 11 },
  // Bebidas
  { id: 12, categoria: 'Bebidas', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80', nombre: 'Pisco Sour', desc: 'El coctel mas iconico del Peru: pisco quebranta, limon, clara de huevo y amargo.', precio: 22 },
  { id: 13, categoria: 'Bebidas', img: 'https://images.unsplash.com/photo-1559181567-c3190900aaef?w=400&q=80', nombre: 'Chicha Morada', desc: 'Bebida refrescante de maiz morado, pina, membrillo, canela y clavo de olor.', precio: 10 },
  { id: 14, categoria: 'Bebidas', img: 'https://images.unsplash.com/photo-1622597467836-f3e6707e5ff6?w=400&q=80', nombre: 'Maracuya Frozen', desc: 'Refrescante bebida de maracuya natural con hielo, menta y un toque de azucar.', precio: 12 },
]

// Arreglo con las categorías disponibles en los filtros (incluye "Todos" para no filtrar)
const categorias = ['Todos', 'Entradas', 'Fondos', 'Postres', 'Bebidas']

/*
 * Componente MenuPage
 * Renderiza la carta del restaurante con buscador y filtros por categoría.
 * Muestra los platos en una grilla responsive y permite buscar por nombre o ingredientes.
 */
export default function MenuPage() {
  // Estado: categoría seleccionada actualmente (por defecto "Todos")
  const [filtro, setFiltro] = useState('Todos')
  // Estado: texto del buscador escrito por el usuario
  const [busqueda, setBusqueda] = useState('')

  // Filtra el arreglo "menu" combinando dos criterios: categoría y texto de búsqueda
  const filtered = menu.filter(item => {
    // Coincide con categoría si "Todos" está activo o coincide con la categoría exacta
    const matchCat = filtro === 'Todos' || item.categoria === filtro
    // Coincide con búsqueda si el texto está en el nombre o en la descripción (case-insensitive)
    const matchSearch = item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.desc.toLowerCase().includes(busqueda.toLowerCase())
    // Solo incluye el plato si cumple ambas condiciones
    return matchCat && matchSearch
  })

  return (
    <div className="menu-page">
      {/* Cabecera de la página con título y subtítulo */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Nuestra Carta</h1>
          <p className="page-header__sub">Descubre los sabores autenticos de la gastronomia peruana</p>
        </div>
      </div>

      <div className="container menu-container">
        {/* ── Caja de búsqueda ── */}
        <div className="menu__search">
          <span className="menu__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar plato o ingrediente..."
            value={busqueda} // Componente controlado: el value sigue al estado
            onChange={e => setBusqueda(e.target.value)} // Actualiza el estado al escribir
            className="menu__search-input"
          />
          {/* Botón "x" para limpiar la búsqueda; solo aparece si hay texto escrito */}
          {busqueda && (
            <button className="menu__search-clear" onClick={() => setBusqueda('')}>x</button>
          )}
        </div>

        {/* ── Botones de filtros por categoría ── */}
        <div className="menu__filters">
          {/* map sobre las categorías para crear un botón por cada una */}
          {categorias.map(cat => (
            <button
              key={cat}
              // Aplica clase "--active" al botón cuyo valor coincide con el filtro actual
              className={`menu__filter ${filtro === cat ? 'menu__filter--active' : ''}`}
              onClick={() => setFiltro(cat)} // Cambia la categoría seleccionada
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador de platos: muestra "1 plato" o "N platos" según corresponda */}
        <p className="menu__count">
          {filtered.length} {filtered.length === 1 ? 'plato encontrado' : 'platos encontrados'}
        </p>

        {/* Renderizado condicional: si no hay resultados muestra mensaje, si hay muestra grilla */}
        {filtered.length === 0 ? (
          <div className="menu__empty">
            <span>😕</span>
            <p>No encontramos platos con "{busqueda}".</p>
          </div>
        ) : (
          <div className="menu__grid">
            {/* map sobre los platos filtrados para generar una tarjeta por cada uno */}
            {filtered.map(item => (
              <div key={item.id} className="menu-card">
                {/* Imagen del plato */}
                <div className="menu-card__img-wrap">
                  <img src={item.img} alt={item.nombre} className="menu-card__img" />
                </div>
                {/* Cuerpo de la tarjeta con nombre, categoría, descripción y precio */}
                <div className="menu-card__body">
                  <div className="menu-card__header">
                    <h3 className="menu-card__name">{item.nombre}</h3>
                    <span className="menu-card__cat">{item.categoria}</span>
                  </div>
                  <p className="menu-card__desc">{item.desc}</p>
                  {/* toFixed(2) formatea el precio con dos decimales */}
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
