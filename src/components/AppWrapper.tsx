"use client"

import { Alert, Box, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import { Drawer } from "@/components";
import { useApp } from "@/providers/AppContext";
import { ReactNode } from "react";

interface AppProps {
  children: ReactNode;
}


const AppWrapper = ({ children }: AppProps) => {


const {  msg, msgOpen, setMsgOpen, msgType, font, appTheme, mounted  } = useApp();
const grey = appTheme.custom.grey;

  if (!mounted) {
    return null; // or a loading spinner
  }
  
const MainTheme = createTheme({

typography:{
fontFamily:font,
},

palette:{
...(appTheme),
},

components:{

"MuiDrawer":{
"styleOverrides":{
"paper":{
backgroundColor:"background.default !important",
backgroundImage:"none",
background:"none",
},
}
},

"MuiInputBase":{
"styleOverrides":{

"input":{
// backgroundColor:appTheme.background.paper,
'&::placeholder': {
color:grey,
opacity:"1",
},
},

}
},


"MuiFilledInput": {
      styleOverrides: {
        root: {
          backgroundColor:appTheme?.background?.paper, // or theme.palette.background.paper
          '&:hover': {
            backgroundColor:appTheme?.background?.paper,
          },
          '&.Mui-focused': {
            backgroundColor:appTheme?.background?.paper,
          },

          '& textarea::placeholder, & input::placeholder': {
            color:grey, // or theme.palette.custom.grey
          },
        },
      },
},

}


})

return(
<ThemeProvider
theme={MainTheme}
>

<Box
sx={{
position:"absolute",
width:"100vw",
maxWidth:"100vw",
minHeight:"100vh",
height:"auto",
top:"0",
left:"0",
backgroundColor:"background.default",
display:"flex",
flexDirection:"column",
}}
>

{children}

{msgOpen? 
<Snackbar
anchorOrigin={{
vertical:"bottom",
horizontal:"left",
}}
open={msgOpen}
onClose={() => {
setMsgOpen(false);
}}
autoHideDuration={6000}
sx={{
position:"fixed",
bottom:"4rem",
fontSize:"1.3rem",
}}
>
<Alert
variant="filled"
severity={(msgType as 'error' | 'warning' | 'info' | 'success') || "info"}
>
{msg}
</Alert>
</Snackbar>
:
null
}

<Drawer
/>

</Box>

</ThemeProvider>
);

}

export default AppWrapper;