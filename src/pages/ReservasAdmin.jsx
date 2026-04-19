import { useState, useEffect } from 'react'
import './ReservasAdmin.css'

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

export default function ReservasAdmin() {
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(data)
  }, [])

  const eliminar = (id) => {
    const actualizadas = reservas.filter(r => r.id !== id)
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
  }

  const limpiarTodo = () => {
    setReservas([])
    localStorage.removeItem('reservas')
  }

  return (
    <div className="radmin">
      <div className="radmin__header">
        <div className="container">
          <h1 className="radmin__title">Panel de Administración</h1>
          <p className="radmin__sub">Gestión de reservas registradas</p>
        </div>
      </div>

      <div className="container radmin__body">
        <div className="radmin__toolbar">
          <span className="radmin__count">
            {reservas.length === 0
              ? 'Sin reservas'
              : `${reservas.length} reserva${reservas.length !== 1 ? 's' : ''} registrada${reservas.length !== 1 ? 's' : ''}`}
          </span>
          {reservas.length > 0 && (
            <button className="radmin__btn-clear" onClick={limpiarTodo}>
              🗑 Limpiar todo
            </button>
          )}
        </div>

        {reservas.length === 0 ? (
          <div className="radmin__empty">
            <span>📋</span>
            <p>No hay reservas registradas aún</p>
          </div>
        ) : (
          <>
            {/* Tabla — visible en tablet/desktop */}
            <div className="radmin__table-wrap">
              <table className="radmin__table">
                <thead>
                  <tr>
                    {COLUMNS.map(c => <th key={c.key}>{c.label}</th>)}
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? 'radmin__row--even' : ''}>
                      {COLUMNS.map(c => <td key={c.key}>{r[c.key] || '—'}</td>)}
                      <td>
                        <button className="radmin__btn-del" onClick={() => eliminar(r.id)} aria-label="Eliminar">
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards — visible en móvil */}
            <div className="radmin__cards">
              {reservas.map(r => (
                <div key={r.id} className="radmin__card">
                  <div className="radmin__card-head">
                    <strong>{r.nombre} {r.apellido}</strong>
                    <button className="radmin__btn-del" onClick={() => eliminar(r.id)} aria-label="Eliminar">✕</button>
                  </div>
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
