import React from "react";

import { useState, useEffect } from "react";
import {
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Radio,
  Sheet,
  Input,
  Box,
  Typography,
  FormHelperText,
} from "@mui/joy";

function Form({ setQuizStatus }) {
  const [values, setValues] = useState({
    byte_name: localStorage.getItem("byte_name"),
    byte_age: localStorage.getItem("byte_age"),
    byte_sex: localStorage.getItem("byte_sex"),
    byte_height_feet: localStorage.getItem("byte_height_feet"),
    byte_height_inches: localStorage.getItem("byte_height_inches"),
    byte_weight: localStorage.getItem("byte_weight"),
    byte_goal: localStorage.getItem("byte_goal"),
  });
  const [errorState, setErrorState] = useState(null);

  const [quizStep, setQuizStep] = useState(0);
  const [dietRestrictions, setDietRestrictions] = useState(null);
  const [dietPreferences, setDietPreferences] = useState(null);

  const handleChange = (e) => {
    let updatedValue = {};
    const id = "byte_" + e.target.id;
    let val = e.target.value === "" ? null : e.target.value;
    updatedValue = { [id]: val };
    setValues((values) => ({
      ...values,
      ...updatedValue,
    }));
  };

  function saveObjectToLocalStorage(obj) {
    try {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Assuming that the object values are serializable to JSON
          localStorage.setItem(key, JSON.stringify(obj[key]));
        }
      }
      console.log("All properties saved to local storage.");
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }

  switch (quizStep) {
    case 0:
      return (
        <Button
          variant="soft"
          color="primary"
          bgColor="primary"
          onClick={() => {
            setQuizStep(quizStep + 1);
          }}
          sx={{ fontSize: "36px", padding: "10px" }}
        >
          GET STARTED
        </Button>
      );
    case 1:
      return (
        <div className="w-full md:w-[40rem] h-[40rem] px-8 mt-[20em] md:mt-[6em] mb-[4em]">
          <div className="flex flex-col gap-3">
            <div aria-label="name-question">
              <FormLabel sx={{ fontSize: "1.3em" }}>First Name</FormLabel>
              <Input
                id="name"
                value={localStorage.getItem("age")}
                autoComplete={'off'}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="flex justify-between flex-col sm:flex-row items-center">
              <div className="flex gap-2">
                <div>
                  <FormLabel
                    aria-label="age-question"
                    sx={{ fontSize: "1.3em" }}
                    
                  >
                    Age
                  </FormLabel>
                  <Input
                    id="age"
                    type="number"
                    aria-label="age-question"
                    defaultValue={localStorage.getItem("byte_age")}
                    autoComplete={'off'}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    slotProps={{
                      input: {
                        min: 0,
                        max: 116,
                        step: 1,
                      },
                    }}
                  />
                </div>
                <div>
                  <FormLabel sx={{ fontSize: "1.3em" }}>Weight</FormLabel>
                  <Input
                    id="weight"
                    autoComplete={'off'}
                    type="number"
                    aria-label="weight-question"
                    defaultValue={localStorage.getItem("byte_weight")}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    slotProps={{
                      input: {
                        min: 0,
                        max: 1000,
                        step: 1,
                      },
                    }}
                    endDecorator={<div>lbs</div>}
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <FormLabel
                    aria-label="age-question"
                    sx={{ fontSize: "1.3em" }}
                  >
                    Height
                  </FormLabel>
                  <div className="flex">
                    <Input
                      id="height_feet"
                      type="number"
                      aria-label="height-feet-question"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      defaultValue={localStorage.getItem("byte_height_feet")}
                      endDecorator={<div>ft</div>}
                      slotProps={{
                        input: {
                          min: 0,
                          max: 116,
                          step: 1,
                        },
                      }}
                    />
                    <div>
                      <Input
                        id="height_inches"
                        type="number"
                        aria-label="height-inches-question"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        defaultValue={localStorage.getItem(
                          "byte_height_inches"
                        )}
                        slotProps={{
                          input: {
                            min: 0,
                            max: 1000,
                            step: 1,
                          },
                        }}
                        endDecorator={<div>in</div>}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-label="sex-question" className="">
                <FormLabel sx={{ fontSize: "1.3em" }}>
                  Sex
                </FormLabel>
                <RadioGroup
                  aria-labelledby="goal-label"
                  defaultValue={localStorage.getItem("byte_sex")}
                  size="lg"
                >
                  <div className="flex center text-center">
                    {["Male", "Female"].map(
                      (value) => (
                        <Sheet
                          key={value}
                          sx={{
                            p: .8,
                            borderRadius: "md",
                            boxShadow: "sm",
                            width: "150%",
                          }}
                        >
                          <Radio
                            id="sex"
                            label={`${value}`}
                            aria-label={`select-${value}`}
                            overlay
                            disableIcon
                            value={value}
                            onClick={(e) => {
                              handleChange(e);
                            }}
                          />
                        </Sheet>
                      )
                    )}
                  </div>
                </RadioGroup>
              </div>
              {/*here */}
            </div>

            <div aria-label="goal-question">
              <FormLabel sx={{ fontSize: "1.3em" }}>
                What are your goals?
              </FormLabel>
              <RadioGroup
                aria-labelledby="goal-label"
                defaultValue={localStorage.getItem("byte_goal")}
                size="lg"
              >
                <div className="flex justify-between text-center">
                  {["Lose Weight", "Maintain Weight", "Gain Weight"].map(
                    (value) => (
                      <Sheet
                        key={value}
                        sx={{
                          p: 2,
                          borderRadius: "md",
                          boxShadow: "sm",
                          width: "30%",
                        }}
                      >
                        <Radio
                          id="goal"
                          label={`${value}`}
                          aria-label={`select-${value}`}
                          overlay
                          disableIcon
                          value={value}
                          onClick={(e) => {
                            handleChange(e);
                          }}
                        />
                      </Sheet>
                    )
                  )}
                </div>
              </RadioGroup>
            </div>

            <div aria-label="activity-level-question">
              <FormLabel sx={{ fontSize: "1.3em" }}>
                What is your level of physical activity?
              </FormLabel>
              <RadioGroup
                aria-labelledby="activity-label"
                defaultValue={localStorage.getItem("byte_activity")}
                size="lg"
              >
                <div className="flex justify-between text-center">
                  {[
                    {
                      title: "Sedentary",
                      description: "Little or no exercise",
                    },
                    {
                      title: "Moderately Active",
                      description: "Moderate exercise 3-5 days a week",
                    },
                    {
                      title: "Very Active",
                      description: "Hard exercise 6-7 days a week",
                    },
                  ].map((value) => (
                    <Sheet
                      key={value}
                      sx={{
                        p: 2,
                        borderRadius: "md",
                        boxShadow: "sm",
                        width: "30%",
                      }}
                    >
                      <Radio
                        label={`${value.title}`}
                        aria-label={`select-${value.title}`}
                        overlay
                        disableIcon
                        value={value.title}
                        onClick={() => {
                          localStorage.setItem(
                            "byte_activity",
                            value.title + " with " + value.description
                          );
                        }}
                      />
                      <Typography>{value.description}</Typography>
                    </Sheet>
                  ))}
                </div>
              </RadioGroup>
              <div id="error-message">{errorState}</div>
            </div>

            <div className="w-full flex justify-between">
              <Button
                variant="soft"
                aria-label="previous-page-button"
                onClick={() => {
                  setQuizStep(quizStep - 1);
                }}
              >
                Previous
              </Button>
              <Button
                variant="soft"
                aria-label="next-page-button"
                onClick={() => {
                  let isvalid =
                    !Object.values(values).every((o) => o === null) &&
                    !(localStorage.getItem("byte_activity") === null)
                      ? true
                      : false;
                  console.log(isvalid);
                  if (!isvalid) {
                    setErrorState(
                      "Please fill out every question before continuing."
                    );
                  } else {
                    saveObjectToLocalStorage(values);
                    setQuizStep(quizStep + 1);
                    setErrorState(null);
                  }

                  console.log(errorState);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="w-full  px-8 text-center md:text-left md:w-[40rem] flex flex-col gap-4 h-[40rem]">
          <div aria-label="dietary-restrictions-question">
            <FormLabel sx={{ fontSize: "1.3em" }}>
              Dietary Restrictions?
            </FormLabel>
            <RadioGroup
              aria-labelledby="diet-restrictions-label"
              defaultValue={localStorage.getItem("byte_restrictions")}
              size="lg"
              id="diet-restrictions"
            >
              <div className="flex sm:flex-row flex-col items-center text-center gap-4">
                {["Halal", "Vegan", "Gluten Free", "None"].map((value) => (
                  <Sheet
                    key={value}
                    sx={{
                      p: 2,
                      borderRadius: "md",
                      boxShadow: "sm",
                      width: "100%",
                    }}
                  >
                    <Radio
                      id="diet-restrictions"
                      label={`${value}`}
                      aria-label={`select-${value}`}
                      overlay
                      disableIcon
                      value={value}
                      onClick={(e) => {
                        setDietRestrictions(e.target.value);
                      }}
                    />
                  </Sheet>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div aria-label="dietary-preferences-question">
            <FormLabel sx={{ fontSize: "1.3em" }}>
              Dietary Preferences?
            </FormLabel>
            <RadioGroup
              aria-labelledby="diet-preferences-label"
              defaultValue={localStorage.getItem("byte_preferences")}
              size="lg"
              id="diet-preferences"
            >
              <div className="flex flex-col sm:flex-row justify-left gap-8 text-center">
                {["Low Carb", "Low Fat", "None"].map((value) => (
                  <Sheet
                    key={value}
                    sx={{
                      p: 2,
                      borderRadius: "md",
                      boxShadow: "sm",
                      width: "100%",
                    }}
                  >
                    <Radio
                      id="goal"
                      label={`${value}`}
                      aria-label={`select-${value}`}
                      overlay
                      disableIcon
                      value={value}
                      onClick={(e) => {
                        setDietPreferences(e.target.value);
                      }}
                    />
                  </Sheet>
                ))}
              </div>
            </RadioGroup>
            <div id="error-message">{errorState}</div>
          </div>

          <div className="w-full flex justify-between">
            <Button
              variant="soft"
              aria-label="previous-page-button"
              onClick={() => {
                setQuizStep(quizStep - 1);
              }}
            >
              Previous
            </Button>
            <Button
              variant="soft"
              aria-label="next-page-button"
              onClick={() => {
                if (dietRestrictions === null || dietPreferences === null) {
                  setErrorState(
                    "Please fill out every question before continuing."
                  );
                } else {
                  localStorage.setItem("byte_restrictions", dietRestrictions);
                  localStorage.setItem("byte_preferences", dietPreferences);
                  setQuizStatus(true);
                  localStorage.setItem("byte_quizStatus", true);
                  setErrorState(null);
                }

                console.log(errorState);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      );
    default:
      <div>error</div>;
  }
}

export default Form;
