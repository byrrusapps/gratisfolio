"use client";

import { AppRoutes } from "../scripts";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import MyIcon from "./MyIcon";
import { useRouter } from "next/navigation";
import { useApp } from "@/providers/AppContext";

const BottomBar = () => {

const router = useRouter();
const theme = useTheme();

const { appPath, setAppPath } = useApp();

return(
<Box
sx={{
position:"fixed",
width:"calc(100vw - 0rem)",
height:"4rem",
bottom:"0rem",
left:"0rem",
backgroundColor:"transparent",
display:"flex",
flexDirection:"row",
zIndex:"700",
color:"divider",
borderRadius:"2rem 2rem 0 0",
// borderTop:`1px solid currentColor`,
[theme.breakpoints.up("lg")]:{
display:"none",
}
}}
>

<Box
sx={{
position:"absolute",
width:"100%",
height:"100%",
backgroundColor:"background.default",
borderRadius:"inherit",
display:"flex",
flexDirection:"row",
opacity:"0.99",
}}
>

</Box>

{AppRoutes.map((item) =>


<ButtonBase
key={item.text}
onClick={() => {
setAppPath(item.text);
router.push(item.path);
}}
sx={{
position:"relative",
width:`calc(100vw / ${AppRoutes.length})`,
height:"100%",
color:item.text.toLowerCase() === appPath?.toLowerCase()? "text.primary" : "text.secondary",
display:"flex",
flexDirection:"column",
gap:"0.25rem",
}}
>

<MyIcon
filled={item.text.toLowerCase() === appPath?.toLowerCase()}
sx={{    
color:"inherit",
fontSize:"2rem",
fontWeight:"100",
}}
>
{item.icon}
</MyIcon>

</ButtonBase>

)}

</Box>
);

}

export default BottomBar;