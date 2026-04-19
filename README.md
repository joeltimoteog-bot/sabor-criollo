# 🍽️ Sabor Criollo - Aplicación Web SPA

Proyecto de Investigación Aplicada — IES CIBERTEC  
Curso: Desarrollo de Entornos Web (5394) — 2026

## Tecnologías utilizadas
- **React 18** — Framework principal
- **JSX** — Sintaxis de plantillas
- **React Router v6** — Navegación SPA
- **React Hooks** — useState, useEffect (manejo de estado)
- **CSS Modules** — Estilos por componente
- **Vite** — Herramienta de build

## Estructura del proyecto
```
sabor-criollo/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx            ← Punto de entrada
    ├── App.jsx             ← Router principal
    ├── styles/
    │   └── global.css      ← Variables CSS globales
    ├── components/
    │   ├── Navbar.jsx      ← Navegación sticky responsiva
    │   ├── Navbar.css
    │   ├── Footer.jsx
    │   └── Footer.css
    └── pages/
        ├── HomePage.jsx    ← Hero + platos destacados + CTA
        ├── HomePage.css
        ├── MenuPage.jsx    ← Carta con filtros por categoría
        ├── MenuPage.css
        ├── NosotrosPage.jsx ← Historia, valores, equipo
        ├── NosotrosPage.css
        ├── ReservasPage.jsx ← Formulario con validación
        ├── ReservasPage.css
        ├── ContactoPage.jsx ← Mapa + formulario de contacto
        └── ContactoPage.css
```

## Instrucciones de instalación

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior

### Pasos
```bash
# 1. Entrar a la carpeta del proyecto
cd sabor-criollo

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Compilar para producción
```bash
npm run build
npm run preview
```

## Funcionalidades implementadas
- ✅ Navbar sticky con menú hamburguesa responsivo
- ✅ Hero con slider automático de 3 slides
- ✅ Catálogo de menú con filtros por categoría y buscador en tiempo real
- ✅ Formulario de reservas con validación completa campo por campo
- ✅ Formulario de contacto con validación y contador de caracteres
- ✅ Mapa embebido (OpenStreetMap)
- ✅ Diseño 100% responsivo (desktop, tablet, móvil)
- ✅ Navegación SPA sin recarga de página (React Router)
- ✅ Animaciones CSS en hover y transiciones de página

## Autores
- [Coordinador] — Coordinador del grupo
- [Integrante 2]
- [Integrante 3]
- [Integrante 4]

---
*Proyecto académico — No usar con fines comerciales sin autorización*
