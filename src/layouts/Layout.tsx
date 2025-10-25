import React from "react";
import background from "../assets/images/background.jpg";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        className="relative min-h-screen w-screen bg-cover bg-center p-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${background})`,
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
