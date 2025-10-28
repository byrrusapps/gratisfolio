"use client";

import TemplateWrapper from "./TemplateWrapper";
import MyIcon from "./MyIcon";
import { ModeStyles } from "@/scripts/CV-Scripts/sizes";
import { CVData } from "@/providers/CreateContext";
import { toggleRender } from "@/scripts/CV-Scripts";
import { Fragment } from "react";
import Title2 from "./components/TitleVariant2";
import Education from "./components/Education";
import BulletPoint from "./components/BulletPoint";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Title1 from "./components/TitleVariant1";
import Title3 from "./components/TitleVariant3";

export interface TemplateProps {
  cvData: CVData;
  GenTheme: Record<string, any>;
  aspectRatio: string;
  size: ModeStyles;
  width: "string";
}

const Template3 = ({
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

  const Title = ({ text }: Record<string, any>) => (
    <Title1
      text={text}
      // divider={colors.divider}
      {...{
        unit,
        gap,
        titleFont,
        hdFontSize,
        hdLh,
      }}
    ></Title1>
  );

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
          width: `calc(100% - ${padding.replace(/\d+/g, (match: string) => String(Number(match) * 2))})`,
          height: `calc(100% - ${padding.replace(/\d+/g, (match: string) => String(Number(match) * 2))})`,
          padding,
          display: "flex",
          flexDirection: "column",
          gap: sectionGap,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              color: "inherit",
              fontSize: nmFontSize,
              fontFamily: titleFont,
              lineHeight: nmLh,
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
              }}
            >
              {profession.value}
            </span>
          )}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: sectionGap,
          }}
        >
          {avatar && showAvatar && (
            <img
              src={avatar}
              style={{
                width: `14${unit}`,
                height: "auto",
                borderRadius: "50%",
              }}
            ></img>
          )}

          {profileToggle && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap,
              }}
            >
              <Title text={headings.profile} />
              <Summary
                text={summary.value}
                alignStart={true}
                {...{ bodyFontSize, bodyLh }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            columnGap: sectionGap,
          }}
        >
          <div
            style={{
              position: "relative",
              flexGrow: "0",
              width: goldenRatio[0],
              maxWidth: goldenRatio[0],
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: sectionGap,
              alignItems: "center",
              color: "inherit",
            }}
          >
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
                    flexDirection: "column",
                    gap,
                  }}
                >
                  <Education
                  fullWidth={true}
                    {...{ education, titleFont, bodyFontSize, bodyLh, gap }}
                  />
                </div>
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
                    flexDirection: "column",
                  }}
                >
                  {skills.map((item, index) => {
                    const { skill } = item || {};
                    return (
                      <BulletPoint
                        key={index}
                        text={skill}
                        fullWidth={true}
                        {...{ bodyFontSize, bodyLh, unit, gap, titleFont }}
                      ></BulletPoint>
                    );
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
                    return (
                      <BulletPoint
                        key={index}
                        text={language}
                        fullWidth={true}
                        {...{ bodyFontSize, bodyLh, unit, gap, titleFont }}
                      ></BulletPoint>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              position: "relative",
              flexGrow: "0",
              width: goldenRatio[1],
              maxWidth: goldenRatio[1],
              height: `100%`,
              display: "flex",
              flexDirection: "column",
              gap: sectionGap,
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
                <Experience
                  {...{
                    experience,
                    unit,
                    titleFont,
                    bodyFontSize,
                    bodyLh,
                    gap,
                  }}
                />
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

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap,
                  }}
                >
                  <Projects
                    {...{
                      projects,
                      unit,
                      titleFont,
                      bodyFontSize,
                      bodyLh,
                      capFontSize,
                      capLh,
                      colors,
                    }}
                  />
                </div>
              </div>
            )}

            {contactToggle && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "end",
                  gap,
                }}
              >
                <Title text={headings.contact} />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
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
                          alignItems: "start",
                        }}
                      >
                        <span
                          style={{
                            color: "inherit",
                            fontSize: bodyFontSize,
                            fontFamily: titleFont,
                            lineHeight: bodyLh,
                            textAlign: "start",
                          }}
                        >
                          {headings?.[id as string]}
                        </span>
                        <span
                          style={{
                            color: "inherit",
                            fontSize: bodyFontSize,
                            lineHeight: bodyLh,
                            textAlign: "center",
                          }}
                        >
                          {value}
                        </span>
                      </div>
                    );
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

export default Template3;
