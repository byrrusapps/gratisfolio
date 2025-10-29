// app\(home)\preview\preview.tsx

"use client";

import { Fragment, useState } from "react";
import Template1 from "../templates/Template1";
import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { MyIcon } from "@/components";
import CVToHTML from "@/scripts/CV-Scripts/CVToHTML"; // Import directly
import { useCreate } from "@/providers/CreateContext";
import { sizes } from "@/scripts/CV-Scripts";
import { useCarouselObserver } from "@/hooks";
import CarouselDots from "@/components/CarouselDots";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import { FS } from "@/scripts";
import { increment, Timestamp } from "firebase/firestore";

const Preview = () => {
  const { bodyFont, titleFont, cvData, GenTheme, aspectRatio, layout } =
    useCreate();

    const [loading, setLoading] = useState<boolean>(false);

  const { containerRef, registerItem, activeIndex, scrollToIndex } =
    useCarouselObserver({
      threshold: 0.6,
      axis: "x",
    });

  const titleFontUrl = `${titleFont
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("+")}`;
  const bodyFontUrl = `${bodyFont
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("+")}`;

  const size = sizes?.[layout as "spacious" | "compact"]?.viewing;

  const Elements: Array<React.ComponentType<any>> = [Template1, Template2, Template3];

  return (
    <Fragment>
      <Box
        ref={containerRef}
        sx={{
          width:"100%",
          display: "flex",
          alignItems: "center",
          overflowX: "scroll",
          overflowY: "scroll",
          scrollSnapType: "x mandatory",
        }}
      >
        {Elements.map((el, index) => {
          const Element = el;
          const toRender = (
            <Element
              GenTheme={GenTheme}
              cvData={cvData}
              aspectRatio={aspectRatio}
              width={`calc(100% - 2rem)`}
              size={size}
            />
          );

          return (
            <Box
              key={index}
              ref={registerItem(index)}
            sx={{
              position:"relative",
              width:"100%",
              height:"auto",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              flexShrink:"0",
              scrollSnapAlign:"start",
            }}
            >
              {toRender}
              </Box>
          );
        })}
      </Box>

      <CarouselDots
        count={Elements.length}
        activeIndex={activeIndex}
        onSelect={(i) => scrollToIndex(i)}
      />

      <ButtonBase
        disabled={loading}
        onClick={async () => {
          const selectedTemp = activeIndex + 1;
          setLoading(true);
          const props = {
            GenTheme,
            cvData,
            aspectRatio,
            size: sizes?.[layout as "spacious" | "compact"]?.viewing,
            width: "210mm",
          };

          const html = CVToHTML({
            Template: Elements[activeIndex], // Template1, typed as React.ComponentType<{GenTheme, cvData}>
            props,
            bodyFont: bodyFontUrl,
            titleFont: titleFontUrl,
          });

          const res = await fetch("https://generatecvpdf-tk5xei3ykq-uc.a.run.app/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ html }),
          });

          setLoading(false);

          if (!res.ok) {
            const error = await res
              .json()
              .catch(() => ({ error: "Unknown error" }));
            return alert(`Failed to generate CV: ${error.error}`);
          }

          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "cv.pdf";
          a.click();
          window.URL.revokeObjectURL(url);

          FS.batch({
            operations:[
              {
                type:"update",
                path:`/resume-downloads/analytics`,
                merge:true,
                data:{
                  [`template${selectedTemp}`]: increment(1),
                  lastUpdated: Timestamp.now(),
                }
              }
            ]
          })
        }}
        sx={{
          margin:"2rem 0 0 0",
          width: "calc(100% - 2rem)",
          padding: "0.5rem 1rem",
          backgroundColor: "primary.main",
          color: "colors.onPrimary",
          borderRadius: "2rem",
          gap: "0.25rem",
            "&.Mui-disabled": {
            backgroundColor: "grey.disabled",
            color: "grey.main",
            opacity: 0.5,
          },
        }}
      >
        {loading? (
          <CircularProgress variant="indeterminate" size="1rem" />
        )
        :
        (
          <Fragment>
                    <MyIcon>download</MyIcon>
        <Typography>Download Resume</Typography>
          </Fragment>
        )
      }

      </ButtonBase>
    </Fragment>
  );
};

export default Preview;
