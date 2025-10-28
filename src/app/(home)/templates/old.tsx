"use client";

import TemplateWrapper from "./TemplateWrapper";
import MyIcon from "./MyIcon";
import { ModeStyles } from "@/scripts/CV-Scripts/sizes";
import { CVData } from "@/providers/CreateContext";
import { toggleRender } from "@/scripts/CV-Scripts";
import { Fragment } from "react";

export interface TemplateProps {
  cvData: CVData;
  GenTheme: Record<string, any>;
  aspectRatio: string;
  size: ModeStyles;
  width: "string";
}

const Template1 = ({
  cvData,
  GenTheme: Theme,
  aspectRatio,
  size,
  width,
}: TemplateProps) => {
  const {
    avatar,
    profile,
    contact,
    showAvatar,
    headings,
    experience,
    education,
    skills,
    languages,
    projects,
    fonts,
    goldenRatio,
    flex,
  } = cvData;
  const { title: titleFont, body: bodyFont } = fonts;
  const { name, profession, summary } = profile;

  const {
    unit,
    bodyLayout,
    name: nm,
    profession: prof,
    body,
    icon,
    caption,
    heading,
  } = size;
  const { padding, sectionGap, gap } = bodyLayout;
  const { font: nmFontSize, lineHeight: nmLh } = nm;
  const { font: profFontSize, lineHeight: profLh } = prof;
  const { font: bodyFontSize, lineHeight: bodyLh } = body;
  const { font: iconFontSize, lineHeight: iconLh } = icon;
  const { font: capFontSize, lineHeight: capLh } = caption;
  const { font: hdFontSize, lineHeight: hdLh } = heading;
  const professionToggle = toggleRender({
    value: profession,
    flexValue: flex.profession,
  });
  const profileToggle = toggleRender({
    value: profile,
    flexValue: flex.profile,
  });
  const experienceToggle = toggleRender({
    value: experience,
    flexValue: flex.experience,
  });
  const contactToggle = toggleRender({
    value: contact,
    flexValue: flex.contact,
  });
  const educationToggle = toggleRender({
    value: education,
    flexValue: flex.education,
  });
  const projectsToggle = toggleRender({
    value: projects,
    flexValue: flex.projects,
  });
  const skillsToggle = toggleRender({ value: skills, flexValue: flex.skills });
  const languagesToggle = toggleRender({
    value: languages,
    flexValue: flex.languages,
  });

  //replace - `${nmFontSize.replace(/\d+/g, (match: string) => String(Number(match) * 2))}`

  const colors = {
    main: Theme?.custom?.main,
    grey: Theme?.custom?.grey,
    default: Theme?.background?.default,
    paper: Theme?.background?.paper,
    divider: Theme?.divider,
    primary: Theme?.primary?.main,
    paperMain: Theme?.myPaper.main,
    paperGrey: Theme?.myPaper?.grey,
  };

  const Title = ({ text }: Record<string, any>) => {
    return (
      <div
        style={{
          width: "100%",
          flexShrink: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap,
          borderBottom: `0.1${unit} solid currentColor`,
          color: "inherit",
        }}
      >
        <span
          style={{
            fontFamily: titleFont,
            fontSize: hdFontSize,
            fontWeight: "100",
            lineHeight: hdLh,
            letterSpacing: `0.25${unit}`,
          }}
        >
          {text}
        </span>
      </div>
    );
  };

  const SkillLang = ({ text }: Record<string, any>) => {
    return (
      <div
        style={{
          width: `calc(50% - ${gap})`,
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
          {text}
        </span>
      </div>
    );
  };

  return (
    <TemplateWrapper
      Theme={Theme}
      bodyFont={bodyFont}
      aspectRatio={aspectRatio}
      size={size}
      width={width}
      style={{
        justifyContent: "space-between",
        color: colors.main,
        backgroundColor: colors.default,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >

        <div
          style={{
            flexShrink: "0",
            flexGrow: "0",
            width: goldenRatio[0],
            maxWidth: goldenRatio[0],
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: sectionGap,
            backgroundColor: colors.paper,
            alignItems: "center",
            color: colors.paperMain,
          }}
        >
          <div
            style={{
              width: "100%",
              height: `1${unit}`,
              backgroundColor: "currentcolor",
            }}
          >
          </div>

          <div
            style={{
              width: `calc(100% - ${sectionGap.replace(/\d+/g, (match: string) => String(Number(match) * 2))})`,
              height: `calc(100% - ${sectionGap.replace(/\d+/g, (match: string) => String(Number(match) * 2))})`,
              padding: sectionGap,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: sectionGap,
              backgroundColor: "inherit",
            }}
          >

            {avatar && showAvatar && (
              <img
                src={avatar}
                style={{
                  width: "50%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                }}
              ></img>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap,
              }}
            >
              <span
                style={{
                  color: "inherit",
                  fontSize: nmFontSize,
                  fontFamily: titleFont,
                  // fontWeight: "bold",
                  lineHeight: nmLh,
                  textAlign: "center",
                }}
              >
                {name.value}
              </span>

              {professionToggle && (
                <span
                  style={{
                    color: "inherit",
                    fontSize: bodyFontSize,
                    lineHeight: bodyLh,
                    textAlign: "center",
                  }}
                >
                  {profession.value}
                </span>
              )}

              <div
                style={{
                  width: "50%",
                  height: `0.5${unit}`,
                  backgroundColor: "currentcolor",
                }}
              ></div>
            </div>

            {contactToggle && (
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "inherit",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `0.5${unit}`,
                      backgroundColor: "currentcolor",
                    }}
                  ></div>
                  <span
                    style={{
                      width: "fit-content",
                      color: "inherit",
                      fontSize: hdFontSize,
                      fontFamily: titleFont,
                      // fontWeight: "bold",
                      lineHeight: hdLh,
                      textAlign: "center",
                      backgroundColor: "inherit",
                      letterSpacing: `0.25${unit}`,
                    }}
                  >
                    {headings.contact}
                  </span>

                  <div
                    style={{
                      width: "100%",
                      height: `0.5${unit}`,
                      backgroundColor: "currentcolor",
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    margin: `-${(parseFloat(hdFontSize) * hdLh) / 2}${hdFontSize.replace(/[\d.]/g, "")} 0 0 0`,
                    width: `100%`,
                    height: "auto",
                    color: "inherit",
                    // border: `0.5${unit} solid currentColor`,
                    display: "flex",
                    gap,
                  }}
                >
                  <div
                    style={{
                      flexGrow: "1",
                      flexShrink: "0",
                      width: `0.5${unit}`,
                      height: `100%`,
                      backgroundColor: "currentcolor",
                    }}
                  ></div>

                  <div
                    style={{
                      padding: `${(parseFloat(hdFontSize) * hdLh) / 2 + 2}${hdFontSize.replace(/[\d.]/g, "")} 0 2${hdFontSize.replace(/[\d.]/g, "")} 0`,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap,
                    }}
                  >
                    {contact.map((item, index) => {
                      const { value, id } = item || {};

                      return (
                        <div
                          key={id}
                          style={{
                            width: `100%`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              color: "inherit",
                              fontSize: bodyFontSize,
                              // fontWeight: "bold",
                              lineHeight: bodyLh,
                              textAlign: "center",
                            }}
                          >
                            {headings?.[id as string]}
                          </span>
                          <span
                            style={{
                              color: colors.paperGrey,
                              fontSize: capFontSize,
                              lineHeight: capLh,
                              textAlign: "center",
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      flexGrow: "1",
                      flexShrink: "0",
                      width: `0.5${unit}`,
                      height: `100%`,
                      backgroundColor: "currentcolor",
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    flexGrow: "1",
                    width: `100%`,
                    height: `0.5${unit}`,
                    backgroundColor: "currentcolor",
                  }}
                ></div>
              </div>
            )}

            {profileToggle && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap,
                }}
              >
                <span
                  style={{
                    width: "100%",
                    padding: `0 ${gap}`,
                    color: "inherit",
                    fontSize: hdFontSize,
                    fontFamily: titleFont,
                    // fontWeight: "bold",
                    lineHeight: hdLh,
                    textAlign: "center",
                    zIndex: "2",
                    letterSpacing: `0.25${unit}`,
                  }}
                >
                  {headings.profile}
                </span>

                <span
                  style={{
                    color: "inherit",
                    fontSize: bodyFontSize,
                    lineHeight: bodyLh,
                    textAlign: "center",
                  }}
                >
                  {summary.value}
                </span>
              </div>
            )}

          </div>

        </div>

        <div
          style={{
            flexShrink: "0",
            flexGrow: "0",
            width: goldenRatio[1],
            maxWidth: goldenRatio[1],
            height: `100%`,
            display: "flex",
            flexDirection: "column",
          }}
        >

          <div
            style={{
              width: `calc(100% - ${sectionGap})`,
              height: `calc(100% - ${sectionGap.replace(/\d+/g, (match: string) => String(Number(match) * 2))})`,
              padding: `${sectionGap} ${sectionGap.replace(/\d+/g, (match: string) => String(Number(match) / 2))}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: sectionGap,
              backgroundColor: "inherit",
            }}
          >

            {experienceToggle && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap,
                }}
              >
                <Title text={headings.experience} />

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
              </div>
            )}

            {educationToggle && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap,
                }}
              >
                <Title text={headings.education} />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {education.map((item, index) => {
                    const { degree, institution, year } = item || {};
                    return (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: `calc(50% - ${gap})`,
                          display: "flex",
                          flexDirection: "column",
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
                          {degree}
                        </span>

                        <span
                          style={{
                            color: "inherit",
                            fontSize: bodyFontSize,
                            lineHeight: bodyLh,
                          }}
                        >
                          {institution}
                        </span>

                        <span
                          style={{
                            color: "inherit",
                            fontSize: bodyFontSize,
                            lineHeight: bodyLh,
                          }}
                        >
                          {year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {projectsToggle && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap,
                }}
              >
                <Title text={headings.projects} />

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
              </div>
            )}

            {skillsToggle && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap,
                }}
              >
                <Title text={headings.skills} />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {skills.map((item, index) => {
                    const { skill } = item || {};
                    return <SkillLang key={index} text={skill}></SkillLang>;
                  })}
                </div>
              </div>
            )}

            {languagesToggle && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap,
                }}
              >
                <Title text={headings.languages} />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {languages.map((item, index) => {
                    const { language } = item || {};
                    return <SkillLang key={index} text={language}></SkillLang>;
                  })}
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </TemplateWrapper>
  );
};

export default Template1;
