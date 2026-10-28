import { z } from "zod";

const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET debe tener al menos 32 caracteres"),
  BETTER_AUTH_URL: z.string().url(),
  INITIAL_ADMIN_EMAIL: z.string().email().optional(),
  INITIAL_ADMIN_PASSWORD: z.string().min(12).optional(),
});

export type AppConfig = z.infer<typeof configSchema>;

export function parseConfig(env: Record<string, string | undefined>): AppConfig {
  const result = configSchema.safeParse(env);
  if (!result.success) {
    const detail = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Configuracion invalida: ${detail}`);
  }
  return result.data;
}

let cached: AppConfig | undefined;

/** Lectura perezosa: el build de Next no necesita variables de entorno. */
export function getConfig(): AppConfig {
  cached ??= parseConfig(process.env);
  return cached;
}
