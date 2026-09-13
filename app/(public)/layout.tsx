import React from "react";

import Footer from "@/components/Footer";
import SessionHeader from "@/components/SessionHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SessionHeader />
      <section className="flex-1">{children}</section>
      <Footer />
    </div>
  );
};

export default layout;