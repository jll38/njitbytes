import { TextSkeleton } from "./../components/TextSkeleton";
import { Footer } from "./../components/footer";
import { Logo } from "./../components/Logo";
import { getInfo } from "../utils/userinfo";
import { Button } from "@mui/joy";
import React from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import CloseIcon from '@mui/icons-material/Close';
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
    let url;
    if (process.env.REACT_APP_ENV === "development") {
      url = "https://corsproxy.io/?https://api.njitbytes.co/breakfast";
    } else {
      url = "https://api.njitbytes.co/breakfast";
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
        setBreakfast(res);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    let url;
    if (process.env.REACT_APP_ENV === "development") {
      url = "https://corsproxy.io/?https://api.njitbytes.co/lunch";
    } else {
      url = "https://api.njitbytes.co/lunch";
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
        setLunch(res.slice(0, 16388));
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    let url;
    if (process.env.REACT_APP_ENV === "development") {
      url = "https://corsproxy.io/?https://api.njitbytes.co/dinner";
    } else {
      url = "https://api.njitbytes.co/dinner";
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
        setDinner(res);
      })
      .catch((error) => {});
  }, []);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_GPT_API,
    dangerouslyAllowBrowser: true,
  });

  const user = getInfo();

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
              "You are an expert dietician that follows food preferences and dietary restrictions. You also only give information in a JSON object. Follow this format without deviation {'meals': [{'meal1': [{ingredient: {'name': '(fill)', 'calories': '(fill)','carbs': '(fill)', 'protein': '(fill)', 'fat': '(fill)', 'serving size': '(fill)'}}]}]}",
          },
          {
            role: "user",
            content: `I am a ${user.age} year old ${user.sex}, standing at ${
              user.heightFeet
            }ft ${user.heightInches}in tall, weighing in at ${
              user.weight
            } pounds with a recommended caloric intake of ${getDailyCals()}. My dietary restriction is the following: ${
              user.restrictions
            }. My dietary preference is the following: ${
              user.preferences
            }. Give me 2 meal combinations from my dining hall menu, focus on high protein and give measurements for protein, carbs, fat, and calories (preferably at the start) for the total meal, specify the serving per ingredient, and am looking to ${
              user.goal
            }. Here is the dining hall menu for ${selection}. ${JSON.stringify(
              menu
            ).slice(0, 11288)}`,
          },
        ],
        max_tokens: 400,
      });
    } catch (err) {
      console.error("ChatGPT failed to respond");
      setLoading(false)
      setErrorState("ChatGPT failed to respond");
    }
    const mealStr = response.choices[0].message.content;
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
    <div>
      <div className="p-[1rem] sm:p-[4rem] h-screen w-full flex flex-col items-center">
        <Logo />
        <div className="mt-[20rem] sm:mt-[12rem]"></div>
        <div className="sm:mt-[5rem] w-full flex items-center gap-4 justify-center">
          <Button
            onClick={() => {
              setResponseData(null);
              getResponse("breakfast");
            }}
          >
            Get Breakfast Meal
          </Button>
          <Button
            onClick={() => {
              setResponseData(null);
              getResponse("lunch");
            }}
          >
            Get Lunch Meal
          </Button>
          <Button
            onClick={() => {
              setResponseData(null);
              getResponse("dinner");
            }}
          >
            Get Dinner Meal
          </Button>
        </div>
        <div className="w-full flex justify-center p-[2em]">
          <div className="flex w-[75%] justify-around">
            {responseData &&
              responseData.meals.map((mealObject, index) => {
                const mealKey = `meal${index + 1}`; // Constructing the meal key based on the index
                const meal = mealObject[mealKey]; // Accessing the correct meal array
                return (
                  <Card
                    variant="outlined"
                    sx={{ width: 343, display: "flex", gap: 2 }}
                  >
                    <Typography>
                      {meal &&
                        meal.map((ingredientObject) => {
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
                            [
                              "Fat",
                              Number.parseInt(ingredient.fat.slice(0, -1)),
                            ],
                          ];
                          return (
                            <div className="flex" key={ingredient.name}>
                              <div className="">
                                <h3 className="w-[14rem]">{ingredient.name}</h3>
                                <div className="text-primary-accent">
                                  Serving size: {ingredient["serving size"]}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-[4px] h-[4px] bg-[#3366cc]"></div>
                                  {ingredient.protein} Protein
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-[4px] h-[4px] bg-[#dc3911]"></div>
                                  {ingredient.carbs} Carbs
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-[4px] h-[4px] bg-[#ff9900]"></div>
                                  {ingredient.fat} Fat
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
                                    {ingredient.calories}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </Typography>
                  </Card>
                );
              })}

            {loading && <div>Loading...</div>}
            {errorState && <div className="text-destructive">X {errorState}</div>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div></div>
  );
}
