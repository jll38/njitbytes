import React from "react";
import { Button, Box } from "@mui/joy";
import { Logo } from "../../components/Logo";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from '@mui/icons-material/Person';


export function EditProfile() {
    if(localStorage.getItem("byte_quizStatus") === null) window.location.assign('/');
  return (
    localStorage.getItem("byte_quizStatus") !== null ?
    <div>
      <div
        className="p-[4rem 
        h-screen w-full flex flex-col justify-center items-center"
      >
        <Logo />
        <h2 className="sm:mt-[4rem] md:mt-[6rem]">Edit Profile</h2>
        <div className="flex justify-center gap-4">
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
    </div> : <></>
  );
}
