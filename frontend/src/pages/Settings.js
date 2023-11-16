import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Menu } from "./Menu";

export function Settings({}) {
  const isMobile = window.innerWidth <= 600;
  if (localStorage.getItem("byte_quizStatus") === null)
    window.location.assign("/");

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <div
      className={`flex flex-col items-center ${
        isMobile ? "justify-center" : "justify-start"
      } h-screen max-h-screen mt-${isMobile ? 0 : 10}`}
      style={isMobile ? {} : { border: "100px solid transparent" }}
    >
      <Logo />

      {
        <div>
          <div
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              margin: "auto",
              ...(isMobile ? { paddingTop: "5.5%" } : {paddingTop: "1.5%"}),
            }}
          >
            📃Settings
          </div>
          <div
            style={{ textAlign: "center", margin: "auto" }}
            className="text-lg mt-1"
          >
            What would you like to do?
          </div>
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
                width: isMobile ? "70vw" : "50vw",
                maxWidth: isMobile ? "285px" : "350px",
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
                width: isMobile ? "70vw" : "50vw",
                maxWidth: isMobile ? "285px" : "350px",
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
              <DeleteIcon style={{ fontSize: "2rem" }} />
              <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Erase User Information
              </div>
            </Button>
          </div>
        </div>
      }

      <Footer />
    </div>
  ) : (
    <></>
  );
}
