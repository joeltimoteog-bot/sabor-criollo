// Importa la librería principal de React, necesaria para usar JSX y los componentes
import React from 'react'
// Importa el módulo de renderizado de React para el DOM (interfaz con el navegador)
import ReactDOM from 'react-dom/client'
// Importa el componente raíz de la aplicación, que contiene el enrutador y la estructura general
import App from './App.jsx'
// Importa la hoja de estilos global, con las variables CSS y reglas base del proyecto
import './styles/global.css'

// Crea la raíz de React sobre el elemento <div id="root"> definido en index.html
// y renderiza dentro de él el componente <App /> envuelto en StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode activa verificaciones adicionales en desarrollo para detectar errores y malas prácticas
  <React.StrictMode>
    {/* Componente principal que monta toda la aplicación */}
    <App />
  </React.StrictMode>
)
