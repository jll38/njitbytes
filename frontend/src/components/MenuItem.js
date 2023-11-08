import React from "react";
import { Button } from "@mui/joy";
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function MenuItem({ favorites, section }) {
  const [favoriteIcon, toggleFavorite] = useState(
    favorites.includes(section["Item Name"])
  );
  const handleFavorite = () => {
    if (!favoriteIcon) {
      favorites.push(section["Item Name"]);
    } else{
      removeFavorite(favorites, section["Item Name"]);
    }
    localStorage.setItem("byte_favorite_items", favorites);
    toggleFavorite(!favoriteIcon);
  };

  const removeFavorite = (array, valueToRemove) => {
    const index = array.indexOf(valueToRemove);
    if (index > -1) {
      array.splice(index, 1);
    }
    console.log(array); 
  };
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between">
        <div>{section["Item Name"]}</div>
        <div className="flex gap-4">
          <div>{section["Calories"]} Cal</div>
          <Button
            className="relative bottom-1"
            variant="text"
            startDecorator={favoriteIcon ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={() => {
              handleFavorite();
            }}
          ></Button>
        </div>
      </div>
      <div className="text-[.75em] opacity-75">
        Serving Size: {section["Portion"]}
      </div>
    </>
  );
}
