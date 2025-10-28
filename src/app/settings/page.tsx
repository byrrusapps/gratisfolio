"use client";

import { Wrapper } from "@/components";
import TopBar from "./topbar";
import Body from "./body";


const Settings = () => {
  return (
    <Wrapper
    sx={{
      paddingBottom:"1rem",
    }}
    >
      <TopBar />
      <Body>
      </Body>
    </Wrapper>
  );
};

export default Settings;