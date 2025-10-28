import React, { CSSProperties, ReactNode } from "react";

interface IconProps {
  style?: CSSProperties;
  filled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<any>,
}

const MyIcon = ({ 
  style, 
  filled = false, 
  children, 
  className,
  onClick,
}: IconProps) => {

  return(
    <div
      onClick={onClick}
      className={`material-symbols-rounded ${filled ? "rounded-filled" : "rounded-outlined"} ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default MyIcon;