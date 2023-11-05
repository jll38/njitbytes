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

  return (
    localStorage.getItem("byte_quizStatus") !== null ? (<div>
        <div className="p-[4rem] h-screen w-full flex flex-col justify-center items-center">
          <Logo />
          <div className="mt-[20rem] w-full flex flex-col items-center justify-center">
          <div className="mb-[1rem]">Your recommended caloric intake is: {getDailyCals().totalCals} calories</div>
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
                <h2>{bruh[0]}</h2>
                <div className="flex flex-col gap-[.4rem]">
                  {bruh[1].map((section, i) => {
                    return (
                      <>
                        <h3 key={"breakfast-section-" + i}>
                          {section.name[-1] === "."
                            ? section.name.slice(0, -1)
                            : section.name}
                        </h3>
                        <ul className="md:pl-[4em] flex flex-col gap-2">
                          {bruh[1][i].items.map((section, i) => {
                            return (
                              <li>
                                <div className="flex md:flex-row flex-col justify-between">
                                  <div>{section["Item Name"]}</div>
                                  <div className="flex gap-4">
                                    <div>{section["Calories"]} Cal</div>
                                    <div>{}g Protein</div>
                                    <div>{}g Carb</div>
                                    <div>{}g Fat</div>
                                  </div>
                                </div>
                                <div className="text-[.75em] opacity-75">
                                  Serving Size: {section["Portion"]}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel value={1}>
                <h2>{bruh_lunch[0]}</h2>
                <div className="flex flex-col gap-[.4rem]">
                  {bruh_lunch[1].map((section, i) => {
                    return (
                      <>
                        <h3 key={"lunch-section-" + i}>
                          {section.name[-1] === "."
                            ? section.name.slice(0, -1)
                            : section.name}
                        </h3>
                        <ul className="md:pl-[4em] flex flex-col gap-2">
                          {bruh_lunch[1][i].items.map((section, i) => {
                            return (
                              <li>
                                <div className="flex md:flex-row flex-col justify-between">
                                  <div>{section["Item Name"]}</div>
                                  <div className="flex gap-4">
                                    <div>{section["Calories"]} Cal</div>
                                    <div>{}g Protein</div>
                                    <div>{}g Carb</div>
                                    <div>{}g Fat</div>
                                  </div>
                                </div>
                                <div className="text-[.75em] opacity-75">
                                  Serving Size: {section["Portion"]}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel value={2}>
                <b>Third</b> tab panel
              </TabPanel>
            </Tabs>
          </div>
        </div>
  
        <Footer />
      </div>) : <div></div>
    
  );
}
