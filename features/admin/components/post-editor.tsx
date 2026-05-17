"use client";

import { useMemo, useState } from "react";
import {
  generateArticleMdx,
  getSuggestedFilename,
  validateArticleDraft,
} from "@/features/admin/lib/mdx-generator";
import type { ArticleDraft } from "@/features/admin/types";

type ArticleDraftInput = ArticleDraft;

const initialDraft: ArticleDraftInput = {
  title: "",
  subtitle: "",
  slug: "",
  publishedAt: "",
  excerpt: "",
  tags: "",
  content: "",
};

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: "8px",
  font: "inherit",
  padding: "10px 12px",
  width: "100%",
};

const fieldLabelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: "6px",
};

function ErrorMessage({ children }: { children?: string }) {
  if (!children) return null;

  return <p style={{ color: "#c0392b", margin: "6px 0 0" }}>{children}</p>;
}

export function PostEditor() {
  const [draft, setDraft] = useState<ArticleDraftInput>(initialDraft);
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  const validation = useMemo(() => validateArticleDraft(draft), [draft]);
  const generatedMdx = useMemo(
    () => (validation.isValid ? generateArticleMdx(draft) : ""),
    [draft, validation.isValid]
  );
  const suggestedFilename = useMemo(() => getSuggestedFilename(draft), [draft]);

  function updateField(field: keyof ArticleDraftInput, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setCopyState("idle");
  }

  async function handleCopy() {
    if (!validation.isValid) return;

    try {
      await navigator.clipboard.writeText(generatedMdx);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section
      aria-label="Editor de artigo"
      style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr", marginTop: "24px" }}
    >
      <div style={{ display: "grid", gap: "14px" }}>
        <div>
          <label htmlFor="article-title" style={fieldLabelStyle}>
            Titulo
          </label>
          <input
            id="article-title"
            onChange={(event) => updateField("title", event.target.value)}
            style={inputStyle}
            type="text"
            value={draft.title}
          />
          <ErrorMessage>{validation.errors.title}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="article-subtitle" style={fieldLabelStyle}>
            Subtitulo
          </label>
          <input
            id="article-subtitle"
            onChange={(event) => updateField("subtitle", event.target.value)}
            style={inputStyle}
            type="text"
            value={draft.subtitle}
          />
          <ErrorMessage>{validation.errors.subtitle}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="article-slug" style={fieldLabelStyle}>
            Slug
          </label>
          <input
            id="article-slug"
            onChange={(event) => updateField("slug", event.target.value)}
            style={inputStyle}
            type="text"
            value={draft.slug}
          />
          <ErrorMessage>{validation.errors.slug}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="article-published-at" style={fieldLabelStyle}>
            Data de publicacao
          </label>
          <input
            id="article-published-at"
            onChange={(event) => updateField("publishedAt", event.target.value)}
            placeholder="YYYY-MM-DD"
            style={inputStyle}
            type="text"
            value={draft.publishedAt}
          />
          <ErrorMessage>{validation.errors.publishedAt}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="article-excerpt" style={fieldLabelStyle}>
            Resumo
          </label>
          <textarea
            id="article-excerpt"
            onChange={(event) => updateField("excerpt", event.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            value={draft.excerpt}
          />
          <ErrorMessage>{validation.errors.excerpt}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="article-tags" style={fieldLabelStyle}>
            Tags (separadas por virgula)
          </label>
          <input
            id="article-tags"
            onChange={(event) => updateField("tags", event.target.value)}
            style={inputStyle}
            type="text"
            value={draft.tags}
          />
        </div>

        <div>
          <label htmlFor="article-content" style={fieldLabelStyle}>
            Conteudo
          </label>
          <textarea
            id="article-content"
            onChange={(event) => updateField("content", event.target.value)}
            rows={14}
            style={{ ...inputStyle, resize: "vertical" }}
            value={draft.content}
          />
          <ErrorMessage>{validation.errors.content}</ErrorMessage>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Nome sugerido:</strong> <code>{suggestedFilename}</code>
        </p>
        <button
          disabled={!validation.isValid}
          onClick={handleCopy}
          style={{ cursor: validation.isValid ? "pointer" : "not-allowed", marginBottom: "10px" }}
          type="button"
        >
          Copiar MDX
        </button>
        {copyState === "success" ? <p style={{ margin: "0 0 10px" }}>MDX copiado.</p> : null}
        {copyState === "error" ? (
          <p style={{ color: "#c0392b", margin: "0 0 10px" }}>Nao foi possivel copiar o MDX.</p>
        ) : null}

        {validation.isValid ? (
          <>
            <h2 style={{ margin: "8px 0" }}>Preview MDX</h2>
            <pre
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                margin: 0,
                overflowX: "auto",
                padding: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {generatedMdx}
            </pre>
          </>
        ) : (
          <p style={{ color: "var(--muted)", margin: "10px 0 0" }}>
            Preencha os campos obrigatorios para gerar o preview do MDX.
          </p>
        )}
      </div>
    </section>
  );
}
