import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Menu } from "./Menu";

export function Settings({}) {
  const isMobile = window.innerWidth <= 600;
  if(localStorage.getItem("byte_quizStatus") === null) window.location.assign('/');

  return (
    localStorage.getItem("byte_quizStatus") !== null ?
    <div
      style={{
        padding: "1%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        paddingBottom: "10%",
      }}
    >
      <Logo />

      {(
        <div style={{ textAlign: "center", marginTop: "2%", width: "80%" }}>
          <div
            style={{
              fontSize: "1.8rem",
              marginTop: "2%",
              textAlign: "center",
              margin: "auto",
            }}
          >
            📃Settings
          </div>
          <div style={{ fontSize: "1.2rem", marginTop: "1%" }}>
            What would you like to do?
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              style={{
                height: "10vh",
                width: isMobile ? "70vw" : "15vw", // Adjusted width for mobile view
                maxWidth: "225px", // Adjusted max width for desktop view
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                marginBottom: "10px",
              }}
              onClick={() => {
                window.location.assign("/settings/edit-profile");
            }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <PersonIcon style={{ fontSize: "2rem" }} />
              <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Edit Profile
              </div>
            </Button>

            <Button
              variant="contained"
              style={{
                height: "10vh",
                width: isMobile ? "70vw" : "15vw",
                maxWidth: "225px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                marginBottom: "10px",
              }}
              onClick={() => {
                window.location.assign("/menu/favorites");
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <FavoriteIcon style={{ fontSize: "2rem" }} />
              <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Favorite Menu Items
              </div>
            </Button>

            <Button
              variant="contained"
              style={{
                height: "10vh",
                width: isMobile ? "70vw" : "15vw",
                maxWidth: "225px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                marginBottom: "10px",
              }}
              onClick={() => {
                window.location.assign("/");
                localStorage.clear();
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <SettingsIcon style={{ fontSize: "2rem" }} />
              <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Erase User Information
              </div>
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div> : <></>
  );
}
