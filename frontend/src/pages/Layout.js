import React from "react";
import { Footer } from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
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