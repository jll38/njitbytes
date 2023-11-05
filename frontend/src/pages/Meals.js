import { Footer } from "./../components/footer";
import { Logo } from "./../components/Logo";
import { getInfo } from "../utils/userinfo";
import { Button } from "@mui/joy";
import React from "react";
import axios from "axios";
import { bruh, bruh_lunch } from "../tmp";
import { Tabs, TabList, Tab, TabPanel, Select, MenuItem } from "@mui/joy";
import { useState, useEffect } from "react";
import { getDailyCals } from "../utils/macros";
import OpenAI from "openai";
import { json } from "react-router";

export function Meals({}) {
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const [selection, setSelection] = useState("breakfast");
  const [responseData, setResponseData] = useState(null);

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
        setLunch(res);
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
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `For your response, do not elaborate & keep it brief. I am a ${
        user.age
      } year old ${user.sex}, standing at ${user.heightFeet}ft ${
        user.heightInches
      }in tall, weighing in at ${
        user.weight
      } with a recommended caloric intake of ${getDailyCals()}.  My dietary restriction is the following: ${
        user.restrictions
      }. My dietary preference is the following: ${
        user.preferences
      }. Give me 2 meal combinations from my dining hall menu, focus on high protein and give measurements for protein, carbs, fat, and calories (preferably at the start) and am looking to ${
        user.goal
      }. Here is the dining hall menu for ${selection}. ${JSON.stringify(
        bruh[1]
      )}`,
      max_tokens: 200,
    });
    console.log(response.choices[0].text);
    setResponseData(response.choices[0].text);
  };
  useEffect(() => {
    if (localStorage.getItem("byte_quizStatus") === null)
      window.location.assign("/");
  });

  /*useEffect(() => {
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
        setBreakfast(res)
      })
      .catch((error) => {
        
        console.log(error);

      });
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
        setLunch(res)
      })
      .catch((error) => {
        console.log(error);

      });
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
        setDinner(res)
      })
      .catch((error) => {
        console.log(error);

      });
  }, []);
*/

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <div>
      <div className="p-[1rem] sm:p-[4rem] h-screen w-full flex flex-col items-center">
        <Logo />
        <div className="mt-[20rem] sm:mt-[12rem]"></div>
        <div className="sm:mt-[5rem] w-full flex items-center gap-4 justify-center">
          <Button
            onClick={() => {
              getResponse("breakfast");
            }}
          >
            Get Breakfast Meal
          </Button>
          <Button
            onClick={() => {
              getResponse("lunch");
            }}
          >
            Get Lunch Meal
          </Button>
          <Button
            onClick={() => {
              getResponse("dinner");
            }}
          >
            Get Dinner Meal
          </Button>
        </div>
        <div>
          <pre>{responseData}</pre>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div></div>
  );
}
