const SEDENTARY = 1.2;
const MODERATE = 1.5;
const ACTIVE = 1.75;

export const getDailyCals = () => {
  let multiplier;
  let bmr = 0;
  const sex = JSON.parse(localStorage.getItem("byte_sex"));
  const activity = localStorage.getItem("byte_activity");
  const goal = JSON.parse(localStorage.getItem("byte_goal"));
  const rawAge = localStorage.getItem("byte_age");
  const rawWeight = localStorage.getItem("byte_weight");
  const rawHeightFeet = localStorage.getItem("byte_height_feet");
  const rawHeightInches = localStorage.getItem("byte_height_inches");

  console.log({ rawAge, rawWeight, rawHeightFeet, rawHeightInches });

  const age = parseInt(JSON.parse(rawAge));
  const weight = parseInt(JSON.parse(rawWeight));
  const heightFeet = parseInt(JSON.parse(rawHeightFeet));
  const heightInches = parseInt(JSON.parse(rawHeightInches));

  console.log({ age, weight, heightFeet, heightInches });

  console.log(
    age +
      " " +
      typeof age +
      weight +
      " " +
      typeof weight +
      " " +
      heightFeet +
      " " +
      typeof heightFeet +
      " " +
      heightInches +
      " " +
      typeof heightInches
  );
  if (activity === "Moderately Active with Moderate exercise 3-5 days a week") {
    multiplier = MODERATE;
  } else if (activity === "Sedentary with Little or no exercise") {
    multiplier = SEDENTARY;
  } else {
    multiplier = ACTIVE;
  }
  let additional;
  if (sex === "Male") {
    console.log("dude");
    additional = 5;
  } else {
    console.log("duden't");
    additional = -161;
  }
  bmr = Math.round(
    10 * toKilo(weight) +
      6.25 * toCM(heightFeet, heightInches) -
      5 * age +
      additional
  );
  let totalCals = bmr * multiplier;
  console.log(goal)
  console.log(totalCals)
  if (goal === "Gain Weight") {
    totalCals = Math.round(totalCals * 1.15);
  } else if (goal === "Lose Weight") {
    totalCals = Math.round(totalCals - (totalCals * .13));
  } 
  console.log(totalCals)
  console.log("Type: " + typeof totalCals);
  return { bmr: bmr, totalCals: totalCals };
};

const toKilo = (pounds) => {
  return pounds * 0.45359237;
};

const toCM = (feet, inches) => {
  const totalInches = feet * 12 + inches;
  return totalInches * 2.54;
};
