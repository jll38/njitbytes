import React from "react";
export function RenderMeals({ meal }) {
  return (
    <>
      {" "}
      <h2>{meal[0]}</h2>
      <div className="flex flex-col gap-[.4rem]">
        {meal[1].map((section, i) => {
          if(section.items.length === 0)return null

          return (
            <>
              <h3 key={"breakfast-section-" + i}>
                {section.name.endsWith(".")
                  ? section.name.slice(0, -1)
                  : section.name}
              </h3>
              <ul className="md:pl-[4em] flex flex-col gap-2">
                {meal[1][i].items.map((section, j) => {
                  return (
                    <li key={"breakfast-item-" + j}>
                      <div className="flex md:flex-row flex-col justify-between">
                        <div>{section["Item Name"]}</div>
                        <div className="flex gap-4">
                          <div>{section["Calories"]} Cal</div>

                        </div>
                      </div>
                      <div className="text-[.75em] opacity-75">
                        Serving Size: {section["Portion"]}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}
