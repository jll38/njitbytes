import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";

export function Home({ quizStatus, setQuizStatus }) {
  const isMobile = window.innerWidth <= 600;
  const handStyle = {
    display: 'inline-block',
    animation: 'wave 2s infinite',
    transformOrigin: '70% 70%',
  };

  const keyframes = `
    @keyframes wave {
      0%, 100% {
        transform: rotate(0deg);
      }
      20% {
        transform: rotate(-10deg);
      }
      40% {
        transform: rotate(10deg);
      }
      60% {
        transform: rotate(-10deg);
      }
      80% {
        transform: rotate(10deg);
      }
    }
  `;

  return (
    <div style={{
      padding: '1%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      justifyContent: 'center',
      paddingBottom: '10%',
    }}>
      <Logo />

      {quizStatus ? (
        <div style={{ textAlign: 'center', marginTop: '2%', width: '80%' }}>
          <div style={{ fontSize: '1.8rem', marginTop: '2%', textAlign: 'center', margin: 'auto' }}>
            Welcome, {JSON.parse(localStorage.getItem("byte_name"))}
            <span style={{ marginLeft: '8px' }}>
              <style>{keyframes}</style>
              <span role="img" aria-label="Waving Hand" style={handStyle}>
                👋
              </span>
            </span>
          </div>
          <div style={{ fontSize: '1.2rem', marginTop: '1%' }}>What would you like to do?</div>
          <div style={{
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5%',
  gap: '1rem',
}}>
  <Button
    variant="contained"
    style={{
      height: '10vh',
      width: isMobile ? '70vw' : '15vw', // Adjusted width for mobile view
      maxWidth: '225px', // Adjusted max width for desktop view
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s',
      marginBottom: '10px',
    }}
    onClick={() => window.location.assign("/menu")}
    onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
    onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
  >
    <MenuBookIcon style={{ fontSize: '2rem' }} />
    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>View Menu</div>
  </Button>

  <Button
    variant="contained"
    style={{
      height: '10vh',
      width: isMobile ? '70vw' : '15vw',
      maxWidth: '225px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s',
      marginBottom: '10px',
    }}
    onClick={() => window.location.assign("/meals")}
    onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
    onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
  >
    <SmartToyIcon style={{ fontSize: '2rem' }} />
    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>AI Meal Prep</div>
  </Button>

  <Button
    variant="contained"
    style={{
      height: '10vh',
      width: isMobile ? '70vw' : '15vw',
      maxWidth: '225px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s',
      marginBottom: '10px',
    }}
    onClick={() => window.location.assign("/settings")}
    onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
    onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
  >
    <SettingsIcon style={{ fontSize: '2rem' }} />
    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Settings</div>
  </Button>
</div>

        </div>
      ) : (
        <Form setQuizStatus={setQuizStatus} />
      )}

      <Footer />
    </div>
  );
}