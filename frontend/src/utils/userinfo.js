export const getInfo = () => {
  const user = {
    name: JSON.parse(localStorage.getItem("byte_name")),
    sex: JSON.parse(localStorage.getItem("byte_sex")),
    weight: parseInt(JSON.parse(localStorage.getItem("byte_weight"))),
    heightFeet: parseInt(JSON.parse(localStorage.getItem("byte_height_feet"))),
    heightInches: parseInt(
      JSON.parse(localStorage.getItem("byte_height_inches"))
    ),
    preferences: localStorage.getItem("byte_preferences"),
    restrictions: localStorage.getItem("byte_restrictions"),
    activity: localStorage.getItem("byte_activity"),
    goal: JSON.parse(localStorage.getItem("byte_goal")),
  };
  return user;
};

export const getFavoriteArr = () => {
  let favorites = localStorage.getItem("byte_favorite_items");
  if (favorites) {
    if (favorites.includes(",")) {
      favorites = favorites.split(",");
    } else {
      favorites = [favorites];
    }
  } else {
    favorites = [];
  }
  return favorites;
};
