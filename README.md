# PayTrack - Módulo Dashboard de Nómina

Este proyecto contiene un frontend React con Vite y un backend Node.js/Express para un módulo Dashboard empresarial de nómina. La arquitectura está diseñada para escalabilidad, separación de responsabilidades y futuras integraciones.

## Arquitectura general

- `backend/` — servidor Express modular, conexión MySQL, autenticación JWT y API REST para el dashboard.
- `src/` — frontend React con rutas, contexto, componentes reutilizables y cliente Axios.
- `public/` — activos estáticos.
- `.claude/` — archivos de contexto para agentes IA.

## Características del módulo Dashboard

- Autenticación con JWT.
- Panel administrativo con estadísticas, reportes y estado del sistema.
- Sidebar dinámico preparado para nuevos módulos.
- Frontend responsive con TailwindCSS.
- Backend desacoplado con controladores, servicios y modelos.

## Tecnología

- Frontend: React, Vite, TailwindCSS, React Router, Axios
- Backend: Node.js, Express, MySQL (`mysql2`), JWT, bcryptjs
- Arquitectura: Servicios, controladores, rutas, middlewares

## Cómo ejecutar

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Ajusta las variables de entorno en backend/.env
npm run dev
```

## Endpoints principales

- `POST /api/v1/auth/login` — autenticación
- `GET /api/v1/dashboard/summary` — métricas generales
- `GET /api/v1/dashboard/reports` — reportes recientes
- `GET /api/v1/dashboard/system-stats` — estado de módulos

## Cómo agregar nuevos módulos

1. Crea un nuevo subdominio en `backend/src/routes` y agrégalo a `backend/src/routes/index.js`.
2. Añade un controlador en `backend/src/controllers`, un servicio en `backend/src/services` y un modelo en `backend/src/models`.
3. En el frontend, crea una nueva página en `src/pages`, una entrada de navegación en `src/components/layout/Sidebar.tsx` y rutas en `src/App.tsx`.
4. Utiliza `api/axiosConfig.ts` para consumir nuevos endpoints y `context/AuthContext.tsx` para proteger rutas.

## Seguridad y producción

- JWT todo el backend protegido con middleware de autenticación.
- Manejo centralizado de errores en `backend/src/middlewares/errorMiddleware.js`.
- Conexión MySQL a través de pool en `backend/src/config/db.js`.
- Validación de credenciales en el servicio de autenticación.

## Notas

Este proyecto está preparado como base para un entorno académico y puede evolucionar hacia un sistema real gracias a su arquitectura modular y buenas prácticas.
