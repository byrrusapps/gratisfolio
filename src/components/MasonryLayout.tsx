// MasonryLayout.tsx
import * as React from "react";
import { Box, BoxProps, useMediaQuery, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

type ColumnsConfig = number | {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type GapConfig = number | {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

interface MasonryLayoutProps<T = any> extends Omit<BoxProps, 'sx'> {
  items?: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: ColumnsConfig;
  gap?: GapConfig;
  loading?: boolean;
  renderSkeleton?: (index: number) => React.ReactNode;
  skeletonCount?: number;
  strategy?: "css" | "deterministic";
  sx?: SxProps<Theme>;
}

export default function MasonryLayout<T = any>({
  items = [],
  renderItem,
  columns = { xs: 1, sm: 2, md: 2, lg: 3 },
  gap = 8,
  loading = false,
  renderSkeleton,
  skeletonCount = 6,
  strategy = "deterministic",
  sx,
  ...boxProps
}: MasonryLayoutProps<T>) {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up("sm"));
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  const upXl = useMediaQuery(theme.breakpoints.up("xl"));

  // Resolve numeric column count (hooked, unconditional)
  const colCount = React.useMemo(() => {
    if (typeof columns === "number") return Math.max(1, columns | 0);
    let c = columns.xs ?? 1;
    if (upSm && columns.sm != null) c = columns.sm;
    if (upMd && columns.md != null) c = columns.md;
    if (upLg && columns.lg != null) c = columns.lg;
    if (upXl && columns.xl != null) c = columns.xl;
    return Math.max(1, c | 0);
  }, [columns, upSm, upMd, upLg, upXl]);

  // Precompute deterministic splits (hooks are unconditional; we can ignore them in 'css' mode)
  const cols = React.useMemo(() => {
    const arr: Array<Array<{ item: T; i: number }>> = Array.from({ length: colCount }, () => []);
    items.forEach((item, i) => arr[i % colCount].push({ item, i }));
    return arr;
  }, [items, colCount]);

  const skCols = React.useMemo(() => {
    const arr: number[][] = Array.from({ length: colCount }, () => []);
    for (let i = 0; i < (loading ? skeletonCount : 0); i++) {
      arr[i % colCount].push(i);
    }
    return arr;
  }, [loading, skeletonCount, colCount]);

  // Safe to branch AFTER hooks
  if (strategy === "css") {
    return (
      <Box
        sx={{ width: "100%", columnCount: columns, columnGap: gap, ...sx }}
        {...boxProps}
      >
        {items.map((item, index) => (
          <Box
            key={((item as any)?.id ?? (item as any)?.name ?? index) + "-card"}
            sx={{
              breakInside: "avoid",
              WebkitColumnBreakInside: "avoid",
              MozColumnBreakInside: "avoid",
              display: "block",
              width: "100%",
              mb: gap,
            }}
          >
            {renderItem(item, index)}
          </Box>
        ))}
        {loading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <Box
              key={"skeleton-" + i}
              sx={{ breakInside: "avoid", display: "block", width: "100%", mb: gap }}
            >
              {renderSkeleton ? renderSkeleton(i) : null}
            </Box>
          ))}
      </Box>
    );
  }

  // Deterministic (stable on pagination append)
  return (
    <Box
      sx={{ width: "100%", display: "flex", alignItems: "flex-start", gap, ...sx }}
      {...boxProps}
    >
      {cols.map((col, ci) => (
        <Box key={"col-" + ci} sx={{ flex: 1, display: "flex", flexDirection: "column", gap }}>
          {col.map(({ item, i }) => (
            <Box key={((item as any)?.id ?? (item as any)?.name ?? i) + "-card"}>{renderItem(item, i)}</Box>
          ))}
          {skCols[ci].map((k) => (
            <Box key={"skeleton-" + ci + "-" + k}>
              {renderSkeleton ? renderSkeleton(k) : null}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}