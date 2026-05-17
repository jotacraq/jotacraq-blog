import { afterEach, describe, expect, it } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getAuthorProfile } from "./author";

const authorPath = path.join(process.cwd(), "content", "author.mdx");
let originalAuthorFile: string | null = null;

afterEach(async () => {
  if (originalAuthorFile === null) {
    return;
  }

  await fs.writeFile(authorPath, originalAuthorFile, "utf8");
  originalAuthorFile = null;
});

describe("author library", () => {
  it("loads author profile from content/author.mdx with trimmed content body", async () => {
    const profile = await getAuthorProfile();

    expect(profile).toMatchObject({
      name: "Jotacraq",
      headline: "Desenvolvedor compartilhando ideias, estudos e registros de construcao.",
      githubUrl: "https://github.com/jotacraq",
      location: "Brasil",
      interests: ["desenvolvimento", "produto", "escrita"],
    });
    expect(profile.content).toBe(
      "Sou um autor em construcao, usando este espaco para publicar artigos, aprendizados e pensamentos sobre tecnologia."
    );
  });

  it("throws clear error when a required field is missing", async () => {
    originalAuthorFile = await fs.readFile(authorPath, "utf8");
    await fs.writeFile(
      authorPath,
      `---
name: "Jotacraq"
headline: "Headline"
location: "Brasil"
interests:
  - desenvolvimento
---

Conteudo
`,
      "utf8"
    );

    await expect(getAuthorProfile()).rejects.toThrow(
      'Invalid author frontmatter in "author.mdx": "githubUrl" is required.'
    );
  });

  it("throws clear error when interests is empty", async () => {
    originalAuthorFile = await fs.readFile(authorPath, "utf8");
    await fs.writeFile(
      authorPath,
      `---
name: "Jotacraq"
headline: "Headline"
githubUrl: "https://github.com/jotacraq"
location: "Brasil"
interests: []
---

Conteudo
`,
      "utf8"
    );

    await expect(getAuthorProfile()).rejects.toThrow(
      'Invalid author frontmatter in "author.mdx": "interests" must be a non-empty string array.'
    );
  });
});
