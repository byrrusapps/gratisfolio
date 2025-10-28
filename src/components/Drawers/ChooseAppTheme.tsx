import { Box, ButtonBase, Typography } from "@mui/material";
import { useApp } from "@/providers/AppContext";
import MyIcon from "../MyIcon";

interface Theme {
  id: string;
  text: string;
  sub: string;
}

const THEMES: readonly Theme[] = [
  {
    id: "Automatic",
    text: "Device Settings",
    sub: "Use your device's default mode",
  },
  {
    id: "Dark",
    text: "Dark Mode",
    sub: "Always use dark mode",
  },
  {
    id: "Light",
    text: "Light Mode",
    sub: "Always use light mode",
  },
] as const;

const ChooseAppTheme = () => {
  const { setDynamicTheme, dynamicTheme } = useApp();

  return (
    <Box
      sx={{
        py: 4,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {THEMES.map(({ id, text, sub }) => {
        const isSelected = dynamicTheme.toLowerCase() === id.toLowerCase();

        return (
          <ButtonBase
            key={id}
            onClick={() => setDynamicTheme(id)}
            sx={{
              width: "calc(100% - 1rem)",
              p: "0.5rem 1rem",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: isSelected ? "background.paper" : "background.default",
              textAlign: "start",
              borderRadius: 2,
              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: isSelected ? "background.paper" : "action.hover",
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: isSelected ? "myPaper.main" : "custom.main",
                }}
              >
                {text}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: isSelected ? "myPaper.grey" : "custom.grey",
                }}
              >
                {sub}
              </Typography>
            </Box>

            {isSelected && (
              <MyIcon sx={{ color: "primary.main" }}>check</MyIcon>
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

export default ChooseAppTheme;