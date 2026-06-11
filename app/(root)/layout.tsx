import React from "react";

import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWrapper />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  );
};

export default layout;
