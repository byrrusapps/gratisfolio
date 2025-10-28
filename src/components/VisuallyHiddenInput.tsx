import { styled } from "@mui/material";

const VisuallyHiddenInput = styled('input')<React.InputHTMLAttributes<HTMLInputElement>>({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  zIndex: 3,
});

export default VisuallyHiddenInput;