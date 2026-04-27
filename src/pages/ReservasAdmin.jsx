// Importa los hooks useState (estado local) y useEffect (efectos secundarios) de React
import { useState, useEffect } from 'react'
// Importa los estilos específicos del panel administrativo
import './ReservasAdmin.css'

// Definición de las columnas que se mostrarán en la tabla del panel admin
// "key" coincide con la propiedad guardada en la reserva, "label" es el encabezado mostrado
const COLUMNS = [
  { key: 'nombre',         label: 'Nombre' },
  { key: 'apellido',       label: 'Apellido' },
  { key: 'email',          label: 'Email' },
  { key: 'telefono',       label: 'Teléfono' },
  { key: 'fecha',          label: 'Fecha' },
  { key: 'hora',           label: 'Hora' },
  { key: 'personas',       label: 'Personas' },
  { key: 'ocasion',        label: 'Ocasión' },
  { key: 'fecha_registro', label: 'Fecha de registro' },
]

/*
 * Componente ReservasAdmin
 * Panel administrativo donde se listan todas las reservas guardadas en localStorage.
 * Permite eliminar reservas individuales o limpiar todo el listado.
 * Muestra una tabla en escritorio y tarjetas apiladas en móvil.
 */
export default function ReservasAdmin() {
  // Estado: arreglo con las reservas cargadas desde localStorage
  const [reservas, setReservas] = useState([])

  // useEffect que se ejecuta una sola vez al montar el componente
  // Lee las reservas previamente guardadas en localStorage y las carga al estado
  useEffect(() => {
    // Recupera el JSON de localStorage; si no existe usa un array vacío como fallback
    const data = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(data)
  }, [])

  /*
   * Elimina una reserva del listado por su id.
   * Filtra el arreglo, actualiza el estado y persiste el cambio en localStorage.
   */
  const eliminar = (id) => {
    // filter crea un nuevo arreglo sin la reserva con el id indicado
    const actualizadas = reservas.filter(r => r.id !== id)
    setReservas(actualizadas)
    // Persistencia: guarda el arreglo actualizado en localStorage
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
  }

  /*
   * Borra todas las reservas: vacía el estado y elimina la clave del localStorage.
   */
  const limpiarTodo = () => {
    setReservas([])
    localStorage.removeItem('reservas')
  }

  return (
    <div className="radmin">
      {/* Cabecera del panel admin */}
      <div className="radmin__header">
        <div className="container">
          <h1 className="radmin__title">Panel de Administración</h1>
          <p className="radmin__sub">Gestión de reservas registradas</p>
        </div>
      </div>

      <div className="container radmin__body">
        {/* Toolbar superior: contador + botón limpiar todo */}
        <div className="radmin__toolbar">
          <span className="radmin__count">
            {/* Mensaje dinámico según la cantidad de reservas (incluye singular/plural) */}
            {reservas.length === 0
              ? 'Sin reservas'
              : `${reservas.length} reserva${reservas.length !== 1 ? 's' : ''} registrada${reservas.length !== 1 ? 's' : ''}`}
          </span>
          {/* Botón de limpiar todo: solo visible si hay al menos una reserva */}
          {reservas.length > 0 && (
            <button className="radmin__btn-clear" onClick={limpiarTodo}>
              🗑 Limpiar todo
            </button>
          )}
        </div>

        {/* Renderizado condicional: estado vacío o lista de reservas */}
        {reservas.length === 0 ? (
          <div className="radmin__empty">
            <span>📋</span>
            <p>No hay reservas registradas aún</p>
          </div>
        ) : (
          // Fragmento (<>...</>) para devolver dos elementos hermanos sin div extra
          <>
            {/* ── Vista Tabla — visible en tablet y escritorio ── */}
            <div className="radmin__table-wrap">
              <table className="radmin__table">
                <thead>
                  <tr>
                    {/* map sobre las columnas para crear el encabezado dinámicamente */}
                    {COLUMNS.map(c => <th key={c.key}>{c.label}</th>)}
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map sobre las reservas: cada una es una fila */}
                  {reservas.map((r, i) => (
                    // Aplica clase "--even" a las filas pares para alternar el color
                    <tr key={r.id} className={i % 2 === 0 ? 'radmin__row--even' : ''}>
                      {/* map de columnas para crear las celdas, mostrando "—" si el campo está vacío */}
                      {COLUMNS.map(c => <td key={c.key}>{r[c.key] || '—'}</td>)}
                      <td>
                        {/* Botón de eliminar individual */}
                        <button className="radmin__btn-del" onClick={() => eliminar(r.id)} aria-label="Eliminar">
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Vista Cards — visible solo en móvil (controlado por CSS) ── */}
            <div className="radmin__cards">
              {/* map sobre las reservas para crear una tarjeta por cada una */}
              {reservas.map(r => (
                <div key={r.id} className="radmin__card">
                  {/* Encabezado de la tarjeta: nombre completo + botón eliminar */}
                  <div className="radmin__card-head">
                    <strong>{r.nombre} {r.apellido}</strong>
                    <button className="radmin__btn-del" onClick={() => eliminar(r.id)} aria-label="Eliminar">✕</button>
                  </div>
                  {/* Lista de propiedades (excepto nombre y apellido que ya van en el head)
                      filter excluye esas dos columnas y luego map crea cada fila */}
                  {COLUMNS.filter(c => c.key !== 'nombre' && c.key !== 'apellido').map(c => (
                    <div key={c.key} className="radmin__card-row">
                      <span className="radmin__card-label">{c.label}</span>
                      <span>{r[c.key] || '—'}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
