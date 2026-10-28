# microapp-template

Plantilla base para micro apps de clientes. Un solo contenedor de aplicacion (Next.js, TypeScript) mas PostgreSQL. Mobile-first y PWA. Este fichero es la unica fuente de reglas para agentes (Claude Code y Orca).

Al crear una app desde esta plantilla: cambiar el nombre en `package.json`, `README.md`, `COMPOSE_PROJECT_NAME`, `GITHUB_REPOSITORY`, los textos de `src/app/layout.tsx` y `manifest.ts`, y sustituir el modulo de ejemplo `items` por el dominio real.

## Stack

- Next.js (App Router), version fijada. Usar solo rutas, server actions y route handlers.
- TypeScript con `strict` y `noUncheckedIndexedAccess`. Zod para validar toda entrada. Variables de entorno validadas en `src/server/config.ts`.
- PostgreSQL 16 con Drizzle. Migraciones SQL versionadas en `src/server/db/migrations` (se generan, no se editan a mano).
- Better Auth (correo y contrasena, sesion en cookie). Sin registro abierto: las cuentas las crea el administrador. Roles: `admin` y `worker`; el administrador puede todo lo del trabajador.
- Tailwind. Diseno pensado primero para movil; el escritorio se adapta despues.
- Tests: Vitest (unitarios, `src/**/*.test.ts`) y Playwright (e2e en viewport movil, `e2e/`).
- CI/CD: `.github/workflows/`. `ci.yml` valida los PR a `main`; `deploy.yml` publica en GHCR `app` y `tools` con tag `vX.Y.Z` y `latest`, y dispara el webhook de Komodo.

## Estructura y capas

- `src/domain/`: logica de negocio como funciones puras. No importa Next.js, Drizzle ni red. Aqui van precios, estados, reglas y validaciones de dominio, con tests.
- `src/features/<modulo>/`: `actions.ts` (server actions: validar con Zod, comprobar rol con `requireRole`, llamar al dominio, persistir), `queries.ts` (lecturas), `schema.ts` (Zod), `components/`.
- `src/server/`: `config.ts`, `db/` (esquema, cliente, migraciones, seed) y `auth/`.
- `src/app/`: solo rutas y composicion. `(public)` sin sesion, `(staff)` exige rol, `login`, `api/health` (liveness) y `api/ready` (base de datos).
- `src/lib/`: utilidades, etiquetas de interfaz (`labels.ts`) y cliente de auth.
- Toda action y toda pagina privada llama a `requireRole`. Nunca confiar en que la ruta basta.

## Idioma

- Codigo en ingles: variables, funciones, ficheros, tablas, columnas y valores internos (`admin`, `worker`, `pending`).
- Espanol: textos visibles de la app (con tildes correctas), comentarios, README, documentacion, commits, ramas y PR.
- Los valores internos se muestran con su etiqueta en `src/lib/labels.ts`; no escribir traducciones sueltas por el codigo.

## Comandos

- Entorno dev con Docker: `./bin/dev`, `./bin/stop`, `./bin/logs`. Base nueva: `./bin/migrate` y `./bin/seed` (necesita `INITIAL_ADMIN_EMAIL` e `INITIAL_ADMIN_PASSWORD` en `.env`).
- Usar siempre `docker compose -f docker-compose.dev.yml ...`. Todo volumen lleva sufijo `:z`.
- Verificacion (sin Docker, con `DATABASE_URL`, `BETTER_AUTH_SECRET` y `BETTER_AUTH_URL` definidos): `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`.
- Tras cambiar `src/server/db/schema.ts`: `npm run db:generate` y revisar el SQL resultante.

## Reglas obligatorias

### Git

1. Antes de modificar codigo, comprobar la rama con `git branch --show-current`.
2. `main` esta protegida: nunca push directo. Todo cambio va en una rama `<tipo>/<descripcion-en-espanol>` (ej: `feature/reservas-publicas`) y se fusiona por Pull Request tras pasar CI.
3. Prohibido ejecutar `git commit`, `git push` o crear PR por iniciativa propia. Si el usuario lo ordena en un mensaje concreto, la autorizacion vale solo para esa accion y ese momento; no se arrastra a turnos posteriores.
4. Commits y ramas en espanol. Formato `<tipo>(<ambito>): <descripcion concisa>` o `<tipo>: <descripcion concisa>`. Sin version en el titulo.
5. Titulo y descripcion de PR en espanol, mismo formato convencional, sin prefijo `WIP:`.

### Estilo

6. Prohibidos los emojis en cualquier contexto. Estilo sobrio y tecnico.
7. Para crear o editar ficheros usar solo las herramientas nativas de edicion (Edit, Write). Bash queda para tests, linters, git y comandos de sistema.

### Versionado

8. Todo PR con funcionalidad (minor), correccion (patch) o cambio estructural (major) incrementa la version SemVer en `package.json` (fuente de verdad, unico sitio) y anade una seccion en `CHANGELOG.md` (formato Keep a Changelog). El workflow de despliegue lee la version de `package.json` para etiquetar las imagenes.

### Secretos

9. Nunca imprimir ni copiar `.env`, secretos ni tokens a la conversacion, a ficheros versionados o a logs. Si aparece uno en claro, avisar.

### Calidad

10. Verificar antes de afirmar: ejecutar el comando real y citar el resultado; si no se pudo verificar, decirlo.
11. Los tests deben comprobar la regla de negocio, no el comportamiento actual. Valor esperado derivado de la regla, nunca cambiar un assert solo para que pase.
12. Si un test falla, diagnosticar la causa antes de reintentar. Prohibido saltarse o desactivar tests para poner CI en verde.
13. No sobredisenar: algo entra en la plantilla solo si lo han usado dos apps reales.
