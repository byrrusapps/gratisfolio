import { Box, Skeleton } from "@mui/material";

const TemplateSkel = () => {

return(
<Box
sx={{
position:"relative",
width:"100%",
height:"fit-content",
display:"flex",
flexDirection:"column",
}}
>

<Skeleton
sx={{
position:"relative",
width:"100%",
height:"10rem",
borderRadius:"1rem",
}}
/>

<Box
sx={{
position:"relative",
width:"100%",
display:"flex",
flexDirection:"column", 
}}>
<Skeleton
variant="text"
sx={{
position:"relative",
width:"100%",
height:"auto",
}}
/>

<Skeleton
variant="text"
sx={{
position:"relative",
width:"100%",
height:"auto",
}}
/>

<Skeleton
variant="text"
sx={{
position:"relative",
width:"100%",
height:"auto",
}}
/>
</Box>

</Box>
);

}

export default TemplateSkel;