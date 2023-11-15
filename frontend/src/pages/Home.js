import React from "react";
import Form from "../components/questions/Form";
import { Button, Box } from "@mui/joy";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menu } from "./Menu";

export function Home({ quizStatus, setQuizStatus }) {
  return (
    <div>


  <div className={`p-8 ${quizStatus ? '' : 'gap-24'} h-screen w-full flex flex-col items-center`}>
        <Logo />

        {quizStatus ? (
          <div className="text-center">
            <div className="leading-10 mt-8">
              <h2>Welcome back, {JSON.parse(localStorage.getItem('byte_name'))}</h2>
              <div className="text-lg">What would you like to do?</div>
            </div>

            <div className="flex justify-center gap-8 mt-8">
              <Button
                variant="contained"
                className="h-32 w-32 sm:h-40 sm:w-40 flex flex-col"
                onClick={() => window.location.assign('/menu')}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <MenuBookIcon style={{ fontSize: '2rem' }} />
                <div className="text-sm mt-2">View Menu</div>
              </Button>

              <Button
                variant="contained"
                className="h-32 w-32 sm:h-40 sm:w-40 flex flex-col"
                onClick={() => window.location.assign('/meals')}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <SmartToyIcon style={{ fontSize: '2rem' }} />
                <div className="text-sm mt-2">AI Meal Prep</div>
              </Button>

              <Button
                variant="contained"
                className="h-32 w-32 sm:h-40 sm:w-40 flex flex-col"
                onClick={() => window.location.assign('/settings')}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <SettingsIcon style={{ fontSize: '2rem' }} />
                <div className="text-sm mt-2">Settings</div>
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
