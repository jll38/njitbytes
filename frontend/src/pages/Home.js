import React from "react";
import { Button } from "@mui/joy";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";
import Layout from "./Layout";
import { Logo } from "../components/Logo";
import Form from "../components/questions/Form";

export function Home({ quizStatus, setQuizStatus }) {
  const isMobile = window.innerWidth <= 600;
  const handStyle = {
    display: "inline-block",
    animation: "wave 2s infinite",
    transformOrigin: "70% 70%",
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
    <Layout>
      <div
        className={`flex flex-col items-center ${
          isMobile ? "justify-center" : "justify-start"
        } h-screen max-h-screen mt-${isMobile ? 0 : 10}`}
        style={isMobile ? {} : { border: "100px solid transparent" }}
      >
        <Logo />

        {quizStatus ? (
          <div className="text-center mt-2 w-90">
            <div className="text-2xl mt-2">
              Welcome, {JSON.parse(localStorage.getItem("byte_name"))}
              <span style={{ marginLeft: "8px" }}>
                <style>{keyframes}</style>
                <span role="img" aria-label="Waving Hand" style={handStyle}>
                  👋
                </span>
              </span>
            </div>
            <div className="text-lg mt-1">What would you like to do?</div>
            <div
              className={`flex ${
                isMobile ? "flex-col items-center" : "items-center space-x-3"
              } mt-${isMobile ? 5 : 10} space-y-2`}
            >
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  height: "10vh",
                  width: isMobile ? "70vw" : "50vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => window.location.assign("/menu")}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <MenuBookIcon style={{ fontSize: "2rem" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  View Menu
                </div>
              </Button>

              <Button
                variant="contained"
                style={{
                  height: "10vh",
                  width: isMobile ? "70vw" : "50vw",
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => window.location.assign("/meals")}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <SmartToyIcon style={{ fontSize: "2rem" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  AI Meal Prep
                </div>
              </Button>

              <Button
                variant="contained"
                style={{
                  height: "10vh",
                  width: isMobile ? "70vw" : "50vw",
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => window.location.assign("/settings")}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <SettingsIcon style={{ fontSize: "2rem" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Settings
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <Form setQuizStatus={setQuizStatus} />
        )}
      </div>
    </Layout>
  );
}
