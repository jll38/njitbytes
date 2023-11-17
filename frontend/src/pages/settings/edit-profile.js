import React from "react";
import {
  Button,
  Box,
  Input,
  RadioGroup,
  Sheet,
  Radio,
  FormLabel,
} from "@mui/joy";
import { Logo } from "../../components/Logo";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import CakeIcon from "@mui/icons-material/Cake";
import ScaleIcon from "@mui/icons-material/Scale";
import HeightIcon from "@mui/icons-material/Height";
import WcIcon from "@mui/icons-material/Wc";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CheckIcon from "@mui/icons-material/Check";
import { getInfo } from "../../utils/userinfo";
import Layout from "../Layout";

export function EditProfile() {
  const [editItem, setEditItem] = useState(null);
  const [input, setInput] = useState(null);
  const user = getInfo();
  const isMobile = window.innerWidth <= 600;

  if (localStorage.getItem("byte_quizStatus") === null)
    window.location.assign("/");

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const submitChange = () => {
    if (editItem === "byte_height") {
    } else if (editItem === "byte_activity") {
    } else {
      localStorage.setItem("byte_name", '"' + input + '"');
      setInput(null);
      setEditItem(null);
    }
  };

  const handleCancel = () => {
    setEditItem(null);
    setInput(null);
  };

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <Layout>
      <div
        className={`flex flex-col items-center justify-${
          isMobile ? "center" : "center"
        } mt-${isMobile ? 0 : 10}`}
        style={isMobile ? {} : {}}
      >
        <div className="flex flex-col justify-center items-center">
          <Logo />
          <h2 className="">Edit Profile</h2>
          {editItem === null && (
            <div
              className={`grid ${
                isMobile ? "grid-cols-2" : "grid-cols-2"
              } gap-4 justify-center`}
            >
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_name");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <PersonIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Name
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_age");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <CakeIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Age
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_weight");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <ScaleIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Weight
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_height");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <HeightIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Height
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_goal");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <CheckIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Goals
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_sex");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <WcIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Sex
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_preferences");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <BadgeIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Dietary Preference
                </div>
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: isMobile ? "" : "18px",
                  height: "10vh",
                  width: isMobile ? "25vw" : "15vw", // Adjusted width for desktop
                  maxWidth: isMobile ? "285px" : "350px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setEditItem("byte_restrictions");
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <DoDisturbIcon style={{ fontSize: "48px" }} />
                <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  Dietary Restrictions
                </div>
              </Button>
            </div>
          )}
          {editItem === "byte_name" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">Name</FormLabel>
              <Input
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChange(e)}
              />
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {editItem === "byte_age" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">Age</FormLabel>
              <Input
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChange(e)}
                type="number"
              />
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {editItem === "byte_weight" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">
                Weight
              </FormLabel>
              <Input
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChange(e)}
                type="number"
                endDecorator="lbs"
              />
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {editItem === "byte_height" && (
            <div className="md:w-[25%] bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">
                Height
              </FormLabel>
              <div className="flex justify-between mb-4">
                <Input
                  className="border border-gray-300 p-3 w-1/2 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleChange(e)}
                  type="number"
                  endDecorator="ft"
                />
                <Input
                  className="border border-gray-300 p-3 w-1/2 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleChange(e)}
                  type="number"
                  endDecorator="in"
                />
              </div>
              <div className="flex justify-between">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {editItem === "byte_goal" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">
                Goals
              </FormLabel>
              <RadioGroup
                aria-labelledby="goal-label"
                defaultValue={user.goal}
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
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {editItem === "byte_sex" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <RadioGroup
                aria-labelledby="goal-label"
                defaultValue={user.sex}
                size="lg"
              >
                <div className="flex justify-center text-center">
                  {["Male", "Female"].map((value) => (
                    <Sheet
                      key={value}
                      sx={{
                        p: 0.8,
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
                  ))}
                </div>
              </RadioGroup>
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {editItem === "byte_preferences" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">
                Dietary Preferences?
              </FormLabel>
              <RadioGroup
                aria-labelledby="diet-preferences-label"
                defaultValue={user.preferences}
                size="lg"
                id="diet-preferences"
              >
                <div className="flex flex-col sm:flex-row justify-left gap-8 text-center">
                  {["Low Carb", "Low Fat", "None"].map((value) => (
                    <Sheet
                      key={value}
                      className="border border-gray-300 p-2 sm:p-3 rounded-md shadow-md w-full"
                    >
                      <Radio
                        id="goal"
                        label={`${value}`}
                        aria-label={`select-${value}`}
                        overlay
                        disableIcon
                        value={value}
                        onClick={(e) => {}}
                      />
                    </Sheet>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
          {editItem === "byte_restrictions" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormLabel className="text-lg font-semibold mb-4">
                Dietary Restrictions
              </FormLabel>
              <RadioGroup
                aria-labelledby="diet-restrictions-label"
                defaultValue={localStorage.getItem("byte_restrictions")}
                size="lg"
                id="diet-restrictions"
                className="flex sm:flex-row flex-col items-center text-center gap-4"
              >
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
                      onClick={(e) => {}}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                  onClick={submitChange}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  ) : (
    <></>
  );
}
