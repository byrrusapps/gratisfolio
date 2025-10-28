import { MyIcon } from "@/components";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface ControllerProps {
title: string,
children: React.ReactNode,
 func?: {
    run: () => void;
    deps: any[];
  };
}

const Controller = ({title, children, func}: ControllerProps) => {

const [expand, setExpand] = useState<boolean>(false);

 useEffect(() => {
    if (func?.run) {
      func.run();
    }
  }, func?.deps || []);
  
return(
<Box
sx={{
margin:"0rem 0 0 0",
width:"calc(100% - 0rem)",
height:"fit-content",
padding:"1rem 0rem",
display:"flex",
flexDirection:"column",
gap:"0rem",
color:"divider",
borderBottom:`1px solid currentColor`,

borderRadius:"0rem",
// backgroundColor:"background.paper",
}}
>

<ButtonBase
onClick={() => {
setExpand(prev => !prev);
}}
sx={{
width:"100%",
// padding:"1rem 0",
// borderBottom:`1px solid currentColor`,
textAlign:"start",
justifyContent:"start",
gap:"1rem",
color:"myPaper.main",
}}
>

<Typography
sx={{
flexGrow:"1",
fontSize:"1.5rem",
fontWeight:"bold",
color:"inherit",
}}
>
{title}
</Typography>

<MyIcon
sx={{
fontSize:"1.5rem",
color:"inherit",
}}
>
{expand? "expand_circle_up" : "expand_circle_down"}
</MyIcon>

</ButtonBase>

{expand?
<Box
sx={{
padding:"1rem 0",
display:"flex",
flexDirection:"column",
gap:"2rem",
}}
>
{children}
</Box>
:
null
}


</Box>
)

}

export default Controller;