import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/footer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menu } from "./Menu";

export function Home({ quizStatus, setQuizStatus }) {
  return (
    <div>
      <div
        className={`p-[4rem ${
          quizStatus ? "pt-[4rem]" : "pt-[16rem]"
        } h-screen w-full flex flex-col justify-center items-center`}
      >
        <Logo />
        {quizStatus ? (
          <div className="text-center">
            <div className="leading-10">
              <h2>Welcome back, {JSON.parse(localStorage.getItem("byte_name"))}</h2>
              <div className="text-[1.25em]">What would you like to do?</div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="soft"
                className="h-[8rem] w-[8rem] flex flex-col"
                onClick={() => {
                  window.location.assign("/menu")
                }}
                sx={{
                  color: "text",
                }}
              >
                <MenuBookIcon style={{ fontSize: "48px" }} />
                <div>View Menu</div>
              </Button>
              <Button
                variant="soft"
                className="h-[8rem] w-[8rem] flex flex-col"
                sx={{
                  color: "text",
                }}
              >
                <SmartToyIcon style={{ fontSize: "48px" }} />
                <div>AI Meal Prep</div>
              </Button>
              <Button
                variant="soft"
                className="h-[8rem] w-[8rem] flex flex-col"
                onClick={() => {
                  window.location.assign("/settings")
                }}
                sx={{
                  color: "text",
                }}
              >
                <SettingsIcon style={{ fontSize: "48px" }} />
                <div>Settings</div>
              </Button>
            </div>
          </div>
        ) : (
          <Form setQuizStatus={setQuizStatus} />
        )}
      </div>

      <Footer />
    </div>
  );
}
