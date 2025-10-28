import { getContrastRatio, hexToRgb } from "@mui/material";

type RgbArray = [number, number, number];
type Mode = "light" | "dark";

interface ArrangeLikeReferenceParams {
  numbers: RgbArray;
  diffPct: number;
  mode: Mode;
  ref: RgbArray;
}

interface CustomThemeParams {
  bgHex: string;
  mode?: Mode;
  primary: string;
  secondary: string;
  onPrimary: string;
}

interface ThemeFromPrimaryParams {
  mode: Mode;
  pri: string;
  secondary: string;
  onPrimary: string;
}

interface RatiosPct {
  paper: number;
  divider: number;
  text: number;
  grey: number;
  disabled: number;
}

interface ThemeColors {
  onPrimary: string;
  onSecondary: string;
}

interface Theme {
  mode: Mode;
  divider: string;
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
  background: {
    default: string;
    paper: string;
  };
  common: {
    white: string;
    black: string;
  };
  custom: {
    shadow: string;
    main: string;
    alt: string;
    white: string;
    black: string;
    grey: string;
    disabled: string;
    divider: string;
    paperDivider: string;
  };
  grey: {
    main: string;
    secondary: string;
    disabled: string;
  };
  colors: ThemeColors;
  myPaper: {
    main: string;
    grey: string;
    disabled: string;
    divider: string;
  };
}

/**
 * Arrange min/median/max of numbers to match reference positions
 */
const arrangeLikeReference = (numbers: RgbArray, reference: RgbArray): RgbArray => {
  const refMin = Math.min(...reference);
  const refMax = Math.max(...reference);
  const refMedian = reference.slice().sort((a, b) => a - b)[1];

  const numMin = Math.min(...numbers);
  const numMax = Math.max(...numbers);
  const numMedian = numbers.slice().sort((a, b) => a - b)[1];

  const roleMap: Record<number, number> = {};
  roleMap[refMin] = numMin;
  roleMap[refMax] = numMax;
  roleMap[refMedian] = numMedian;

  return reference.map(x => roleMap[x]) as RgbArray;
};

/**
 * Adjust colors based on percentage of background
 */
const addOrMinusPct = ({ numbers, diffPct, mode, ref }: ArrangeLikeReferenceParams): RgbArray => {
  const factor = (col: number): number =>
    mode === "light"
      ? Math.round(col - col * diffPct)
      : Math.round(col + (255 - col) * diffPct);
  const newNumbers = numbers.map(factor) as RgbArray;
  return arrangeLikeReference(newNumbers, ref);
};

/**
 * Convert RGB array to proper hex string
 */
const rgbArrayToHex = ([r, g, b]: RgbArray): string =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * Convert RGB array to CSS rgb() string (for shadows)
 */
const rgbArrayToRgbString = (arr: RgbArray | number[]): string => `rgb(${arr.join(",")})`;

const colorToArray = (col: string): RgbArray => {
  const toRgb = hexToRgb(col); // assumes hexToRgb returns something like "rgb(255, 0, 0)"
  
  return toRgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map(Number) as RgbArray; // convert each value from string to number
};

function customHalve(arr: RgbArray, mode: Mode): RgbArray {
  return arr.map(num => {
    const n = num;
    return Math.ceil(mode === "light" ? (255 - (n / 10)) : Math.ceil(n / 13));
  }) as RgbArray;
}

const getPrimary = (arr: RgbArray, mode: Mode): RgbArray => {
  return arr.map(num => {
    const n = num;
    return Math.ceil(mode === "dark" ? (255 - (n * 4)) : Math.ceil(n * 12));
  }) as RgbArray;
};

/**
 * Main theme generator
 */
const CustomTheme = ({ bgHex, mode = "light", primary, secondary, onPrimary }: CustomThemeParams): Theme => {
  const ratiosPct: RatiosPct = {
    paper: 0.07,
    divider: 0.13,
    text: 0.86,
    grey: 0.53,
    disabled: 0.24,
  };

  const bg = colorToArray(bgHex);
  const base = { mode, ref: bg };
  const convPrimary = colorToArray(primary);
  const convSecondary = colorToArray(primary);

  // Background variants
  const paper = addOrMinusPct({ numbers: bg, diffPct: ratiosPct.paper, ...base });
  const bgText = addOrMinusPct({ numbers: bg, diffPct: ratiosPct.text, ...base });
  const bgGrey = addOrMinusPct({ numbers: bg, diffPct: ratiosPct.grey, ...base });
  const bgDisabled = addOrMinusPct({ numbers: bg, diffPct: ratiosPct.disabled, ...base });

  const paperText = addOrMinusPct({ numbers: paper, diffPct: ratiosPct.text, ...base });
  const paperGrey = addOrMinusPct({ numbers: paper, diffPct: ratiosPct.grey, ...base });
  const paperDisabled = addOrMinusPct({ numbers: paper, diffPct: ratiosPct.disabled, ...base });

  const dividerColor = addOrMinusPct({ numbers: bg, diffPct: ratiosPct.divider, ...base });
  const paperDivider = addOrMinusPct({ numbers: paper, diffPct: ratiosPct.divider, ...base });

  /**
   * Pick contrast-safe text color
   * Uses hex strings for getContrastRatio
   */
  const pickContrastText = (
    color1: RgbArray,
    color2: RgbArray,
    lightColor: RgbArray = [255, 255, 255],
    darkColor: RgbArray = [0, 0, 0]
  ): string => {
    const col1 = rgbArrayToRgbString(color1);
    const col2 = rgbArrayToRgbString(color2);
    const light = rgbArrayToRgbString(lightColor);
    const dark = rgbArrayToRgbString(darkColor);
    
    const ratio1 = getContrastRatio(col1, col2);
    const ratio2 = getContrastRatio(light, col2);
    const ratio3 = getContrastRatio(dark, col2);

    if (ratio1 >= 4.5) return col1;
    return ratio2 > ratio3 ? light : dark;
  };

  const light = mode === "light" ? bg : bgText;
  const dark = mode !== "light" ? bg : bgText;

  const colors: ThemeColors = {
    onPrimary: onPrimary,
    onSecondary: convSecondary ? pickContrastText(convSecondary, bgText, light, dark) : rgbArrayToRgbString(bg),
  };

  // Shadows
  const shadowAlpha = mode === "light" ? 0.2 : 0.12;
  const shadowColor = mode === "light" ? bgText : paperText;

  const theme: Theme = {
    mode,
    divider: rgbArrayToHex(dividerColor),
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    background: {
      default: rgbArrayToHex(bg),
      paper: rgbArrayToHex(paper),
    },
    common: {
      white: mode === "light" ? rgbArrayToHex(bg) : rgbArrayToHex(bgText),
      black: mode !== "light" ? rgbArrayToHex(bg) : rgbArrayToHex(bgText),
    },
    custom: {
      shadow: `rgba(${shadowColor.join(",")}, ${shadowAlpha})`,
      main: rgbArrayToHex(bgText),
      alt: rgbArrayToHex(bg),
      white: mode === "light" ? rgbArrayToHex(bg) : rgbArrayToHex(bgText),
      black: mode !== "light" ? rgbArrayToHex(bg) : rgbArrayToHex(bgText),
      grey: rgbArrayToHex(bgGrey),
      disabled: rgbArrayToHex(bgDisabled),
      divider: rgbArrayToHex(dividerColor),
      paperDivider: rgbArrayToHex(paperDivider),
    },
    grey: {
      main: rgbArrayToHex(paperText),
      secondary: rgbArrayToHex(bgGrey),
      disabled: rgbArrayToHex(bgDisabled),
    },
    colors,
    myPaper: {
      main: rgbArrayToHex(paperText),
      grey: rgbArrayToHex(paperGrey),
      disabled: rgbArrayToHex(paperDisabled),
      divider: rgbArrayToHex(paperDivider),
    },
  };

  return theme;
};

const ThemeFromPrimary = ({ mode, pri, secondary, onPrimary }: ThemeFromPrimaryParams): Theme => {
  const convPrimary = colorToArray(pri);
  const halved = customHalve(convPrimary, mode);
  const bg = arrangeLikeReference(halved, convPrimary);
  const bgHex = rgbArrayToHex(bg);
  const primary = rgbArrayToHex(arrangeLikeReference(getPrimary(bg, mode), convPrimary));
  const palette = CustomTheme({ bgHex, mode, primary, secondary, onPrimary });
  
  return palette;
};

export default CustomTheme;
export { ThemeFromPrimary };
export type { Theme, Mode, RgbArray, CustomThemeParams, ThemeFromPrimaryParams };