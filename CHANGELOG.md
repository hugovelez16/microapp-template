# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado semantico.

## [0.1.0] - 2026-10-28

### Anadido

- Base de la plantilla: Next.js (App Router) con TypeScript estricto, PostgreSQL con Drizzle y autenticacion con Better Auth (roles `admin` y `worker`, sin registro abierto).
- Modulo de ejemplo `items` con server actions, validacion Zod y logica de dominio con tests.
- Interfaz mobile-first, manifiesto PWA, zona publica, login y zona privada.
- Endpoints `api/health` y `api/ready`.
- Tests unitarios (Vitest) y e2e en viewport movil (Playwright).
- Dockerfile multi-etapa (imagenes `app` y `tools`), compose de desarrollo y produccion, scripts `bin/`.
- Workflows de CI y de despliegue a GHCR y Komodo.
- `CLAUDE.md` con las reglas de trabajo para agentes.
