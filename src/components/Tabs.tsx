// Tabs.tsx
import { useCreate } from "@/providers/CreateContext";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface Tab {
  text: string;
  icon: string;
}

interface TabsProps {
  pos: number;
  setPos: (index: number) => void;
  array?: Tab[];
  sx?: SxProps<Theme>;
  noClick?: boolean;
}

const Tabs = ({ array, sx, noClick = false, pos, setPos }: TabsProps) => {
  const theme = useTheme();

  const tabs: Tab[] = array || [
    {
      text: "Share",
      icon: "music_note",
    },
    {
      text: "Referrals",
      icon: "music_note",
    },
  ];

  return (
    <>
        <Box
          id="tab-container"
          sx={{
            position: "relative",
            width: `calc(100% - 4rem)`,
            height: "fit-content",
            padding:"0.25rem 1rem",
            backgroundColor: "background.paper",
            borderRadius:"2rem",
            alignSelf:"center",
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
          }}
        >
          {tabs.map((tab, index) => (
            <ButtonBase
              key={`tab ${index}`}
              id={`tab ${index}`}
              onClick={() => {
                if (!noClick) {
                  setPos(index);
                }
              }}
              sx={{
                position: "relative",
                flexShrink: "0",
                width: `${100 / tabs.length}%`,
                height: "inherit",
                padding:"0.25rem 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: index === pos ? "primary.main" : "custom.grey",
                columnGap: "1rem",
                scrollSnapAlign: "start",
                backgroundColor:index === pos ? "divider" : "inherit",
                borderRadius:"2rem",
              }}
            >
              <Typography
                sx={{
                  position: "relative",
                  width: `auto`,
                  height: "auto",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "inherit",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  // fontWeight: index === pos ? "bold" : "normal",
                }}
              >
                {tab.text}
              </Typography>
            </ButtonBase>
          ))}
        </Box>
    </>
  );
};

export default Tabs;