import React from "react";
import Form from "../components/questions/Form";
import { Button } from "@mui/joy";
export function Home({ quizStatus, setQuizStatus }) {
  return (
    <div>
      <div className="p-[4rem] h-screen w-full flex flex-col justify-center items-center">
        <div className="absolute top-[3rem]">
          <div id="logo" className="flex flex-col items-center leading-10 ">
            <h1>NJITBytes</h1>
            <div>Healthier College Living</div>
          </div>
        </div>

        {quizStatus ? (
          <div>Finished</div>
        ) : (
          <Form setQuizStatus={setQuizStatus} />
        )}
        <Button
          variant="soft"
          color="primary"
          bgColor="primary"
          onClick={() => {
            window.location.assign("/menu");
          }}
        >
          View Menu
        </Button>
      </div>

      <div
        id="footer"
        className="h-[6rem] bg-primary w-full absolute bottom-0 flex justify-center items-center"
      >
        <div className="text">HackNJIT 2023 - Team Phi Sig</div>
      </div>
    </div>
  );
}
