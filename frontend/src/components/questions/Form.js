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
import Layout from "../../pages/Layout";

function Form({ setQuizStatus }) {
  const isMobile = window.innerWidth <= 600;
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
          style={{
            backgroundImage: "linear-gradient(to right, #0075FF, #00C2FF)",
            color: "#fff",
            padding: "20px 40px", // Increase padding for a larger button
            fontSize: "20px", // Increase font size for larger text
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "background-image 0.3s ease, transform 0.2s ease",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            borderRadius: "1.2rem",
            marginTop: "4rem",
          }}
          variant="contained"
          onClick={() => {
            setQuizStep(quizStep + 1);
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Get Started
        </Button>
      );
    case 1:
      return (
        <Layout>
          <div
            className="w-full md:w-[40rem] px-8 mx-auto"
            style={{ marginTop: isMobile ? "0" : "2rem" }}
          >
            <Box
              sx={{
                borderRadius: "12px",
                border: "1px solid rgba(224, 224, 224, 0.5)",
                boxShadow:
                  "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                maxWidth: "600px", // Set a maximum width for the box
                width: "100%", // Ensure it takes up 100% of the available width
                margin: "0 auto", // Center the box horizontally
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    {/* First Name Input */}
                    <div aria-label="name-question">
                      <FormLabel
                        sx={{
                          fontSize: "1.3em",
                          marginBottom: "8px",
                          color: "#333",
                        }}
                      >
                        First Name
                      </FormLabel>
                      <Input
                        id="name"
                        value={localStorage.getItem("age")}
                        autoComplete={"off"}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        sx={{
                          width: "250px",
                          padding: "12px",
                          fontSize: "1em",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition:
                            "border-color 0.3s ease, box-shadow 0.3s ease",
                          "&:focus": {
                            borderColor: "#0075FF",
                            boxShadow: "0 0 8px rgba(0, 122, 255, 0.6)",
                          },
                        }}
                      />
                    </div>

                    {/* Sex Radio Group */}
                    <div aria-label="sex-question">
                      <FormLabel
                        sx={{ fontSize: "1.3em", marginBottom: "8px" }}
                      >
                        Sex
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="goal-label"
                        defaultValue={localStorage.getItem("byte_sex")}
                        size="lg"
                      >
                        <div className="flex center text-center">
                          {["Male", "Female"].map((value, index) => (
                            <Sheet
                              key={value}
                              sx={{
                                p: 1.6, // Adjust padding
                                borderRadius: "md",
                                boxShadow: "sm",
                                width: "100%", // Adjust width
                                marginLeft: index === 1 ? "8px" : "0", // Add margin to the second button
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
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  {/* Add more form elements here */}
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
                        autoComplete={"off"}
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
                        endDecorator={<div>yrs</div>}
                        sx={{
                          width: "100px", // Adjust the width as needed
                        }}
                      />
                    </div>
                    <div>
                      <FormLabel sx={{ fontSize: "1.3em" }}>Weight</FormLabel>
                      <Input
                        id="weight"
                        autoComplete={"off"}
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
                        sx={{
                          width: "120px", // Adjust the width as needed
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <FormLabel
                      aria-label="height-question"
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
                        sx={{
                          width: "80px", // Adjust the width as needed
                          marginRight: "10px", // Add margin for spacing
                        }}
                      />
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
                        sx={{
                          width: "90px", // Adjust the width as needed
                          marginRight: "90px",
                        }}
                      />
                    </div>
                  </div>

                  {/*here */}
                </div>

                <div aria-label="goal-question">
                  <FormLabel sx={{ fontSize: "1.3em", pb: "7px" }}>
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
                              p: 1.4,
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
                  <FormLabel sx={{ fontSize: "1.3em", pb: "7px" }}>
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
                          title: "Not Active",
                          description: "Little or No Exercise",
                        },
                        {
                          title: "Moderately Active",
                          description: "Moderate Exercise ~3 Days a Week",
                        },
                        {
                          title: "Very Active",
                          description: "Hard Exercise ~5 Days/Week",
                        },
                      ].map((value) => (
                        <Sheet
                          key={value}
                          sx={{
                            p: 1,
                            borderRadius: "md",
                            boxShadow: "sm",
                            width: "30%",
                            "&:hover": {
                              color: "white", // Set the text color to white on hover
                            },
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
                            sx={{ fontWeight: "500" }}
                          />
                          <Typography sx={{ color: "grey" }}>
                            {value.description}
                          </Typography>
                        </Sheet>
                      ))}
                    </div>
                  </RadioGroup>
                  <div id="error-message">{errorState}</div>
                </div>

                <div className="w-full flex justify-between">
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #0075FF",
                      color: "#0075FF", // Text color
                      padding: "10px 30px", // Adjust padding as needed
                      fontSize: "16px", // Font size
                      borderRadius: "8px", // Border radius
                      cursor: "pointer",
                      transition:
                        "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
                    }}
                    variant="soft"
                    aria-label="previous-page-button"
                    onClick={() => {
                      setQuizStep(quizStep - 1);
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#0075FF"; // Change background color on hover
                      e.target.style.color = "#fff"; // Change text color on hover
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent"; // Reset background color on hover out
                      e.target.style.color = "#0075FF"; // Reset text color on hover out
                    }}
                  >
                    Previous
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "#0075FF", // Background color
                      color: "#fff", // Text color
                      padding: "10px 30px", // Adjust padding as needed
                      fontSize: "16px", // Font size
                      borderRadius: "8px", // Border radius
                      cursor: "pointer",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                    }}
                    variant="soft"
                    aria-label="next-page-button"
                    onClick={() => {
                      let isvalid =
                        !Object.values(values).every((o) => o === null) &&
                        !(localStorage.getItem("byte_activity") === null)
                          ? true
                          : false;

                      if (!isvalid) {
                        setErrorState(
                          "Please fill out every question before continuing."
                        );
                      } else {
                        saveObjectToLocalStorage(values);
                        setQuizStep(quizStep + 1);
                        setErrorState(null);
                      }
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#0056b3"; // Change background color on hover
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#0075FF"; // Reset background color on hover out
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Box>
          </div>
        </Layout>
      );

    case 2:
      return (
        <div className="w-full md:w-[40rem] px-8">
          <Box
            sx={{
              borderRadius: "12px", // Rounded corners
              border: "1px solid rgba(224, 224, 224, 0.5)", // Optional border for better separation
              boxShadow:
                "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1)", // 3D box shadow
              padding: "20px", // Adjust padding as needed
            }}
          >
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

            <div className="w-full flex justify-between mt-4">
              <Button
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #0075FF",
                  color: "#0075FF", // Text color
                  padding: "10px 30px", // Adjust padding as needed
                  fontSize: "16px", // Font size
                  borderRadius: "8px", // Border radius
                  cursor: "pointer",
                  transition:
                    "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
                }}
                variant="soft"
                aria-label="previous-page-button"
                onClick={() => {
                  setQuizStep(quizStep - 1);
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#0075FF"; // Change background color on hover
                  e.target.style.color = "#fff"; // Change text color on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Reset background color on hover out
                  e.target.style.color = "#0075FF"; // Reset text color on hover out
                }}
              >
                Previous
              </Button>
              <Button
                style={{
                  backgroundColor: "#0075FF", // Background color
                  color: "#fff", // Text color
                  padding: "10px 30px", // Adjust padding as needed
                  fontSize: "16px", // Font size
                  borderRadius: "8px", // Border radius
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
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
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#0056b3"; // Change background color on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#0075FF"; // Reset background color on hover out
                }}
              >
                Next
              </Button>
            </div>
          </Box>
        </div>
      );
    default:
      <div>error</div>;
  }
}

export default Form;