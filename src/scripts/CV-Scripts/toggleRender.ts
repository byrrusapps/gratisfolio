const toggleRender = ({ 
  value, 
  flexValue 
}: { 
  value: any; 
  flexValue: string 
}): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0 && flexValue === "flex";
  }
  return flexValue === "flex";
};

export default toggleRender;