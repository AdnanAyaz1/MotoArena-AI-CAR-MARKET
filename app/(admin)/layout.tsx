import React from "react";

import { getUser } from "@/actions/getUser";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { Sidebar } from "./components/Sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser({ protectedRoute: true });
  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header user={user} isAdminPage={true} />
      <Sidebar />
      <main className="md:pl-64 pt-24 pb-12 min-h-screen">{children}</main>
    </div>
  );
};

export default layout;
