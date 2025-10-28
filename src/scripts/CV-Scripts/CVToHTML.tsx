import ReactDOMServer from "react-dom/server";
import React from "react";

// Constrain T so it can be used as JSX props
interface CVToHTMLProps<T extends React.JSX.IntrinsicAttributes> {
  Template: React.ComponentType<T>; // Component type
  props: T;                        // Props must extend IntrinsicAttributes
  bodyFont: string;
  titleFont: string;
}

export default function CVToHTML<T extends React.JSX.IntrinsicAttributes>({
  Template,
  props,
  bodyFont,
  titleFont,
}: CVToHTMLProps<T>) {
  const Element = <Template {...props} />; // ✅ now type-safe
  const html = ReactDOMServer.renderToStaticMarkup(Element);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>CV</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link href="https://fonts.googleapis.com/css2?family=${bodyFont}&family=${titleFont}&display=swap" rel="stylesheet">
        <style>
          body { font-family: ${bodyFont.replaceAll("+", " ")}; margin: 0; padding: 0; }
          * { margin: 0; padding: 0; }
          .material-symbols-rounded {
  font-family: 'Material Symbols Rounded';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  direction: ltr;
  text-transform: lowercase;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* Outlined version */
.rounded-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

/* Filled version */
.rounded-filled {
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.rounded-thin {
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' 0,
    'opsz' 24;
}

.rounded-thin-filled {
  font-variation-settings:
    'FILL' 1,
    'wght' 100,
    'GRAD' 0,
    'opsz' 24;
}
        </style>
      </head>
      <body>${html}</body>
    </html>
  `;
}
