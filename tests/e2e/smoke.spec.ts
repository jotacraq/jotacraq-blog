import { expect, test } from "@playwright/test";

test("public reading flow works", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Artigos" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Primeiro artigo" })).toBeVisible();
  await expect(page.getByText("Rascunho exemplo")).toHaveCount(0);

  await page.getByRole("button", { name: /tema/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);

  await page.getByRole("link", { name: "Primeiro artigo" }).click();
  await expect(page).toHaveURL(/\/artigos\/primeiro-artigo$/);
  await expect(page.getByRole("heading", { name: "Primeiro artigo" })).toBeVisible();
  await expect(page.getByText("Este e o primeiro artigo do Jotacraq Blog.")).toBeVisible();
});

test("about and admin surfaces render", async ({ page }) => {
  await page.goto("/sobre");
  await expect(page.getByRole("heading", { name: "Jotacraq" })).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toBeVisible();

  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Painel Admin" })).toBeVisible();
  await expect(page.getByText("Publicados")).toBeVisible();
  await expect(page.getByRole("link", { name: "Postar", exact: true })).toBeVisible();
});

test("admin post editor generates mdx", async ({ page }) => {
  await page.goto("/admin/postar");

  await expect(page.getByRole("heading", { name: "Postar" })).toBeVisible();

  await page.getByLabel("Titulo", { exact: true }).fill("Teste E2E");
  await page.getByLabel("Subtitulo", { exact: true }).fill("Subtitulo E2E");
  await page.getByLabel("Slug", { exact: true }).fill("teste-e2e");
  await page.getByLabel("Data de publicacao", { exact: true }).fill("2026-05-17");
  await page.getByLabel("Resumo", { exact: true }).fill("Resumo gerado pelo teste E2E.");
  await page.getByLabel("Tags (separadas por virgula)", { exact: true }).fill("e2e, teste");
  await page
    .getByLabel("Conteudo", { exact: true })
    .fill("Conteudo do artigo gerado durante o smoke E2E.");

  await expect(page.getByText("Preview MDX")).toBeVisible();
  await expect(page.getByText("2026-05-17-teste-e2e.mdx")).toBeVisible();
  await expect(page.getByText('title: "Teste E2E"')).toBeVisible();
});
