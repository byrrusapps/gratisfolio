import { toggleRender } from "@/scripts/CV-Scripts";
import { Fragment } from "react";

interface ExpProps {
experience: Record<string, string>[];
unit: string;
titleFont: string;
bodyFontSize: string;
bodyLh: number;
gap: string | number;
}

const Experience = ({experience, unit, titleFont, bodyFontSize,
bodyLh, gap,
}:ExpProps) => {

return(
<Fragment>
                {experience.map((item, index) => {
                  const { company, position, details, bulletPoints } =
                    item || {};
                  const bulletArray = bulletPoints?.split("\n");
                  const bulletToggle = toggleRender({
                    value: bulletArray,
                    flexValue: "flex",
                  });

                  return (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          paddingBottom: `1${unit}`,
                        }}
                      >
                        <span
                          style={{
                            color: "inherit",
                            fontFamily: titleFont,
                            fontSize: bodyFontSize,
                            // fontWeight: "bold",
                            lineHeight: bodyLh,
                          }}
                        >
                          {position}
                        </span>

                        <span
                          style={{
                            color: "inherit",
                            fontSize: bodyFontSize,
                            lineHeight: bodyLh,
                          }}
                        >
                          {company}
                        </span>
                      </div>

                      <span
                        style={{
                          color: "inherit",
                          fontSize: bodyFontSize,
                          lineHeight: bodyLh,
                        }}
                      >
                        {details}
                      </span>

                      {bulletToggle && (
                        <>
                          {bulletArray.map((point, index) => {
                            const pointToggle = point.trim().length > 0;

                            return (
                              <Fragment key={index}>
                                {pointToggle && (
                                  <div
                                    style={{
                                      width: `calc(100% - ${gap})`,
                                      paddingLeft: `${gap}`,
                                      display: "flex",
                                      alignItems: "start",
                                      gap: `1${unit}`,
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "inherit",
                                        fontSize: bodyFontSize,
                                        lineHeight: bodyLh,
                                      }}
                                    >
                                      &bull;
                                    </span>
                                    <span
                                      style={{
                                        width: `100%`,
                                        color: "inherit",
                                        fontSize: bodyFontSize,
                                        lineHeight: bodyLh,
                                      }}
                                    >
                                      {point}
                                    </span>
                                  </div>
                                )}
                              </Fragment>
                            );
                          })}
                        </>
                      )}
                    </div>
                  );
                })}
</Fragment>
)

}

export default Experience;