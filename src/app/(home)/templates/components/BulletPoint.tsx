interface PointsProps {
text: string;
fullWidth?: boolean;
titleFont: string;
bodyFontSize: string;
bodyLh: number;
unit: string;
gap: string | number;
color?: string;
}
  
  const BulletPoint = ({ text, fullWidth, bodyFontSize, bodyLh, unit, gap, color }: PointsProps) => {
    return (
      <div
        style={{
          width: fullWidth ? "100%" : `calc(50% - ${gap})`,
          display: "flex",
          alignItems: "start",
          gap: `1${unit}`,
        }}
      >
        <span
          style={{
            color: color || "inherit",
            fontSize: bodyFontSize,
            lineHeight: bodyLh,
          }}
        >
          &bull;
        </span>
        <span
          style={{
            width: `100%`,
            color: color || "inherit",
            fontSize: bodyFontSize,
            lineHeight: bodyLh,
          }}
        >
          {text}
        </span>
      </div>
    );
  };

  export default BulletPoint;