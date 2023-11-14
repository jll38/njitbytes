import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Menu } from "./Menu";

export function Settings() {
    if(localStorage.getItem("byte_quizStatus") === null) window.location.assign('/');
  return (
    localStorage.getItem("byte_quizStatus") !== null ?
    <div>
      <div
        className="p-[4rem 
        h-screen w-full flex flex-col justify-center items-center gap-6"
      >
        <Logo />

        <div className="flex justify-center gap-4">
        <Button
            variant="soft"
            className="h-[8rem] w-[8rem] flex flex-col"
            onClick={() => {
                window.location.assign("/");
            }}
            sx={{
              color: "text",
            }}
          >
            <PersonIcon style={{ fontSize: "48px" }} />
            <div
            >
              Edit Profile
            </div>
          </Button>
          <Button
            variant="soft"
            className="h-[8rem] w-[8rem] flex flex-col"
            onClick={() => {
              window.location.assign("/menu/favorites");
            }}
            sx={{
              color: "text",
            }}
          >
            <FavoriteIcon style={{ fontSize: "48px" }} />
            <div
            >
              Favorite <br/>Menu Items
            </div>
          </Button>
          <Button
            variant="soft"
            className="h-[8rem] w-[8rem] flex flex-col"
            onClick={() => {
              window.location.assign("/");
              localStorage.clear();
            }}
            sx={{
              color: "text",
            }}
          >
            <SettingsIcon style={{ fontSize: "48px" }} />
            <div
            >
              Erase User Information
            </div>
          </Button>
        </div>
      </div>
      
      <Footer />


    </div> : <></>
  );
}
