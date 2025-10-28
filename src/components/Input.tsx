import { InputBaseComponentProps, InputLabelProps, InputProps, SxProps, TextField, TextFieldVariants } from "@mui/material"

interface MyInputProps {
  value: any,
  setValue: (value: any) => void,
  variant: TextFieldVariants | undefined,
  type?: string, // Fixed: Changed backtick to regular quote
  label?: React.ReactNode,
  inputProps?: InputBaseComponentProps,
  InputProps?:  InputProps,
  sx?: SxProps,
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const Input = ({
value, setValue, variant="outlined", type="text", label,
inputProps, InputProps, sx, onChange}: MyInputProps) => {

  const defaultOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Fixed: Changed Event to React.ChangeEvent
    const value = e.target.value;
    setValue(value);
  }

  return(
    <TextField
      variant={variant}
      value={value}
      type={type} // Added: Pass the type prop
      label={label}
      slotProps={{
        htmlInput: inputProps,
        input: InputProps, 
      }}
      onChange={onChange || defaultOnChange}
      sx={{
              ...(sx),
      }}
    />
  );

}

export default Input;