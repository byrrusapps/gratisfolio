interface InfoItem {
  id: string | number;
  value?: string;
  required?: boolean;
  placeholder?: string;
  ignore?: boolean;
}

type ExtractInfoReturn = string | { value: string; ignore?: boolean };

const extractInfo = (array: InfoItem[] = [], id: string | number): ExtractInfoReturn => {
  const ind = array?.find(index => index?.id === id);

  if (!ind?.value || ind?.value?.length < 1) {
    return ind?.required 
      ? ind?.placeholder || '' 
      : { value: ind?.placeholder || '', ignore: ind?.ignore };
  } else {
    return ind?.required 
      ? ind?.value 
      : { value: ind?.value, ignore: ind?.ignore };
  }
}

export default extractInfo;