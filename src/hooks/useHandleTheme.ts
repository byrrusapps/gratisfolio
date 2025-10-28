import { useEffect, useCallback } from "react";
import { Midnight, Snow } from "../scripts";

type ThemeMode = "Automatic" | "Dark" | "Light" | string;
type Theme = Record<string, any>;

interface UseHandleThemeParams {
  setAppTheme: (theme: Theme) => void;
  dynamicTheme: ThemeMode;
}

const useHandleTheme = ({ setAppTheme, dynamicTheme }: UseHandleThemeParams): void => {
  const updateMetaTheme = useCallback((theme: Theme) => {
    const metaElement = document.getElementById("meta-theme") as HTMLMetaElement | null;
    if (metaElement) {
      metaElement.content = theme.background.default;
    }
  }, []);

  const dynamicThemeFunc = useCallback(
    (e: MediaQueryListEvent) => {
      if (dynamicTheme === "Automatic") {
        const theme = e.matches ? Midnight : Snow;
        updateMetaTheme(theme);
        setAppTheme(theme);
      }
    },
    [dynamicTheme, updateMetaTheme, setAppTheme]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Initial theme setup
    if (dynamicTheme === "Automatic") {
      const theme = mediaQuery.matches ? Midnight : Snow;
      setAppTheme(theme);
      updateMetaTheme(theme);
    } else {
      // For manually set themes, update meta-theme immediately
      const theme = dynamicTheme === "Dark" ? Midnight : Snow;
      setAppTheme(theme);
      updateMetaTheme(theme);
    }

    // Listen for changes when theme is automatic
    if (dynamicTheme === "Automatic") {
      mediaQuery.addEventListener("change", dynamicThemeFunc);
    }

    return () => {
      if (dynamicTheme === "Automatic") {
        mediaQuery.removeEventListener("change", dynamicThemeFunc);
      }
    };
  }, [dynamicTheme, dynamicThemeFunc, setAppTheme, updateMetaTheme]);
};

export default useHandleTheme;