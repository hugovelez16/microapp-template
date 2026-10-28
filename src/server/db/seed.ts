import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";
import { createDatabase } from "./client";
import { account, user } from "./schema";
import { parseConfig } from "@/server/config";

const config = parseConfig(process.env);
const { db, client } = createDatabase(config.DATABASE_URL);

try {
  if (!config.INITIAL_ADMIN_EMAIL || !config.INITIAL_ADMIN_PASSWORD) {
    console.log("INITIAL_ADMIN_EMAIL e INITIAL_ADMIN_PASSWORD no definidos: no se crea administrador.");
  } else {
    const email = config.INITIAL_ADMIN_EMAIL.toLowerCase();
    const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, email));
    if (existing.length > 0) {
      console.log("El administrador inicial ya existe.");
    } else {
      const userId = randomUUID();
      await db.transaction(async (tx) => {
        await tx
          .insert(user)
          .values({ id: userId, name: "Administrador", email, role: "admin", emailVerified: true });
        await tx.insert(account).values({
          id: randomUUID(),
          accountId: userId,
          providerId: "credential",
          userId,
          password: await hashPassword(config.INITIAL_ADMIN_PASSWORD!),
        });
      });
      console.log("Administrador inicial creado.");
    }
  }
} finally {
  await client.end();
}
