import { RenderMeals } from "./../components/RenderMeals";
import { Footer } from "./../components/footer";
import { Logo } from "./../components/Logo";
import React from "react";
import { bruh, bruh_lunch } from "../tmp";
import { Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import { useState, useEffect } from "react";
import { getDailyCals } from "../utils/macros";

export function Menu({}) {
  useEffect(() => {
    if (localStorage.getItem("byte_quizStatus") === null)
      window.location.assign("/");
  });

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <div>
      <div className="p-[1rem] sm:p-[4rem] h-screen w-full flex flex-col items-center">
        <Logo/>
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
              <RenderMeals meal={bruh} />
            </TabPanel>
            <TabPanel value={1}>
              <RenderMeals meal={bruh_lunch} />
            </TabPanel>
            <TabPanel value={2}>
              <b>Third</b> tab panel
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
