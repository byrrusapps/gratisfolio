const replaceNumInString = ({ text }: Record<string, any>) => {

const result = text.replace(/\d+/g, (match: number) => String(Number(match) / 2)); // "5mm"
    
}