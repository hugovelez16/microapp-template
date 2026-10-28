import { describe, expect, it } from "vitest";
import { parseConfig } from "./config";

const valid = {
  DATABASE_URL: "postgresql://app:app@localhost:5432/app",
  BETTER_AUTH_SECRET: "x".repeat(32),
  BETTER_AUTH_URL: "http://localhost:3000",
};

describe("parseConfig", () => {
  it("acepta una configuracion valida", () => {
    expect(parseConfig(valid).DATABASE_URL).toBe(valid.DATABASE_URL);
  });

  it("falla si el secreto es demasiado corto", () => {
    expect(() => parseConfig({ ...valid, BETTER_AUTH_SECRET: "corto" })).toThrow(/BETTER_AUTH_SECRET/);
  });

  it("falla si falta la URL de la base de datos", () => {
    expect(() => parseConfig({ ...valid, DATABASE_URL: undefined })).toThrow(/DATABASE_URL/);
  });
});
