import logo from "./logo.svg";
import "./App.scss";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import { Button } from "@mui/joy";
import { useState, useEffect } from "react";
import PageOne from "./components/questions/Form";
import Form from "./components/questions/Form";

function App() {
  //True is complete, False is incomplete
  const [quizStatus, setQuizStatus] = useState(
    localStorage.getItem("byte_quizStatus") !== null ? true : false
  );
  
    console.log(quizStatus);
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: "#89aabd",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: "#89aabd",
          },
        },
      },
    },
  });

  return (
    <CssVarsProvider theme={theme}>
      <div>
        <header className="App-header"></header>
        <div className="p-[4rem] h-screen w-full flex flex-col justify-center items-center">
          <div className="absolute top-[3rem]">
            <div id="logo" className="flex flex-col items-center leading-10 ">
              <h1>NJITBytes</h1>
              <div>Healthier College Living</div>
            </div>
          </div>

          {quizStatus ? <div>Finished</div> : <Form setQuizStatus={setQuizStatus} />}
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
    </CssVarsProvider>
  );
}

export default App;
