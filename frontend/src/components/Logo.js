import React from "react";
import Chip from "@mui/joy/Chip";
import { isOpenNow } from "../utils/timehandler";
export function Logo({}) {
  const isOpen = isOpenNow();
  return (
    <a className="absolute  top-[3rem]" href="/">
      <div id="logo" className="flex flex-col items-center leading-10 ">
        <img
          className="mb-2"
          src="/images/njitbytes-transparent.png"
          width={100}
          height={100}
          alt="njitbytes logo alt"
        ></img>
        <h1 className="text-[2em] sm:text-[4em]">NJITBytes</h1>
        <div>Healthier College Living</div>
        <Chip className="mt-4" startDecorator={<div
            className=" h-[10px] w-[10px] rounded-[4px]"
            style={{ backgroundColor: isOpen.color }}
          ></div>}>
          
          <p className="text-[.75em]">{isOpen.message}</p>
        </Chip>
      </div>
    </a>
  );
}
