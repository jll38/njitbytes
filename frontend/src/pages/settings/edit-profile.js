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
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import CakeIcon from '@mui/icons-material/Cake';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import FlagIcon from '@mui/icons-material/Flag';
import WcIcon from '@mui/icons-material/Wc';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
export function EditProfile() {
  const [editItem, setEditItem] = useState(null);
  const [input, setInput] = useState(null);
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
    <div>
      <div
        className="p-[4rem 
        h-screen w-full flex flex-col justify-center items-center"
      >
        <Logo />
        <h2 className="sm:mt-[4rem] md:mt-[10rem]">Edit Profile</h2>
        {editItem === null && (
          <div className="flex gap-4 flex-wrap justify-center w-[60%] h-[6em] border">
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_name");
              }}
            >
              <BadgeIcon style={{ fontSize: "48px" }} />
              Name
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_age");
              }}
            >
              <CakeIcon style={{ fontSize: "48px" }}/>
              Age
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_weight");
              }}
            >
              <ScaleIcon style={{ fontSize: "48px" }}/>
              Weight
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_height");
              }}
            >
              <HeightIcon style={{ fontSize: "48px" }}/>
              Height
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_goal");
              }}
            >
              <FlagIcon style={{fontSize: "48px"}}/>
              Goals
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_sex");
              }}
            >
              <WcIcon style={{ fontSize: "48px" }}/>
              Sex
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_preferences");
              }}
            >
              <ThumbUpIcon style={{fontSize: "48px" }}/>
              Dietary Preference
            </Button>
            <Button
              variant="soft"
              className="h-[5rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] flex flex-col"
              sx={{ color: "text" }}
              onClick={() => {
                setEditItem("byte_restrictions");
              }}
            >
              <DoDisturbIcon style={{ fontSize: "48px" }}/>
              Dietary Restrictions
            </Button>
          </div>
        )}
        {editItem === "byte_name" && (
          <div>
            <FormLabel>Name</FormLabel>
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
            ></Input>
            <div className="flex justify-between">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => {
                  submitChange();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        {editItem === "byte_age" && (
          <div>
            <FormLabel>Age</FormLabel>
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
              type="number"
            ></Input>
            <div className="flex justify-between">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => {
                  submitChange();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        {editItem === "byte_weight" && (
          <div>
            <FormLabel>Weight</FormLabel>
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
              type="number"
              endDecorator="lbs"
            ></Input>
            <div className="flex justify-between">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => {
                  submitChange();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        {editItem === "byte_height" && (
          <div className="md:w-[25%]">
            <FormLabel>Height</FormLabel>
            <div className="flex justify-between">
              <Input
                onChange={(e) => {
                  handleChange(e);
                }}
                type="number"
                endDecorator="ft"
              ></Input>
              <Input
                onChange={(e) => {
                  handleChange(e);
                }}
                type="number"
                endDecorator="in"
              ></Input>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => {
                  submitChange();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        {editItem === "byte_goal" && (
          <div>
            <FormLabel>Goals</FormLabel>
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
            <div className="flex justify-between">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => {
                  submitChange();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
