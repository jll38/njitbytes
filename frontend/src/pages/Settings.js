import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/footer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menu } from "./Menu";

export function Settings() {
  return (
    <div>
      <div
        className="p-[4rem 
        h-screen w-full flex flex-col justify-center items-center"
      >
        <Logo />
        <h2>Settings</h2>
        <div className="flex justify-center gap-4">
          
          <Button
            variant="soft"
            className="h-[8rem] w-[8rem] flex flex-col"
            onClick={() => {
              window.location.assign("/settings");
            }}
            sx={{
              color: "text",
            }}
          >
            <SettingsIcon style={{ fontSize: "48px" }} />
            <div>Clear</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
