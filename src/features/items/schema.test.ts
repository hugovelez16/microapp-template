import { describe, expect, it } from "vitest";
import { createItemSchema } from "./schema";

describe("createItemSchema", () => {
  it("normaliza el nombre", () => {
    const parsed = createItemSchema.parse({ name: "  Hinchar   neumáticos " });
    expect(parsed.name).toBe("Hinchar neumáticos");
  });

  it("rechaza nombres vacios", () => {
    expect(createItemSchema.safeParse({ name: "   " }).success).toBe(false);
  });

  it("rechaza nombres demasiado largos", () => {
    expect(createItemSchema.safeParse({ name: "a".repeat(121) }).success).toBe(false);
  });
});
