// CarouselDots.tsx
import { Box, ButtonBase } from "@mui/material";
import { KeyboardEvent } from "react";

interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function CarouselDots({ count, activeIndex, onSelect }: CarouselDotsProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect(index);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "0.5rem", mt: 1.5 }}>
      {count > 1 && Array.from({ length: count }).map((_, i) => {
        const active = i === activeIndex;
        return active ? (
          <Box
            key={i}
            component={ButtonBase}
            tabIndex={0}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            sx={{
              width: "1.25rem",
              height: "0.375rem",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              backgroundColor: "divider",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <Box sx={{ height: "inherit", aspectRatio: "1/1", borderRadius: "50%", bgcolor: "primary.main" }} />
          </Box>
        ) : (
          <Box
            key={i}
            component={ButtonBase}
            tabIndex={0}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            sx={{
              height: "0.375rem",
              aspectRatio: "1/1",
              borderRadius: "50%",
              backgroundColor: "divider",
              cursor: "pointer",
              outline: "none",
            }}
          />
        );
      })}
    </Box>
  );
}