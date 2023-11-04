import logo from "./logo.svg";
import "./App.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Button } from "@mui/material";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7391a1",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <header className="App-header"></header>
        <div className="p-[4rem] h-screen w-full flex justify-center items-center">
        <div id="logo" className="flex flex-col items-center leading-10">
            <h1>NJITBytes</h1>
            <div>Healthier College Living</div>
          </div>
        </div>
        <Button variant="contained" color="primary">
            GET STARTED
          </Button>
        <div
          id="footer"
          className="h-[8rem] bg-primary w-full absolute bottom-0 flex justify-center items-center"
        >
          <div className="text">HackNJIT 2023 - Team Phi Sig</div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
