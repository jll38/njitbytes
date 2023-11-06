import { Footer } from "./../components/footer";
import { Logo } from "./../components/Logo";
import { getInfo } from "../utils/userinfo";
import { Button } from "@mui/joy";
import React from "react";
import axios from "axios";
import { bruh, bruh_lunch } from "../tmp";
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
import { json } from "react-router";
import { isJson } from "../utils/parser";

export function Meals({}) {
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorState, setErrorState] = useState(null);

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
    let menu;
    if (selection === "breakfast") {
      menu = breakfast;
    } else if (selection === "lunch") {
      menu = lunch;
    } else {
      menu = dinner;
    }
    console.log("contacting openai...");
    const response = await openai.chat.completions.create({
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
    const mealStr = response.choices[0].message.content;
    try {
      setResponseData(JSON.parse(mealStr));
    } catch (e) {
      console.error("Something went wrong! Please try again later");
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
        {responseData &&
          responseData.meals.map((mealObject, index) => {
            const mealKey = `meal${index + 1}`; // Constructing the meal key based on the index
            const meal = mealObject[mealKey]; // Accessing the correct meal array
            return (
              <Card
                variant="outlined"
                sx={{ width: 343, display: "flex", gap: 2 }}
              >
                <AspectRatio ratio="21/9">
                  {/* ...assuming you want to put something here... */}
                </AspectRatio>
                <Typography>
                  {meal &&
                    meal.map((ingredientObject) => {
                      const ingredient = ingredientObject.ingredient;
                      return (
                        <div key={ingredient.name}>
                          <h3>{ingredient.name}</h3>
                          <div className="text-primary-accent">Serving size: {ingredient["serving size"]}</div>
                          {/* Added a key for React list rendering */}
                          {`${ingredient.calories}cals ${ingredient.carbs} carbs ${ingredient.protein} protein ${ingredient.fat} fat`}
                          <br /> {/* Added line break for readability */}
                        </div>
                      );
                    })}
                </Typography>
              </Card>
            );
          })}

        {!responseData && (
          <Card variant="outlined" sx={{ width: 343, display: "flex", gap: 2 }}>
            <AspectRatio ratio="21/9">
              <Skeleton variant="overlay">
                <img
                  alt=""
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                />
              </Skeleton>
            </AspectRatio>
            <Typography>
              <Skeleton>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries.
              </Skeleton>
            </Typography>
          </Card>
        )}
        <div className="p-0 max-w-[80rem]"></div>
      </div>

      <Footer />
    </div>
  ) : (
    <div></div>
  );
}
