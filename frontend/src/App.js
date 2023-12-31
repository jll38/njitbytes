import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { CaloricInfo } from "./pages/CaloricInfo";
import { Settings } from "./pages/Settings";
import { EditProfile } from "./pages/settings/edit-profile";
import { FavoriteItemsPage } from "./pages/settings/FavoriteMenuItems";
import { Contributors } from "./pages/Contributor";
import { Play } from "./pages/Play";
import { Meals } from "./pages/Meals";
import "./App.scss";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import { useState} from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
          destructive: {
            main: "#bf0a30",
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
          destructive: {
            main: "#bf0a30",
          },
        },
      },
    },
  });

  return (
    <CssVarsProvider theme={theme}>
      <header className="App-header">
        <link rel="manifest" href="/manifest.json" />
      </header>
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
            <Route path="menu/favorites" element={<FavoriteItemsPage />} />
            <Route path="settings/edit-profile" element={<EditProfile />} />
            <Route path="meals" element={<Meals />} />
            <Route path="caloric-information" element={<CaloricInfo />} />
            <Route path="contributors" element={<Contributors />} />
            <Route path="play" element={<Play />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
