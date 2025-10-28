interface LetterSpacing {
  none: string;
  medium: string;
  large: string;
}

interface TextStyle {
  font: string;
  lineHeight: number;
}

interface HeadingStyle extends TextStyle {
  letterSpacing: LetterSpacing;
}

interface BodyLayout {
  sectionGap: string;
  gap: string;
  padding: string;
  width: string;
}

interface Divider {
  height: string;
}

export interface ModeStyles {
  unit: string;
  name: TextStyle;
  profession: TextStyle;
  heading: HeadingStyle;
  body: TextStyle;
  caption: TextStyle;
  icon: TextStyle;
  bodyLayout: BodyLayout;
  divider: Divider;
}

export interface DensityStyles {
  print: ModeStyles;
  viewing: ModeStyles;
}

interface Sizes {
  goldenRatio: [string, string];
  compact: DensityStyles;
  spacious: DensityStyles;
}

// Unit variables for easy modification
const PRINT_UNIT = "em";
const VIEWING_UNIT = "vmin";
const PRINT_SPACING_UNIT = "mm";
const VIEWING_SPACING_UNIT = "vmin";

const sizes: Sizes = {
  goldenRatio: ["38.20%", "61.80%"],

  compact: {
    print: {
      unit: PRINT_UNIT,
      name:       { font: `2.2${PRINT_UNIT}`,   lineHeight: 1.05 },
      profession: { font: `1.35${PRINT_UNIT}`,  lineHeight: 1.15 },
      heading:    { 
        font: `1.15${PRINT_UNIT}`,  
        lineHeight: 1.25,  
        letterSpacing: {
          none: `0${PRINT_UNIT}`,
          medium: `0.05${PRINT_UNIT}`,
          large: `0.1${PRINT_UNIT}`
        }
      },
      body:       { font: `0.95${PRINT_UNIT}`,  lineHeight: 1.4  },
      caption:    { font: `0.8${PRINT_UNIT}`,   lineHeight: 1.3  },
      icon:       { font: `1.05${PRINT_UNIT}`,  lineHeight: 1    },
      bodyLayout: { 
        sectionGap: `8${PRINT_SPACING_UNIT}`, 
        gap: `3${PRINT_SPACING_UNIT}`, 
        padding: `10${PRINT_SPACING_UNIT}`,
        width: "210mm",
      },
      divider:    { height: `0.25${PRINT_SPACING_UNIT}` }
    },

    viewing: {
      unit: VIEWING_UNIT,
      name:       { font: `4${VIEWING_UNIT}`,     lineHeight: 1.05 },
      profession: { font: `2.5${VIEWING_UNIT}`,   lineHeight: 1.15 },
      heading:    { 
        font: `2${VIEWING_UNIT}`,     
        lineHeight: 1.25,
        letterSpacing: {
          none: `0${VIEWING_UNIT}`,
          medium: `0.05${VIEWING_UNIT}`,
          large: `0.1${VIEWING_UNIT}`
        }
      },
      body:       { font: `1.6${VIEWING_UNIT}`,   lineHeight: 1.4  },
      caption:    { font: `1.3${VIEWING_UNIT}`,   lineHeight: 1.3  },
      icon:       { font: `1.8${VIEWING_UNIT}`,   lineHeight: 1    },
      bodyLayout: { 
        sectionGap: `4${VIEWING_SPACING_UNIT}`, 
        gap: `1.2${VIEWING_SPACING_UNIT}`, 
        padding: `5${VIEWING_SPACING_UNIT}`,
        // width: `calc(100% - 4${VIEWING_UNIT})`,
        width: "210mm",

      },
      divider:    { height: `0.1${VIEWING_SPACING_UNIT}` }
    }
  },

  spacious: {
    print: {
      unit: PRINT_UNIT,
      name:       { font: `2.8${PRINT_UNIT}`,   lineHeight: 1.15 },
      profession: { font: `1.65${PRINT_UNIT}`,  lineHeight: 1.25 },
      heading:    { 
        font: `1.35${PRINT_UNIT}`,  
        lineHeight: 1.4,
        letterSpacing: {
          none: `0${PRINT_UNIT}`,
          medium: `0.05${PRINT_UNIT}`,
          large: `0.1${PRINT_UNIT}`
        }
      },
      body:       { font: `1.05${PRINT_UNIT}`,  lineHeight: 1.6  },
      caption:    { font: `0.9${PRINT_UNIT}`,   lineHeight: 1.5  },
      icon:       { font: `1.15${PRINT_UNIT}`,  lineHeight: 1.05 },
      bodyLayout: { 
        sectionGap: `10${PRINT_SPACING_UNIT}`, 
        gap: `4${PRINT_SPACING_UNIT}`, 
        padding: `15${PRINT_SPACING_UNIT}`,
        width: "210mm",
      },
      divider:    { height: `0.25${PRINT_SPACING_UNIT}` }
    },

    viewing: {
      unit: VIEWING_UNIT,
      name:       { font: `5${VIEWING_UNIT}`,     lineHeight: 1.15 },
      profession: { font: `3${VIEWING_UNIT}`,     lineHeight: 1.25 },
      heading:    { 
        font: `2.4${VIEWING_UNIT}`,   
        lineHeight: 1.4,
        letterSpacing: {
          none: `0${VIEWING_UNIT}`,
          medium: `0.05${VIEWING_UNIT}`,
          large: `0.1${VIEWING_UNIT}`
        }
      },
      body:       { font: `1.8${VIEWING_UNIT}`,   lineHeight: 1.6  },
      caption:    { font: `1.5${VIEWING_UNIT}`,   lineHeight: 1.5  },
      icon:       { font: `2${VIEWING_UNIT}`,     lineHeight: 1.05 },
      bodyLayout: { 
        sectionGap: `5${VIEWING_SPACING_UNIT}`, 
        gap: `1.6${VIEWING_SPACING_UNIT}`, 
        padding: `6${VIEWING_SPACING_UNIT}`,
        // width: `calc(100% - 4${VIEWING_UNIT})`,
        width: "210mm",
      },
      divider:    { height: `0.1${VIEWING_SPACING_UNIT}` }
    }
  }
};

export default sizes;