"use client";

import { Wrapper } from "@/components";
import TopBar from "./topbar";
import { CreateProvider, useCreate } from "@/providers/CreateContext";
import Edit from "./edit/edit";
import Preview from "./preview/preview";
import Body from "./body";

interface TabsMap {
  [key: number]: React.ComponentType;
}

const CreateContent = () => {
  const { pos } = useCreate();

  const tabs: TabsMap = {
    0: Edit,
    1: Preview,
  };

  const Element = tabs[pos];

  return (
    <Wrapper>
      <TopBar />
      <Body>
        <Element />
      </Body>
    </Wrapper>
  );
};

const Create = () => {
  return (
    <CreateProvider>
      <CreateContent />
    </CreateProvider>
  );
};

export default Create;