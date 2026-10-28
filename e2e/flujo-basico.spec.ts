import { expect, test } from "@playwright/test";

const email = process.env.INITIAL_ADMIN_EMAIL ?? "admin@example.com";
const password = process.env.INITIAL_ADMIN_PASSWORD ?? "cambia-esta-clave-123";

test("la zona publica carga sin sesion", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Micro app" })).toBeVisible();
});

test("la zona privada redirige al login sin sesion", async ({ page }) => {
  await page.goto("/items");
  await expect(page).toHaveURL(/\/login$/);
});

test("el personal inicia sesion y crea un elemento", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/items$/);

  const name = `Elemento ${Date.now()}`;
  await page.getByLabel("Nuevo elemento").fill(name);
  await page.getByRole("button", { name: "Añadir" }).click();
  await expect(page.getByText(name)).toBeVisible();
});

test("credenciales incorrectas muestran un error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill("incorrecta-123456");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText("Correo o contraseña incorrectos")).toBeVisible();
});
