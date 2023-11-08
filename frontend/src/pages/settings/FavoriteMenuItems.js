import React from "react";
import { Button, Box } from "@mui/joy";
import { Logo } from "../../components/Logo";
import { getFavoriteArr } from "../../utils/userinfo";

export function FavoriteItemsPage() {
  if (localStorage.getItem("byte_quizStatus") === null)
    window.location.assign("/");
  let favorites = getFavoriteArr();
  return localStorage.getItem("byte_quizStatus") !== null ? (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <Logo/>
      <div className="mt-[4rem]">
        <ul>
        {favorites.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
      </div>
    </div>
  ) : (
    <></>
  );
}
