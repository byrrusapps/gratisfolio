import { MyIcon } from "@/components";
import { Box, ButtonBase } from "@mui/material"
import { useRouter } from "next/navigation";

const TopBar = () => {

const router = useRouter();

return(
<Box
sx={{
position:"sticky",
width:"100%",
top:"0",
left:"0",
display:"flex",
flexDirection:"column",
backgroundColor:"background.default",
zIndex:"1000",
}}
>

<Box
sx={{
width:"calc(100% - 2rem)",
padding:"1rem",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
}}
>

<ButtonBase
onClick={() => {

router.back();

}}
>

<MyIcon
sx={{
color:"myPaper.main",
borderRadius:"1rem",
}}
>
arrow_back_ios_new
</MyIcon>

</ButtonBase>

</Box>

</Box>
)

}

export default TopBar