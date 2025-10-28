  interface TitleProps {
text: string;
titleFont: string;
hdFontSize: string;
hdLh: number;
unit: string;
gap: string | number;
color?: string;
divider: string;
}
  
  const Title3 = ({ text, unit, gap, titleFont, hdFontSize, hdLh, divider, }: TitleProps) => {
    return (
      <div
        style={{
          width: "100%",
          flexShrink: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap,
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
        <div
        style={{
            width:"100%",
            height:`0.1${unit}`,
            backgroundColor:"currentcolor",            
        }}
        >

        </div>
      </div>
    );
  };

  export default Title3;