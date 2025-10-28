// -------------------- Types --------------------
import type { PaletteMode, PaletteOptions } from '@mui/material';

interface HSL {
  h: number;
  s: number;
  l: number;
}

type ColorScheme = 'tonal' | 'vibrant' | 'expressive' | 'neutral';

interface ThemeInput {
  background: string;
  primary: string;
  secondary?: string;
  tertiary?: string;
  scheme?: ColorScheme;
  contrastLevel?: 'standard' | 'medium' | 'high';
}

interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

interface ExtendedPaletteOptions extends PaletteOptions {
  mode: PaletteMode;
  primary: PaletteColor;
  secondary: PaletteColor;
  tertiary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  background: {
    default: string;
    paper: string;
    elevated?: string;
    elevated2?: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    focus: string;
  };
  surface?: {
    default: string;
    dim: string;
    bright: string;
    container: string;
    containerLow: string;
    containerHigh: string;
    containerHighest: string;
  };
}

// -------------------- Utility Functions --------------------

/**
 * Convert hex color to HSL
 */
function hexToHSL(hex: string): HSL {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('Invalid hex color');

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to hex color
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate tonal palette from base color
 */
function generateTonalPalette(baseColor: string, scheme: ColorScheme): Record<number, string> {
  const hsl = hexToHSL(baseColor);
  
  // Adjust saturation based on scheme
  let saturationMultiplier = 1;
  switch (scheme) {
    case 'vibrant':
      saturationMultiplier = 1.2;
      break;
    case 'expressive':
      saturationMultiplier = 1.4;
      break;
    case 'neutral':
      saturationMultiplier = 0.3;
      break;
    case 'tonal':
    default:
      saturationMultiplier = 1;
  }

  const adjustedSaturation = Math.min(100, hsl.s * saturationMultiplier);

  // M3 tonal values
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  const palette: Record<number, string> = {};

  tones.forEach(tone => {
    palette[tone] = hslToHex(hsl.h, adjustedSaturation, tone);
  });

  return palette;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = hexToHSL(hex);
    const [r, g, b] = [rgb.h, rgb.s, rgb.l].map(val => {
      const sRGB = val / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Get appropriate contrast text color
 */
function getContrastText(backgroundColor: string, contrastLevel: 'standard' | 'medium' | 'high' = 'standard'): string {
  const hsl = hexToHSL(backgroundColor);
  
  // Determine if background is light or dark
  const isDark = hsl.l < 50;
  
  // Adjust contrast based on level
  let lightness = isDark ? 95 : 10;
  if (contrastLevel === 'medium') {
    lightness = isDark ? 98 : 5;
  } else if (contrastLevel === 'high') {
    lightness = isDark ? 100 : 0;
  }
  
  return hslToHex(hsl.h, 0, lightness);
}

/**
 * Determine if background is light mode
 */
function isLightMode(backgroundColor: string): boolean {
  const hsl = hexToHSL(backgroundColor);
  return hsl.l > 50;
}

/**
 * Generate secondary color if not provided
 */
function deriveSecondaryColor(primaryColor: string): string {
  const hsl = hexToHSL(primaryColor);
  // Shift hue by 30-60 degrees for complementary feel
  const newHue = (hsl.h + 40) % 360;
  return hslToHex(newHue, hsl.s * 0.8, hsl.l);
}

/**
 * Generate tertiary color if not provided
 */
function deriveTertiaryColor(primaryColor: string, secondaryColor: string): string {
  const primaryHsl = hexToHSL(primaryColor);
  const secondaryHsl = hexToHSL(secondaryColor);
  
  // Tertiary is typically between primary and secondary
  const newHue = (primaryHsl.h + secondaryHsl.h) / 2 + 60;
  const avgSaturation = (primaryHsl.s + secondaryHsl.s) / 2;
  const avgLightness = (primaryHsl.l + secondaryHsl.l) / 2;
  
  return hslToHex(newHue % 360, avgSaturation, avgLightness);
}

/**
 * Create palette color object
 */
function createPaletteColor(
  palette: Record<number, string>,
  isLight: boolean,
  contrastLevel: 'standard' | 'medium' | 'high' = 'standard'
): PaletteColor {
  const main = isLight ? palette[40] : palette[80];
  const light = isLight ? palette[80] : palette[60];
  const dark = isLight ? palette[30] : palette[90];
  const contrastText = getContrastText(main, contrastLevel);

  return { main, light, dark, contrastText };
}

// -------------------- Main Theme Generator --------------------

const MaterialYouTheme = (input: ThemeInput): ExtendedPaletteOptions => {
  const {
    background,
    primary,
    secondary = deriveSecondaryColor(primary),
    tertiary = deriveTertiaryColor(primary, secondary),
    scheme = 'tonal',
    contrastLevel = 'standard'
  } = input;

  const isLight = isLightMode(background);
  const mode: PaletteMode = isLight ? 'light' : 'dark';

  // Generate tonal palettes
  const primaryPalette = generateTonalPalette(primary, scheme);
  const secondaryPalette = generateTonalPalette(secondary, scheme);
  const tertiaryPalette = generateTonalPalette(tertiary, scheme);
  const neutralPalette = generateTonalPalette(background, 'neutral');
  const errorPalette = generateTonalPalette('#BA1A1A', scheme);

  // Create palette colors
  const primaryColor = createPaletteColor(primaryPalette, isLight, contrastLevel);
  const secondaryColor = createPaletteColor(secondaryPalette, isLight, contrastLevel);
  const tertiaryColor = createPaletteColor(tertiaryPalette, isLight, contrastLevel);
  const errorColor = createPaletteColor(errorPalette, isLight, contrastLevel);
  
  // Warning (amber-based)
  const warningPalette = generateTonalPalette('#F59E0B', scheme);
  const warningColor = createPaletteColor(warningPalette, isLight, contrastLevel);
  
  // Info (blue-based)
  const infoPalette = generateTonalPalette('#0EA5E9', scheme);
  const infoColor = createPaletteColor(infoPalette, isLight, contrastLevel);
  
  // Success (green-based)
  const successPalette = generateTonalPalette('#10B981', scheme);
  const successColor = createPaletteColor(successPalette, isLight, contrastLevel);

  // Background colors
  const backgroundColors = {
    default: isLight ? neutralPalette[99] : neutralPalette[10],
    paper: isLight ? neutralPalette[99] : neutralPalette[10],
    elevated: isLight ? neutralPalette[95] : neutralPalette[20],
    elevated2: isLight ? neutralPalette[90] : neutralPalette[30],
  };

  // Text colors
  const textColors = {
    primary: isLight ? neutralPalette[10] : neutralPalette[90],
    secondary: isLight ? neutralPalette[30] : neutralPalette[70],
    disabled: isLight ? neutralPalette[40] : neutralPalette[60],
  };

  // Surface colors (M3 specific)
  const surfaceColors = {
    default: isLight ? neutralPalette[99] : neutralPalette[10],
    dim: isLight ? neutralPalette[90] : neutralPalette[20],
    bright: isLight ? neutralPalette[100] : neutralPalette[30],
    container: isLight ? neutralPalette[95] : neutralPalette[30],
    containerLow: isLight ? neutralPalette[99] : neutralPalette[20],
    containerHigh: isLight ? neutralPalette[90] : neutralPalette[40],
    containerHighest: isLight ? neutralPalette[80] : neutralPalette[50],
  };

  // Action colors
  const actionColors = {
    active: isLight ? neutralPalette[40] : neutralPalette[80],
    hover: isLight ? `${neutralPalette[10]}14` : `${neutralPalette[90]}14`,
    selected: isLight ? `${primaryPalette[40]}1F` : `${primaryPalette[80]}1F`,
    disabled: isLight ? `${neutralPalette[10]}61` : `${neutralPalette[90]}61`,
    disabledBackground: isLight ? `${neutralPalette[10]}1F` : `${neutralPalette[90]}1F`,
    focus: isLight ? `${primaryPalette[40]}1F` : `${primaryPalette[80]}1F`,
  };

  return {
    mode,
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    error: errorColor,
    warning: warningColor,
    info: infoColor,
    success: successColor,
    background: backgroundColors,
    text: textColors,
    divider: isLight ? `${neutralPalette[10]}1F` : `${neutralPalette[90]}1F`,
    action: actionColors,
    surface: surfaceColors,
  };
};

export default MaterialYouTheme;