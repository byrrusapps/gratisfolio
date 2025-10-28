import MaterialYouTheme from "./MaterialYouTheme";

const Midnight: Record<string, any> = {
  ...MaterialYouTheme({
    background: "#0c0814",
    primary: "#c2d4ff",
    scheme: "vibrant",
  }),
};

const Snow: Record<string, any> = {
  ...MaterialYouTheme({
    background: "#ffffff",
    primary: "#c2d4ff",
  }),
};

export { Midnight, Snow };
