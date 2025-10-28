import { MyIcon, Tabs } from "@/components";
import { useApp } from "@/providers/AppContext";
import { useCreate } from "@/providers/CreateContext";
import { GoogleLogin } from "@/scripts";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material"
import { useRouter } from "next/navigation";

const TopBar = () => {

const router = useRouter();
const { pos, setPos } = useCreate();
const { user, setMsg, setMsgOpen, setMsgType } = useApp();

const array = [
{
text:"Edit",
icon:"",
},
{
text:"View Resume",
icon:"",
},
]

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

router.push("/settings");

}}
>

<MyIcon
sx={{
padding:"0.5rem",
color:"myPaper.main",
backgroundColor:"background.paper",
borderRadius:"1rem",
}}
>
menu
</MyIcon>

</ButtonBase>

<ButtonBase
onClick={() => {

if(!user){


GoogleLogin({
setMsg,
setMsgOpen,
setMsgType,
});

}

}}
sx={{
padding: user? "0" : "0.5rem 1rem",
color: "colors.onPrimary",
gap: "1rem",
backgroundColor: user? "background.default" : "primary.main",
borderRadius: "2rem",
}}
>
<Avatar
src={user? user?.myAvatar : "/logos/Google.png"}
sx={{ 
width: user? "2rem" : "1rem", 
height: user? "2rem" : "1rem",
}}
/>
{user?
null
:
<Typography>{user? "Sign Out" : "Sign In"}</Typography>
}
</ButtonBase>

</Box>

</Box>
)

}

export default TopBar