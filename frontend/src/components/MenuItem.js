import React from "react";
import { Button, Tooltip } from "@mui/joy";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../utils/userinfo";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function MenuItem({ favorites, section }) {
  const [favoriteIcon, toggleFavorite] = useState(
    favorites.includes(section["Item Name"])
  );
  const handleFavorite = () => {
    if (!favoriteIcon) {
      addFavorite(favorites, section["Item Name"]);
    } else {
      removeFavorite(favorites, section["Item Name"]);
    }
    toggleFavorite(!favoriteIcon);
  };

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between">
        <div>{section["Item Name"]}</div>
        <div className="flex gap-4">
          <div>{section["Calories"]} Cal</div>
          <Tooltip title={favoriteIcon ? "Remove from favorites" : "Add to favorites" } placement="right">
            <Button
              className="relative bottom-1"
              variant="text"
              startDecorator={
                favoriteIcon ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
              onClick={() => {
                handleFavorite(favoriteIcon, section, favorites);
              }}
            ></Button>
          </Tooltip>
        </div>
      </div>
      <div className="text-[.75em] opacity-75">
        Serving Size: {section["Portion"]}
      </div>
    </>
  );
}
