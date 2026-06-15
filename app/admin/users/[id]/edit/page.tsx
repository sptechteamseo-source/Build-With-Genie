import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { UserForm } from "@/components/admin/UserForm";
import type { IAdminUser } from "@/types";

export const metadata = { title: "Edit User" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;
  await connectToDatabase();
  const user = await User.findById(id).lean() as (IAdminUser & { _id: { toString(): string } }) | null;
  if (!user) notFound();

  const serialized: IAdminUser = {
    ...user,
    _id: user._id.toString(),
    createdAt: undefined,
    updatedAt: undefined,
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Edit User</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-2, #888)" }}>{serialized.name}</p>
      </div>
      <UserForm initial={serialized} id={serialized._id} />
    </div>
  );
}
