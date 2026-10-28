# microapp-template

Plantilla base para micro apps: Next.js (App Router) con TypeScript estricto, PostgreSQL con Drizzle, Better Auth, un solo contenedor de aplicacion, mobile-first y PWA.

## Arranque rapido (Docker)

```bash
./bin/dev                # crea .env con un secreto de sesion nuevo si no existe
# editar .env: contrasenas y, para el seed, INITIAL_ADMIN_EMAIL e INITIAL_ADMIN_PASSWORD
./bin/migrate
./bin/seed
```

La aplicacion queda en `http://localhost:3000` (o el `APP_PORT` del `.env`). Inicia sesion con el administrador del seed y abre `/items`.

## Arranque sin Docker

Requiere Node 22 y una base PostgreSQL accesible.

```bash
npm ci
export DATABASE_URL=postgresql://app:app@localhost:5432/app
export BETTER_AUTH_SECRET=$(openssl rand -base64 48)
export BETTER_AUTH_URL=http://localhost:3000
npm run db:migrate
npm run db:seed
npm run dev
```

## Verificacion

```bash
npm run lint && npm run typecheck && npm test && npm run build
npm run test:e2e         # necesita la base migrada y sembrada
```

## Estructura

- `src/domain`: logica de negocio pura y sus tests.
- `src/features/<modulo>`: acciones, consultas, esquemas y componentes de cada funcionalidad.
- `src/server`: configuracion, base de datos y autenticacion.
- `src/app`: rutas (`(public)`, `(staff)`, `login`, `api`).
- `e2e`: pruebas de extremo a extremo en viewport movil.

Las reglas completas de trabajo estan en `CLAUDE.md`.

## Despliegue

Cada merge a `main` publica en GHCR las imagenes `app` y `tools` con tag `vX.Y.Z` (version de `package.json`) y `latest`, y dispara el webhook de Komodo. Secretos necesarios en el repositorio: `KOMODO_WEBHOOK` y, opcionalmente, `KOMODO_SECRET`. El stack de produccion es `docker-compose.prod.yml`: PostgreSQL, un servicio `migrate` que aplica las migraciones y la aplicacion.

## Crear una app desde la plantilla

1. Usar "Use this template" en GitHub.
2. Renombrar en `package.json`, `README.md`, `COMPOSE_PROJECT_NAME`, `GITHUB_REPOSITORY` y los textos de `layout.tsx` y `manifest.ts`.
3. Sustituir el modulo `items` por el dominio real y reiniciar las migraciones con `npm run db:generate`.
