//Retrieve all User Info as object
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

//Get Array of Favorite Items
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

export const addFavorite = (array, valueToAdd) => {
  if (!array.includes(valueToAdd)) {
    array.push(valueToAdd);
    localStorage.setItem("byte_favorite_items", array);
  }
};

//Remove Item from Favorites
/*
Replace value determines whether or not the array being passed
to the function is changed or not. Usually when the array being passed
is part of a useState, thus being immutable without the setter.
This is implemented mainly so getFavoriteArr() isn't constantly 
being called.
*/

export const removeFavorite = (array, valueToRemove, replace = true) => {
  const index = array.indexOf(valueToRemove);
  if (replace) {
    if (index > -1) {
      array.splice(index, 1);
    }
    localStorage.setItem("byte_favorite_items", array);
  } else {
    const nArray = array;
    nArray.splice(index, 1);
    localStorage.setItem("byte_favorite_items", nArray);
  }
};
