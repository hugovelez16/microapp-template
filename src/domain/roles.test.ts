import { describe, expect, it } from "vitest";
import { hasAnyRole, isRole } from "./roles";

describe("isRole", () => {
  it("acepta solo los roles definidos", () => {
    expect(isRole("admin")).toBe(true);
    expect(isRole("worker")).toBe(true);
    expect(isRole("trabajador")).toBe(false);
    expect(isRole(undefined)).toBe(false);
  });
});

describe("hasAnyRole", () => {
  it("el trabajador solo accede a lo permitido al trabajador", () => {
    expect(hasAnyRole("worker", ["worker"])).toBe(true);
    expect(hasAnyRole("worker", ["admin"])).toBe(false);
  });

  it("el administrador accede a todo", () => {
    expect(hasAnyRole("admin", ["worker"])).toBe(true);
    expect(hasAnyRole("admin", ["admin"])).toBe(true);
  });

  it("un rol desconocido nunca accede", () => {
    expect(hasAnyRole("guest", ["worker", "admin"])).toBe(false);
    expect(hasAnyRole(null, ["worker"])).toBe(false);
  });
});
