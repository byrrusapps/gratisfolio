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

export interface TemplateProps {
  cvData: CVData;
  GenTheme: Record<string, any>;
  aspectRatio: string;
  size: ModeStyles;
  width: "string";
}

const Template2 = ({
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

    const Title = ({text}: Record<string, any>) => <Title2 text={text} {...{ 
    unit, gap, titleFont, hdFontSize, hdLh}}></Title2>;

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
          gap,
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
            alignItems: "center",
            color: "inherit",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <span
              style={{
                color: colors.primary,
                fontSize: nmFontSize,
                fontFamily: titleFont,
                lineHeight: 0.5,
                textAlign: "center",
              }}
            >
              {name.value.split(" ")?.[0]}
            </span>

            <span
              style={{
                color: "inherit",
                fontSize: nmFontSize,
                fontFamily: titleFont,
                lineHeight: nmLh,
                textAlign: "center",
              }}
            >
              {name.value?.split(" ")?.slice(1).join(" ")}
            </span>

            {professionToggle && (
              <div
                style={{
                  width: "fit-content",
                  aspectRatio: "1/1",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1${unit} solid ${colors.primary}`,
                  borderRadius: "50%",
                }}
              >
                <span
                  style={{
                    width: "fit-content",
                    padding: `0 2${unit}`,
                    color: colors.grey,
                    fontSize: bodyFontSize,
                    lineHeight: bodyLh,
                    textAlign:"center",
                  }}
                >
                  {profession.value}
                </span>
              </div>
            )}

            {avatar && showAvatar ? (
              <img
                src={avatar}
                style={{
                  margin: `-6${unit} 0 0 0`,
                  width: "50%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  alignSelf: "start",
                }}
              ></img>
            ) : (
              <div
                style={{
                  margin: `-6${unit} 0 0 0`,
                  width: "50%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  alignSelf: "start",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor: colors.paper,
                  color:colors.primary,
                }}
              >
                <MyIcon
                filled={true}
                >person</MyIcon>
              </div>
            )}

          </div>

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
                  {...{education, titleFont, bodyFontSize, bodyLh, gap}}
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
                    return <BulletPoint key={index} text={skill} fullWidth={true}
                    {...{bodyFontSize,
                      bodyLh, unit, gap, titleFont
                    }}>

                    </BulletPoint>
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
                    return <BulletPoint key={index} text={language} fullWidth={true}
                     {...{bodyFontSize,
                      bodyLh, unit, gap, titleFont,
                    }}></BulletPoint>;
                  })}
              </div>
            </div>
          )}
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
            gap: sectionGap,
          }}
        >
          {contactToggle && (
            <div
              style={{
                width: "fit-content",
                display: "flex",
                alignSelf: "end",
                gap: `0.5${unit}`,
              }}
            >
              <span
                style={{
                  width: "fit-content",
                  color: "inherit",
                  fontSize: hdFontSize,
                  fontFamily: titleFont,
                  lineHeight: hdLh,
                  backgroundColor: "inherit",
                  //   letterSpacing: `0.25${unit}`,
                }}
              >
                {headings.contact}
              </span>
              <div
                style={{
                  width: `0.1${unit}`,
                  height: `100%`,
                  //   paddingBottom: `4${unit}`,
                  backgroundColor: colors.primary,
                }}
              ></div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                {contact.map((item, index) => {
                  const { value, id } = item || {};

                  return (
                    <span
                      key={index}
                      style={{
                        color: "inherit",
                        fontSize: bodyFontSize,
                        // fontWeight: "bold",
                        lineHeight: bodyLh,
                        textAlign: "center",
                      }}
                    >
                      {headings?.[id as string].charAt(0).toLocaleUpperCase()}:{" "}
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {profileToggle && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                //   gap,
              }}
            >
              <Title text={headings.profile} />
                          <Summary
                text={summary.value}
                alignStart={true}
                {...{bodyFontSize, bodyLh}}
                />
            </div>
          )}

          {experienceToggle && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                //   gap,
              }}
            >
              <Title text={headings.experience} />
                              <Experience
                {...{
                  experience, unit, titleFont, bodyFontSize, bodyLh, gap
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
                {...{projects, unit, titleFont, bodyFontSize, bodyLh, capFontSize, capLh, colors}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </TemplateWrapper>
  );
};

export default Template2;
