import React from "react";

export function Footer() {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
      }}
    >
      <div style={{ margin: '0 10px' }}>
        {/* GitHub Link with Logo */}
        <a
          href="https://github.com/jll38/njitbytes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#333',
            textDecoration: 'none',
          }}
        >
          <img
            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            alt="GitHub Logo"
            style={{ width: '24px', height: '24px', marginRight: '5px' }}
          />
          Our GitHub
        </a>
      </div>
      <div style={{ margin: '0 10px', color: '#333' }}>|</div>
      <div>
        {/* Contributors Page Link */}
        <a
          href="/contributors"
          style={{ color: '#333', textDecoration: 'none' }}
        >
          Our Contributors
        </a>
      </div>
    </footer>
  );
}
