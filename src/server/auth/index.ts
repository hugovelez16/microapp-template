import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getConfig } from "@/server/config";
import { getDb } from "@/server/db/client";
import * as schema from "@/server/db/schema";

function createAuth() {
  const config = getConfig();
  return betterAuth({
    baseURL: config.BETTER_AUTH_URL,
    secret: config.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    emailAndPassword: {
      enabled: true,
      // Las cuentas de personal las crea el administrador; no hay registro abierto.
      disableSignUp: true,
    },
    user: {
      additionalFields: {
        role: { type: "string", required: false, defaultValue: "worker", input: false },
      },
    },
    plugins: [nextCookies()],
  });
}

let cached: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  cached ??= createAuth();
  return cached;
}
