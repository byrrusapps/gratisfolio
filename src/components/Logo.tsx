import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import MyIcon from "./MyIcon";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

const Logo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!logoRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(logoRef.current, {
        backgroundColor: "#273500",
        scale: 3,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `gratisfolio-logo-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
        setDownloading(false);
      });
    } catch (error) {
      console.error("Download failed:", error);
      setDownloading(false);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        ref={logoRef}
        sx={{
          width: "500px",
          aspectRatio: "1/1",
          color: "#bacf83",
          backgroundColor: "#273500",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          position: "relative",
          overflow: "hidden",
          // Subtle gradient background
          background: "linear-gradient(135deg, #273500 0%, #1a2400 100%)",
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: "absolute",
            width: "150%",
            height: "150%",
            top: "-25%",
            left: "-25%",
            opacity: 0.03,
            pointerEvents: "none",
          }}
        >
          <MyIcon
            sx={{
              fontSize: "80vmin",
              color: "#bacf83",
            }}
          >
            work_update
          </MyIcon>
        </Box>

        {/* Main logo container */}
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "center",
            border: "1.2vmin solid currentColor",
            borderRight: "none",
            borderRadius: "1vmin 0 0 1vmin",
            padding: "1vmin 2vmin 1vmin 1vmin",
            backgroundColor: "rgba(39, 53, 0, 0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "22vmin",
              fontFamily: "Audiowide",
              lineHeight: "1",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "-0.05em",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            GF
          </Typography>
          <MyIcon
            className="rounded-thin-filled"
            sx={{
              fontSize: "22vmin",
              lineHeight: "1",
              zIndex: 2,
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))",
            }}
          >
            work_update
          </MyIcon>
        </Box>

        {/* Tagline */}
        <Typography
          sx={{
            fontSize: "3vmin",
            fontFamily: "Audiowide",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#bacf83",
            opacity: 0.8,
            fontWeight: 300,
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          Portfolio Builder
        </Typography>
      </Box>

      {/* Download Button */}
      <IconButton
        onClick={handleDownload}
        disabled={downloading}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          bgcolor: "rgba(186, 207, 131, 0.9)",
          color: "#273500",
          "&:hover": {
            bgcolor: "#bacf83",
            transform: "scale(1.05)",
          },
          transition: "all 0.2s",
          "&.Mui-disabled": {
            bgcolor: "rgba(186, 207, 131, 0.4)",
          },
        }}
      >
        {downloading ? (
          <CircularProgress size={24} sx={{ color: "#273500" }} />
        ) : (
          <MyIcon>download</MyIcon>
        )}
      </IconButton>
    </Box>
  );
};

export default Logo;