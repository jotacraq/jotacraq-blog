import { AdminNavbar } from "@/features/admin/components/admin-navbar";
import { PostEditor } from "@/features/admin/components/post-editor";

export default function AdminPostarPage() {
  return (
    <>
      <AdminNavbar />
      <main style={{ margin: "0 auto", maxWidth: "1024px", padding: "40px 16px 72px" }}>
        <header>
          <h1 style={{ fontSize: "40px", margin: 0 }}>Postar</h1>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0" }}>
            Preencha os campos para gerar um arquivo MDX valido, copie o resultado e publique via
            commit.
          </p>
        </header>
        <PostEditor />
      </main>
    </>
  );
}
