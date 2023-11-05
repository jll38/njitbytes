import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Settings } from "./pages/Settings";
import { EditProfile } from "./pages/settings/edit-profile";
import logo from "./logo.svg";
import "./App.scss";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import { Button } from "@mui/joy";
import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          text: {
            main: "#3f4e58",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: "#89aabd",
          },
          text: {
            main: "#3f4e58",
          },
        },
      },
    },
  });

  return (
    <CssVarsProvider theme={theme}>
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Home quizStatus={quizStatus} setQuizStatus={setQuizStatus} />
              }
            />
            <Route path="menu" element={<Menu />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/edit-profile" element={<EditProfile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
