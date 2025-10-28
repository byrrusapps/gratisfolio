import { MyIcon } from "@/components";
import { useApp } from "@/providers/AppContext";
import { GoogleLogin } from "@/scripts";
import SignOut from "@/scripts/Auth/SignOut";
import { Avatar, Box, Button, ButtonBase, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface MenuItem {
  icon: string;
  text: string;
  dangerous?: boolean;
  fnx: () => void;
}

interface SectionObject {
  title: string;
  content: MenuItem[];
}

const APP_VERSION = "1.0.0";

const Body = () => {
  const { 
    user, 
    setMsg, 
    setMsgOpen, 
    setMsgType, 
    setDrawer,
    setDrawerView 
  } = useApp();
  const { myAvatar, myName, myEmail } = user || {};
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAuth = () => {
    if (!user) {
      GoogleLogin({ setMsg, setMsgOpen, setMsgType });
    } else {
      SignOut({ setMsg, setMsgOpen, setMsgType });
    }
  };

  const layoutSection: SectionObject = {
    title: "Gratisfolio",
    content: [
      {
        icon: "dark_mode",
        text: "Appearance & Theme",
        fnx: () => {
          setDrawer(true);
          setDrawerView("app-theme");
        }
      },
      {
        icon: "contact_support",
        text: "Help & FAQs",
        fnx: () => handleNavigation("/faq")
      },
      {
        icon: "business_center",
        text: "Explore More Projects",
        fnx: () => handleExternalLink("https://x.com/ByrrusApps/status/1982910010859696229")
      },
      {
        icon: "coffee_maker",
        text: "Support the Project",
        fnx: () => handleExternalLink("https://ko-fi.com/byrrusapps")
      }
    ]
  };

  const appManagementSection: SectionObject = {
    title: "App Management",
    content: [
      {
        icon: "security",
        text: "Privacy Policy",
        fnx: () => handleNavigation("/privacy-policy")
      },
      {
        icon: "email",
        text: "Contact Developer",
        fnx: () => handleExternalLink("mailto:byrrusapps@gmail.com")
      },
      ...(user ? [{
        icon: "account_circle_off",
        text: "Delete Account",
        dangerous: true,
        fnx: () => {
          setDrawerView("delete-account");
          setDrawer(true);
        }
      }] : [])
    ]
  };

  const sections = [layoutSection, appManagementSection];

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
            mb: 4,
            gap: 1,
          }}
        >
          <Avatar
            src={myAvatar}
            alt={myName}
            sx={{
              width: 96,
              height: 96,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "custom.main",
              fontWeight: "bold",
            }}
          >
            {myName}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "custom.grey",
            }}
          >
            {myEmail}
          </Typography>
        </Box>
      )}

      {sections.map((section, sectionIndex) => (
        <Box
          key={section.title}
          sx={{
            width: "calc(100% - 2rem)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "custom.grey",
              fontWeight: "bold",
            }}
          >
            {section.title}
          </Typography>

          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {section.content.map((item, itemIndex) => (
              <ButtonBase
                key={`${section.title}-${itemIndex}`}
                onClick={item.fnx}
                sx={{
                  width: "100%",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: itemIndex !== section.content.length - 1 
                    ? 1 
                    : 0,
                  borderColor: "divider",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <MyIcon
                    filled
                    sx={{
                      color: item.dangerous ? "error.main" : "myPaper.main",
                    }}
                  >
                    {item.icon}
                  </MyIcon>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "myPaper.main",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>

                <MyIcon
                  filled
                  sx={{
                    color: "myPaper.main",
                  }}
                >
                  keyboard_arrow_right
                </MyIcon>
              </ButtonBase>
            ))}
          </Box>
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={handleAuth}
        sx={{
          mt: 2,
          width: "calc(100% - 2rem)",
          alignSelf: "center",
          bgcolor: "custom.main",
          color: "background.default",
          borderRadius: 4,
          py: 1,
          "&:hover": {
            bgcolor: "custom.dark",
          },
        }}
      >
        {user ? "Log Out" : "Log In"}
      </Button>

      <Typography
        variant="caption"
        sx={{
          my: 4,
          color: "custom.grey",
          alignSelf: "center",
        }}
      >
        App Version {APP_VERSION}
      </Typography>
    </>
  );
};

export default Body;