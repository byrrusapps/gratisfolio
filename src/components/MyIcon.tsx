import { Box, SxProps } from "@mui/material";
import React, { ElementType, ReactNode } from "react";

interface IconProps {
  sx?: SxProps;
  component?: ElementType<any>;
  filled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  icon?: string;
}

const MyIcon = ({ 
  sx, 
  component = "span", 
  filled = false, 
  children, 
  className,
  onClick,
  icon,
}: IconProps) => {

  return(
    <Box
      component={component}
      onClick={onClick}
      className={`material-symbols-rounded ${filled ? "rounded-filled" : "rounded-outlined"} ${className || ""}`}
      sx={sx}
    >
      {icon || children}
    </Box>
  );
}

export default MyIcon;