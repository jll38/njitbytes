import React from "react";
import { Footer } from "../components/Footer";

const Layout = ({ children }) => {
  const isMobile = window.innerWidth <= 600;
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <div
        id="content"
        style={{
          maxWidth: isMobile ? "100%" : "600px",
          width: "100%",
          margin: "auto",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};


export default Layout;