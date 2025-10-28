import { Box, ButtonBase, SwipeableDrawer, Typography, useTheme } from '@mui/material';
import MyIcon from '../MyIcon';
import { useApp } from '@/providers/AppContext';
import { Fragment, JSX, useEffect } from 'react';
import Wrapper from '../Wrapper';
import SaveToProfile from './SaveToProfile';
import LoadProfile from './LoadProfile';
import ChooseAppTheme from './ChooseAppTheme';
import DeleteAccount from './DeleteAccount';

interface Action {
  component: React.ComponentType<any>;
  text: string;
}

interface Actions {
  [key: string]: Action;
}

const Drawer = () => {

  const { 
    drawer, 
    setDrawer, 
    setDrawerView,
    drawerView, 
  } = useApp();

  const theme = useTheme();
  const Empty = (): JSX.Element  => <Fragment></Fragment>;

  const actions: Actions = {
    // Your actions here
    "save-to-profile":{
      component: SaveToProfile,
      text: "Save to Profile",
    },
    "load-profile":{
      component: LoadProfile,
      text: "Load Profile",
    },
      "app-theme":{
      component: ChooseAppTheme,
      text: "Choose App Theme",
    },
      "delete-account":{
      component: DeleteAccount,
      text: "Choose App Theme",
    },
  };

  // Get the current action component
  const CurrentComponent = drawerView && actions[drawerView] 
    ? actions[drawerView].component 
    : Empty;

    useEffect(() => {
      if(!drawer){
        setDrawerView(null);
      }
    })

  return (
    <Wrapper>
          <SwipeableDrawer
      variant="temporary"
      anchor="bottom"
      disableSwipeToOpen={true}
      open={drawer}
      onClose={() => {
        setDrawer(false);
      }}
      onOpen={() => {
        setDrawer(true);
      }}
      sx={{
        position:"relative",
        width:"inherit",
        height:"100vh",
        backgroundColor:"none",
        overflowY:"scroll",
        "& > *":{
          boxShadow:"none",
        },
        "& > .MuiDrawer-root":{
          opacity:"0 !important",
        }
      }}
    >

      <Box
        sx={{
          position:"relative",
          padding:"1rem 0 1rem 0",
          width:"100%",
          display:"flex",
          flexDirection:"column",
          backgroundColor:"background.default",
          [theme.breakpoints.up("lg")]:{
            padding:"1rem 0 0 0",
          },
        }}
      >

        <Box
          sx={{
            width:"3rem",
            height:"0.2rem",
            backgroundColor:"custom.grey",
            borderRadius:"2rem",
            alignSelf:"center",
            [theme.breakpoints.up("lg")]:{
              display:"none",
            },
          }}
        />

        <Box
          sx={{
            position:"relative",
            width:"calc(100% - 2rem)",
            padding:"1rem",
            borderRadius:"0rem 0rem 0 0",
            backgroundColor:"background.default",
            display:"none",
            alignItems:"center",
            justifyContent:"space-between",
          }}
        >

          <Typography
            sx={{
              color:"custom.main",
              flexGrow:"1",
              fontSize:"1.4rem",
              fontWeight:"bold",
              justifySelf:"center",
            }}
          >
            {drawerView && actions[drawerView]?.text || ""}
          </Typography>

          <ButtonBase
            onClick={() => {
              setDrawer(false); 
            }}
          >
            <MyIcon
              sx={{
                color:"custom.grey",
              }}
            >
              close
            </MyIcon>
          </ButtonBase>

        </Box>

      </Box>

      <Box
        sx={{
          position:"relative",
          padding:"0rem 0 2rem 0",
          width:"100%",
          maxHeight:"100vh",
          backgroundColor:"background.default",
          display:"flex",
          flexDirection:"column",
          overflowY:"scroll",
          "& > *":{
            flexShrink:"0",
          },
        }}
      >
        <CurrentComponent />
      </Box>

    </SwipeableDrawer>
    </Wrapper>
  );
};

export default Drawer;