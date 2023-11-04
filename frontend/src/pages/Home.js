import React from "react";
import Form from "../components/questions/Form";
import { Button } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/footer";
export function Home({ quizStatus, setQuizStatus }) {
  return (
    <div>
      <div className="p-[4rem pt-[16rem] h-screen w-full flex flex-col justify-center items-center">
        <Logo/>
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

     <Footer/>
    </div>
  );
}
