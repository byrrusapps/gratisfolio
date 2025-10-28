import { Box, SxProps, useTheme } from "@mui/material"

interface WrapperProps {
sx?: SxProps,
paddingBottom?: number,
children: React.ReactNode,
}

const Wrapper = ({sx, paddingBottom = 0, children}: WrapperProps) => {

const theme = useTheme();

return(
<Box
sx={{
position:"relative",
width:"100%",
maxWidth:"100%",
// minHeight:`calc(100vh - ${paddingBottom}rem)`,
height:"auto",
display:"flex",
flexDirection:"column",
backgroundColor:"inherit",
[theme.breakpoints.up("lg")]:{
width:"calc(210mm + 0mm)",
// width:"50%",
alignSelf:"center",
},
...(sx),
}}
>

{children}

</Box>
)
}

export default Wrapper;