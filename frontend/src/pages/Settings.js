import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Layout from "./Layout";
import { Menu } from "./Menu";

export function Settings({}) {
  const isMobile = window.innerWidth <= 600;
  if (localStorage.getItem("byte_quizStatus") === null)
    window.location.assign("/");

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <Layout>
      <div
        className={`flex flex-col items-center justify-${
          isMobile ? "center" : "start"
        } mt-${isMobile ? 0 : 10}`}
        style={isMobile ? {} : { border: "100px solid transparent" }}
      >
        <Logo />
        <div className="text-center mt-2 w-90">
          <div
            className="text-2xl mt-2"
            style={{ marginTop: isMobile ? "0.6rem" : "0.5rem" }}
          >
            📃Settings
          </div>
          <div
            className="text-lg mt-1"
            style={{
              marginBottom: isMobile ? "10%" : "4%",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {""} <br /> {""}
          </div>
          <div
            className={`flex ${
              isMobile ? "flex-col items-center" : "items-center space-x-3"
            } mt-${isMobile ? 10 : 10} space-y-4`}
            style={isMobile ? { marginTop: "3.5rem" } : { marginTop: "4.4rem" }}
          >
            <Button
              variant="contained"
              style={{
                marginTop: isMobile ? "" : "18px",
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
      </div>
    </Layout>
  ) : (
    <></>
  );
}
