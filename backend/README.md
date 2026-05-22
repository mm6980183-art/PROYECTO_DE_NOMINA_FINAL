# PayTrack Backend

## Arquitectura

El backend está organizado en capas para separar responsabilidades:

- `src/config/` — configuración central y conexión MySQL.
- `src/routes/` — definición de rutas y organización de API por dominios.
- `src/controllers/` — controladores que reciben solicitudes y delegan la lógica de negocio.
- `src/services/` — lógica de negocio y orquestación de modelos.
- `src/models/` — consultas SQL y acceso a datos.
- `src/middlewares/` — autenticación, validación y manejo de errores.
- `src/utils/` — utilidades compartidas (errores y logger).

## Instalación

```bash
cd backend
npm install
cp .env.example .env
```

## Ejecución

```bash
npm run dev
```

El servidor quedará expuesto en `http://localhost:4000` por defecto.

## Endpoints

- `POST /api/v1/auth/login` — autenticación de usuario.
- `GET /api/v1/dashboard/summary` — métricas generales del dashboard.
- `GET /api/v1/dashboard/reports` — reportes recientes.
- `GET /api/v1/dashboard/system-stats` — estado de los módulos.

## Notas de expansión

Para agregar un nuevo módulo, crea:

1. Nuevo archivo de rutas en `src/routes/`.
2. Nuevo controlador en `src/controllers/`.
3. Nuevo servicio en `src/services/`.
4. Nuevo modelo en `src/models/`.
5. Agrega la ruta en `src/routes/index.js`.
