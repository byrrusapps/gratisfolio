import CustomTheme from "./CustomTheme";

const Midnight: Record<string, any> = {
  ...CustomTheme({
    bgHex: "#0a050f", //#0c090f
    primary: "#bacf83",
    secondary: "#c2d4ff",
    onPrimary: "#273500",
    mode:"dark",
  }),
};

const Snow: Record<string, any> = {
  ...CustomTheme({
    bgHex: "#FFFFFF",
    primary: "#536525",
    secondary: "#c2d4ff",
    onPrimary: "#ffffff",
    mode:"light",
  }),
};

export { Midnight, Snow };
