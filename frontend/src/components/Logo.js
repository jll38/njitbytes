import React from "react";
import Chip from "@mui/joy/Chip";
import { isOpenNow } from "../utils/timehandler";

export function Logo({ includeChip = true }) {
  const isOpen = isOpenNow();

  return (
    <a  href="/">
      <div id="logo" className="flex flex-col items-center leading-10 ">
        <img
          className="mb-2 w-full max-w-[150px] h-auto"
          src="/images/njitbytes-transparent.png"
          alt="njitbytes logo alt"
        />
        <h1 className="text-[2em] sm:text-[4em]">NJITBytes</h1>
        <div className="mt-4">Your NJIT Dining Companion</div>
        {includeChip && (
          <Chip
            className="mt-4"
            startDecorator={
              <div
                className="h-[10px] w-[10px] rounded-[10px]"
                style={{ backgroundColor: isOpen.color }}
              ></div>
            }
          >
            <p className="text-[.75em]">{isOpen.message}</p>
          </Chip>
        )}
      </div>
    </a>
  );
}
