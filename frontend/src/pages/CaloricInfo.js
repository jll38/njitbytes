import { Logo } from "./../components/Logo";
import React from "react";
import { Typography, Button } from "@mui/joy";
import { getDailyCals } from "../utils/macros";

export function CaloricInfo({}) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Logo />
      <div className="mt-[20rem]"></div>
      <div className="mt-12 text-center px-4">
        <Typography component="h1" sx={{ fontSize: "2em" }}>
          Your Daily Caloric Intake
        </Typography>

        <Typography component="p" className="mb-2">
          Based on the information you provided, your daily recommended calorie
          intake is:
        </Typography>
        <Typography component="p" className="text-xl font-bold mb-6">
          {getDailyCals().totalCals} kcal
        </Typography>

        <br />

        <Typography component="h2" sx={{ fontSize: "2em" }}>
          Understanding Your Caloric Needs
        </Typography>
        <Typography component="p" className="mb-2">
          Your Basal Metabolic Rate (BMR) is the starting point:
        </Typography>
        <Typography component="p" className="text-lg font-bold mb-6">
          BMR: {getDailyCals().bmr} kcal/day
        </Typography>

        <br />

        <Typography component="p" className="mb-4">
          BMR represents the number of calories needed for your body to perform
          basic life-sustaining functions.
        </Typography>
        <Typography component="p" className="mb-4">
          We then adjust this number based on your activity level and specific
          goals to calculate your total daily energy expenditure (TDEE).
        </Typography>

        <br />

        <Button
          variant="outlined"
          onClick={() => {
            window.location.assign("/meals");
          }}
          className="mt-6"
        >
          Get a Personalized Nutrition Plan
        </Button>
      </div>
    </div>
  );
}
