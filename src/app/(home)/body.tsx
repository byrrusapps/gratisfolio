"use client";

import { Fragment } from "react";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { MyIcon } from "@/components";
import { useCreate } from "@/providers/CreateContext";
import { useFontLinks } from "@/hooks";
import { useApp } from "@/providers/AppContext";

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({children}: BodyProps) => {

  const theme = useTheme();
  const { setDrawer, setDrawerView, setInfo } = useApp();
  const { pos, setPos, bodyFont, titleFont, profileList, setProfileId, } = useCreate();
  const titleFontUrl = `https://fonts.googleapis.com/css2?family=${titleFont
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("+")}&display=swap`;
  const bodyFontUrl = `https://fonts.googleapis.com/css2?family=${bodyFont
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("+")}&display=swap`;
  useFontLinks(titleFontUrl, bodyFontUrl);

  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          alignSelf: "center",
          // backgroundColor: "background.paper",
          paddingBottom: "6rem",
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Header Bar */}
        <Box
          sx={{
            margin: "2rem 0 1rem 0",
            width: "calc(100% - 2rem)",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "2rem",
          }}
        >
          <ButtonBase
          onClick={() => {
            setDrawer(true);
            setDrawerView("load-profile");
            setInfo({profileList, setProfileId});
          }}
            sx={{
              padding: "0.5rem 1rem",
              color: "myPaper.main",
              gap: "0.25rem",
              backgroundColor: "background.paper",
              borderRadius: "inherit",
            }}
          >
            <MyIcon>keyboard_arrow_down</MyIcon>
            <Typography>Load Profile</Typography>
          </ButtonBase>

          <ButtonBase
            onClick={() => {
              if (pos === 0) {
                setPos(1);
              } else {
                setPos(0);
              }
            }}
            sx={{
              padding: "0.5rem 1rem",
              color: "myPaper.main",
              gap: "0.25rem",
              backgroundColor: "background.paper",
              borderRadius: "inherit",
            }}
          >
            <Typography>{pos === 0 ? "Edit Mode" : "Preview Mode"}</Typography>
            <MyIcon>{pos === 0 ? "edit_square" : "preview"}</MyIcon>
          </ButtonBase>
        </Box>

        {children}
      </Box>
    </Fragment>
  );
};

export default Body;