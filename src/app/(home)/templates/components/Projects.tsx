import { toggleRender } from "@/scripts/CV-Scripts";
import { Fragment } from "react";

interface Colors {
    main: any;
    grey: any;
    default: any;
    paper: any;
    divider: any;
    primary: any;
    paperMain: any;
    paperGrey: any;
}

interface ProjectsProps {
projects: Record<string, string>[];
unit: string;
titleFont: string;
bodyFontSize: string;
bodyLh: number;
colors: Colors;
capFontSize: string;
capLh: number;
}

const Projects = ({projects, unit, titleFont, bodyFontSize,
bodyLh, colors, capFontSize, capLh,
}:ProjectsProps) => {

return(
<Fragment>
                {projects.map((item, index) => {
                  const { name, bulletPoints, year } = item || {};
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
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
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
                          {name}
                        </span>

                        <span
                          style={{
                            color: colors.grey,
                            fontSize: capFontSize,
                            lineHeight: capLh,
                          }}
                        >
                          {year}
                        </span>
                      </div>

                      {bulletToggle && (
                        <>
                          {bulletArray.map((point, index) => {
                            const pointToggle = point.trim().length > 0;

                            return (
                              <Fragment key={index}>
                                {pointToggle && (
                                  <div
                                    style={{
                                      width: `100%`,
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

export default Projects;