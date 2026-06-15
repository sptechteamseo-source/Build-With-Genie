import { UserForm } from "@/components/admin/UserForm";

export const metadata = { title: "Add User" };

export default function NewUserPage() {
  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Add User</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-2, #888)" }}>Create a new team member account</p>
      </div>
      <UserForm />
    </div>
  );
}
