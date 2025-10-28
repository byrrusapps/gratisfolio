import { Fragment } from "react";

interface EduProps {
education: Record<string, string>[];
titleFont: string;
bodyFontSize: string;
bodyLh: number;
gap: string | number;
fullWidth?: boolean;
}

const Education = ({education, titleFont, bodyFontSize,
bodyLh, gap, fullWidth,
}:EduProps) => {

return(
<Fragment>
                  {education.map((item, index) => {
                    const { degree, institution, year } = item || {};
                    return (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: fullWidth ? "100%" : `calc(50% - ${gap})`,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            color: "inherit",
                            fontFamily: titleFont,
                            fontSize: bodyFontSize,
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
</Fragment>
)

}

export default Education;