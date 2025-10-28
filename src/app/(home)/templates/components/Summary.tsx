interface SumProps {
text: string;
bodyFontSize: string;
bodyLh: number;
color?: string;
alignStart?: boolean;
}

const Summary  = ({text, bodyFontSize, bodyLh, color, alignStart}: SumProps) => {

return(
                <span
                  style={{
                    color: color || "inherit",
                    fontSize: bodyFontSize,
                    lineHeight: bodyLh,
                    textAlign:alignStart? "start" : "center",
                  }}
                >
                  {text}
                </span>
);

}

export default Summary;