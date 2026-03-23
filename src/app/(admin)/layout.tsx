import { signOut, auth } from "@/auth";
import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { getAllSettings } from "@/lib/settings";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const settings = await getAllSettings();

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <main className="w-full max-w-md">{children}</main>
      </div>
    );
  }

  const signOutAction = async () => {
    "use server";
    await signOut();
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar signOutAction={signOutAction} settings={settings} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />

        <main className="flex-1 p-4 md:p-6 md:pt-4 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
