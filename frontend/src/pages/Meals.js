import { TextSkeleton } from "./../components/TextSkeleton";
import { Footer } from "../components/Footer";
import { Logo } from "./../components/Logo";
import { getInfo } from "../utils/userinfo";
import { Button } from "@mui/joy";
import React from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Snackbar from "@mui/joy/Snackbar";
import Layout from "./Layout";

import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Select,
  MenuItem,
  Card,
  Skeleton,
  AspectRatio,
  Typography,
} from "@mui/joy";
import { useState, useEffect } from "react";
import { getDailyCals } from "../utils/macros";
import OpenAI from "openai";

export function Meals({}) {
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [loading, setLoading] = useState(false);
  const pieChartOptions = {
    legend: "none",
    pieSliceText: "none",
    pieStartAngle: 135,
    tooltip: { trigger: "hover" },
    width: 100,
    height: 150,

    chartArea: {
      backgroundColor: {
        fill: "#FFFFFF",
        fillOpacity: 0,
      },
    },
    backgroundColor: {
      fill: "#FFFFFF",
      fillOpacity: 0,
    },
    pieHole: 0.75,
    allowHtml: true,
    cssClassNames: {
      tableCell: "pie-chart-box",
    },
  };

  const macros = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };
  const isMobile = window.innerWidth <= 600;
  const loadingMessages = [
    "Thinking...",
    "Looking at the GDS menu...",
    "Taking your preferences into account...",
    "Fetching the perfect meal plan...",
    "Setting the table with options...",
    "Plating up some tasty suggestions...",
    "Pairing flavors with macros...",
    "Calculating calorie counts...",
    "Optimizing for health and taste...",
    "Marinating in culinary computation...",
    "Balancing the ingredients for you...",
    "Garnishing with the final touches...",
  ];

  useEffect(() => {
    console.error(errorState);
  }, [errorState]);

  /*TODO: Add logic to limit daily meal requests*/

  useEffect(() => {
    const url = "https://api.njitbytes.co/breakfast";
    axios
      .get(url, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME, // This should be your basic auth username
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD, // This should be your basic auth password
        },
      })
      .then((response) => {
        const res = response.data;
        setBreakfast(res);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const url = "https://api.njitbytes.co/lunch";
    axios
      .get(url, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME, // This should be your basic auth username
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD, // This should be your basic auth password
        },
      })
      .then((response) => {
        const res = response.data;
        setLunch(res.slice(0, 16388));
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const url = "https://api.njitbytes.co/dinner";
    axios
      .get(url, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME, // This should be your basic auth username
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD, // This should be your basic auth password
        },
      })
      .then((response) => {
        const res = response.data;
        setDinner(res);
      })
      .catch((error) => {});
  }, []);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_GPT_API,
    dangerouslyAllowBrowser: true,
  });

  const user = getInfo();

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through loading messages
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 9000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, []);

  const getResponse = async (selection) => {
    setLoading(true);
    let menu;
    if (selection === "breakfast") {
      menu = breakfast;
    } else if (selection === "lunch") {
      menu = lunch;
    } else {
      menu = dinner;
    }
    console.log("contacting openai...");
    let response;

    try {
      response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              'Generate a JSON object for a single meal plan. The JSON object should contain an array of no more than 4 ingredients for the meal, each with its nutritional information and number of servings you suggest in relation to other ingredients. If protein, carb, fat informaiton isnt provided, approximate. The JSON structure must follow this specific format without deviation: {"meal": [{"ingredient": {"name": "(fill)", "calories": "(fill)", "carbs": "(fill)", "protein": "(fill)", "fat": "(fill)", "serving size", "num_servings": "(fill)"}}]}',
          },
          {
            role: "user",
            content: `Generate a meal, focus on high protein and values for each macro asked for, specify the serving per ingredient. User information:
            ${user.age} years old, ${user.sex}, ${user.heightFeet}ft ${
              user.heightInches
            }in, ${
              user.weight
            } pounds, recommended caloric intake of ${getDailyCals()}, ${
              user.restrictions
            }, dietary preference is ${user.preferences}, wants to ${
              user.goal
            }. Here is the menu ${selection}. ${JSON.stringify(menu).slice(
              0,
              11288
            )}`,
          },
        ],
        max_tokens: 400,
      });
    } catch (err) {
      console.error("ChatGPT failed to respond");
      setLoading(false);
      setErrorState("ChatGPT failed to respond");
    }
    const mealStr = response.choices[0].message.content;
    console.log(mealStr);
    setLoading(false);
    try {
      setResponseData(JSON.parse(mealStr));
      setErrorState(null);
    } catch (e) {
      console.error("Something went wrong! Please try again later");
      setErrorState("Something went wrong! Please try again later");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("byte_quizStatus") === null)
      window.location.assign("/");
  });

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <div
        className={`flex flex-col items-center justify-${
          isMobile ? "center" : "start"
        } `}
      >
      <div className="p-[1rem] sm:p-[4rem] h-screen w-full flex flex-col items-center">
        <Logo />
        <div className="mt-[5rem] w-full flex items-center gap-4 justify-center" style={isMobile ? {  } : {maxWidth: "40vw"}}>
        <Button
                className="flex-grow"
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "70vw" : "70vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setResponseData(null);
                  getResponse("breakfast");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
            🤖<br/>Get Breakfast
          </Button>
          <Button
                className="flex-grow"
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "70vw" : "70vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setResponseData(null);
                  getResponse("lunch");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
            🤖<br/>Get Lunch
          </Button>
          <Button
                className="flex-grow"
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "70vw" : "70vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "75vw",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setResponseData(null);
                  getResponse("dinner");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
            🤖<br/>Get Dinner
          </Button>
        </div>
        <div className="opacity-[50%] italic" style={{textAlign: "center"}}>
          Calories and macros are adjusted by number of servings
        </div>
        <div className="w-full flex justify-center p-[2em]">
          <div className="flex w-[75%] justify-around">
            {responseData && (
              <>
                <Card
                  variant="outlined"
                  sx={{ width: 343, display: "flex", gap: 2 }}
                >
                  <Typography>
                    {responseData.meal.map((ingredientObject) => {
                      const ingredient = ingredientObject.ingredient;
                      const data = [
                        ["Macros", "Grams"],
                        [
                          "Protein",
                          Number.parseInt(ingredient.protein.slice(0, -1)),
                        ],
                        [
                          "Carbs",
                          Number.parseInt(ingredient.carbs.slice(0, -1)),
                        ],
                        ["Fat", Number.parseInt(ingredient.fat.slice(0, -1))],
                      ];
                      macros.calories +=
                        Number.parseInt(ingredient.calories) *
                        Number.parseInt(ingredient["num_servings"]);
                      macros.protein +=
                        Number.parseInt(ingredient.protein.slice(0, -1)) *
                        Number.parseInt(ingredient["num_servings"]);
                      macros.fat +=
                        Number.parseInt(ingredient.fat.slice(0, -1)) *
                        Number.parseInt(ingredient["num_servings"]);
                      macros.carbs +=
                        Number.parseInt(ingredient.carbs.slice(0, -1)) *
                        Number.parseInt(ingredient["num_servings"]);

                      return (
                        <div className="flex" key={ingredient.name}>
                          <div className="">
                            <h3 className="w-[14rem]">{ingredient.name}</h3>
                            <div className="text-primary-accent">
                              Serving size: {ingredient["serving size"]} <br />
                              Servings: {ingredient["num_servings"]}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-[4px] h-[4px] bg-[#3366cc]"></div>
                              {Number.parseInt(ingredient.protein) *
                                Number.parseInt(ingredient["num_servings"])}
                              g Protein
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-[4px] h-[4px] bg-[#dc3911]"></div>
                              {Number.parseInt(ingredient.carbs) *
                                Number.parseInt(ingredient["num_servings"])}
                              g Carbs
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-[4px] h-[4px] bg-[#ff9900]"></div>
                              {Number.parseInt(ingredient.fat) *
                                Number.parseInt(ingredient["num_servings"])}
                              g Fat
                            </div>
                          </div>
                          <div className="-mt-10 -ml-[0rem]  ">
                            <div className="z-20">
                              <Chart
                                chartType="PieChart"
                                data={data}
                                options={pieChartOptions}
                                width={"100%"}
                                height={"125px"}
                              ></Chart>
                            </div>
                            <div className="relative z-0">
                              <div className="absolute  w-[75px] h-[75px] rounded-[75px] -top-[5.4rem] left-[0.75rem] flex justify-center items-center font-semibold text-[1.25em]">
                                {ingredient.calories *
                                  Number.parseInt(ingredient["num_servings"])}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div>{macros.calories} Calories</div>
                    <div>{macros.protein}g Protein</div>
                    <div>{macros.carbs}g Carbs</div>
                    <div>{macros.fat}g Fat</div>
                  </Typography>
                </Card>
              </>
            )}

            {loading && <div>{loadingMessages[currentMessageIndex]}</div>}
            {errorState && (
              <div className="text-destructive">X {errorState}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
