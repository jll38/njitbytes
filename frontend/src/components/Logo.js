import React from "react";
export function Logo({}) {
  return <div className="absolute top-[3rem]">
            <div id="logo" className="flex flex-col items-center leading-10 ">
              <img className="mb-2" src="/images/njitbytes-transparent.png" width={100} height={100} alt="njitbytes logo alt"></img>
              <h1>NJITBytes</h1>
              <div>Healthier College Living</div>
            </div>
          </div>;
}
  