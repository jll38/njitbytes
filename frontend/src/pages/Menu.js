import { RenderMeals } from "./../components/RenderMeals";
import { Footer } from "./../components/footer";
import { Logo } from "./../components/Logo";
import axios from "axios";
import React from "react";
import { bruh, bruh_lunch } from "../tmp";
import { Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import { useState, useEffect } from "react";
import { getDailyCals } from "../utils/macros";

export function Menu({}) {
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("byte_quizStatus") === null)
      window.location.assign("/");
  });

  useEffect(() => {
    let url;
    if (process.env.REACT_APP_ENV === "development") {
      url = "https://corsproxy.io/?https://njitbytes.co/api/breakfast";
    } else {
      url = "https://njitbytes.co/api/breakfast";
    }
    axios
      .get(url, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME, // This should be your basic auth username
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD, // This should be your basic auth password
        },
      })
      .then((response) => {
        const res = response.data;
        setBreakfast(res)
      })
      .catch((error) => {
        console.log(error);

      });
  }, []);

  useEffect(() => {
    let url;
    if (process.env.REACT_APP_ENV === "development") {
      url = "https://corsproxy.io/?https://njitbytes.co/api/lunch";
    } else {
      url = "https://njitbytes.co/api/lunch";
    }
    axios
      .get(url, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME, // This should be your basic auth username
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD, // This should be your basic auth password
        },
      })
      .then((response) => {
        const res = response.data;
        setLunch(res)
      })
      .catch((error) => {
        console.log(error);

      });
  }, []);

  useEffect(() => {
    let url;
    if (process.env.REACT_APP_ENV === "development") {
      url = "https://corsproxy.io/?https://njitbytes.co/api/dinner";
    } else {
      url = "https://njitbytes.co/api/dinner";
    }
    axios
      .get(url, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME, // This should be your basic auth username
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD, // This should be your basic auth password
        },
      })
      .then((response) => {
        const res = response.data;
        setDinner(res)
      })
      .catch((error) => {
        console.log(error);

      });
  }, []);

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <div>
      <div className="p-[1rem] sm:p-[4rem] h-screen w-full flex flex-col items-center">
        <Logo />
        <div className="mt-[20rem] sm:mt-[12rem]"></div>
        <div className="sm:mt-[5rem] w-full flex flex-col items-center justify-center">
          <div className="mb-[1rem] text-center text-[.85em]">
            Your recommended caloric intake is: {getDailyCals().totalCals}{" "}
            calories
          </div>
          <Tabs
            aria-label="Basic tabs"
            defaultValue={0}
            size="lg"
            className="w-full md:w-[75%] h-[35rem] "
            orientation="horizontal"
            sx={{ backgroundColor: "white" }}
          >
            <TabList className="flex justify-center">
              <Tab sx={{ color: "#3F4E58" }}>Breakfast</Tab>
              <Tab sx={{ color: "#3F4E58" }}>Lunch</Tab>
              <Tab sx={{ color: "#3F4E58" }}>Dinner</Tab>
            </TabList>
            <TabPanel value={0}>
                {breakfast && <RenderMeals meal={breakfast} />}
            </TabPanel>
            <TabPanel value={1}>
              {lunch && <RenderMeals meal={lunch} />}
            </TabPanel>
            <TabPanel value={2}>
              {dinner && <RenderMeals meal={dinner} />}
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div></div>
  );
}
