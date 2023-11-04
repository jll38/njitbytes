import { Footer } from "./../components/footer";
import { Logo } from "./../components/Logo";
import React from "react";
import { bruh } from "../tmp";

export function Menu({}) {
  return (
    <div>
      <div className="p-[4rem] h-screen w-full flex flex-col justify-center items-center">
        <Logo />
        <div>bruh</div>
      </div>

      <Footer />
    </div>
  );
}
