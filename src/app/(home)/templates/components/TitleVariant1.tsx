  interface TitleProps {
text: string;
titleFont: string;
hdFontSize: string;
hdLh: number;
unit: string;
gap: string | number;
color?: string;
}
  
  const Title1 = ({ text, unit, gap, titleFont, hdFontSize, hdLh }: TitleProps) => {
    return (
      <div
        style={{
          width: "100%",
          flexShrink: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap,
          borderBottom: `0.1${unit} solid currentColor`,
          color: "inherit",
        }}
      >
        <span
          style={{
            fontFamily: titleFont,
            fontSize: hdFontSize,
            fontWeight: "100",
            lineHeight: hdLh,
            letterSpacing: `0.25${unit}`,
          }}
        >
          {text}
        </span>
      </div>
    );
  };

  export default Title1;