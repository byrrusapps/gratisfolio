  interface TitleProps {
text: string;
titleFont: string;
hdFontSize: string;
hdLh: number;
unit: string;
color?: string;
}
  
  const Title2 = ({ text, unit, color, titleFont, hdFontSize, hdLh }: TitleProps) => {
    return (
      <span
        style={{
          width: "100%",
          flexShrink: "0",
          fontFamily: titleFont,
          fontSize: hdFontSize,
          fontWeight: "100",
          lineHeight: hdLh,
          letterSpacing: `0.25${unit}`,
          color: color || "inherit",
        }}
      >
        {text}
      </span>
    );
  };

  export default Title2;