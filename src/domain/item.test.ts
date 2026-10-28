import { describe, expect, it } from "vitest";
import { isItemStatus, nextStatus, normalizeItemName } from "./item";

describe("normalizeItemName", () => {
  it("recorta y colapsa espacios", () => {
    expect(normalizeItemName("  Revisar   chalecos  ")).toBe("Revisar chalecos");
  });

  it("devuelve cadena vacia si solo hay espacios", () => {
    expect(normalizeItemName("   ")).toBe("");
  });
});

describe("nextStatus", () => {
  it("alterna entre pendiente y hecho", () => {
    expect(nextStatus("pending")).toBe("done");
    expect(nextStatus("done")).toBe("pending");
  });
});

describe("isItemStatus", () => {
  it("rechaza valores fuera del catalogo", () => {
    expect(isItemStatus("pending")).toBe(true);
    expect(isItemStatus("cancelled")).toBe(false);
  });
});
