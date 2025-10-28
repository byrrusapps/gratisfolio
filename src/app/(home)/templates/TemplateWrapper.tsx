"use client";

import { ModeStyles } from "@/scripts/CV-Scripts/sizes";
import { Fragment } from "react";

interface Wrapper {
  children: React.ReactNode;
  style?: React.CSSProperties;
  aspectRatio: string;
  Theme: Record<string, any>;
  bodyFont: string;
  size: ModeStyles;
  width: string;
}

const TemplateWrapper = (props: Wrapper) => {

const { children, style, aspectRatio, Theme, bodyFont, size, width } = props;

return(
<Fragment>

<style>
{`.byrrus-template p, span {
font-family: ${bodyFont};
}`}
</style>

<div
className="byrrus-template"
id="template"
style={{
position:"relative",
width:width,
aspectRatio,
display:"flex",
flexDirection:"column",
backgroundColor:Theme?.background?.default,
...style,
}}
>

{children}

</div>

</Fragment>
);

};

export default TemplateWrapper;

