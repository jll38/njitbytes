import React from "react";

export function Footer() {
  return (
    <footer
  style={{
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    padding: "10px",
    margin: "10px 0", // Add margin to the top to create space under the footer
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
  }}
>
      <div style={{ margin: "0 10px" }}>
        {/* GitHub Link with Logo */}
        <a
          href="https://github.com/jll38/njitbytes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#333",
            textDecoration: "none",
          }}
        >
          <img
            src='/images/github_logo.png'
            alt="GitHub Logo"
            style={{ width: "24px", height: "24px", marginRight: "0.4rem" }}
          />
          Our GitHub
        </a>
      </div>
      <div style={{ margin: "0 5px", color: "#333" }}>|</div>
      <div style={{ margin: "0 10px" }}>
        {/* Contributors Page Link */}
        <a
          href="/contributors"
          style={{ color: "#333", textDecoration: "none" }}
        >
          Our Contributors
        </a>
      </div>
    </footer>
  );
}
