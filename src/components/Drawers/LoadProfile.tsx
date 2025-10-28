import { Box, ButtonBase, Typography, IconButton } from "@mui/material";
import { Fragment, useState } from "react";
import MyIcon from "../MyIcon";
import { FS } from "@/scripts";
import { useApp } from "@/providers/AppContext";

const LoadProfile = () => {
  const { user, setDrawer, setMsg, setMsgOpen, setMsgType, info } = useApp();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const SelectProfile = () => {
    const { profileList, setProfileId,
     } = info || {};

    const handleLoadProfile = (data: Record<string, any>, id: string) => {

      setProfileId(id);
      setDrawer(false);
      setMsg("Profile loaded successfully");
      setMsgType("success");
      setMsgOpen(true);
    };

    const handleDeleteProfile = async (e: React.MouseEvent, id: string, name: string) => {
      e.stopPropagation();
      
      setDeletingId(id);

      try {
        await FS.remove({
          path: `users/${user?.myUid}/profiles/${id}`,
        });

        setMsg(`"${name}" deleted successfully`);
        setMsgType("success");
        setMsgOpen(true);
      } catch (error: any) {
        setMsg(error?.message || "Failed to delete profile");
        setMsgType("error");
        setMsgOpen(true);
      } finally {
        setDeletingId(null);
      }
    };

    return (
      <Fragment>
        {profileList && profileList.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {profileList.map((item: Record<string, any>) => {
              const { name, id } = item;
              const isDeleting = deletingId === id;

              return (
                <ButtonBase
                  key={id}
                  onClick={() => handleLoadProfile(item, id)}
                  disabled={isDeleting}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "1rem",
                    gap: "1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "background.paper",
                    textAlign: "start",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      transform: "translateY(-2px)",
                      boxShadow: 1,
                    },
                    "&.Mui-disabled": {
                      opacity: 0.5,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      color: "myPaper.main",
                      fontSize: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      textAlign: "start",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {name}
                  </Typography>

                  <MyIcon
                    onClick={(e) => {
                        if(!isDeleting){
                            handleDeleteProfile(e, id, name);
                        }
                    }}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        backgroundColor: "error.light",
                        opacity: 0.1,
                      },
                    }}
                  >
                    {isDeleting ? "hourglass_empty" : "delete"}
                  </MyIcon>
                </ButtonBase>
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              padding: "2rem",
              backgroundColor: "background.paper",
              borderRadius: "0.5rem",
            }}
          >
            <MyIcon sx={{ fontSize: "3rem", color: "text.disabled" }}>
              folder_off
            </MyIcon>
            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              No profiles available
            </Typography>
            <Typography
              sx={{
                color: "text.disabled",
                textAlign: "center",
                fontSize: "0.875rem",
              }}
            >
              Create a new profile to get started
            </Typography>
          </Box>
        )}
      </Fragment>
    );
  };

  return (
      <Box
        sx={{
          width: "calc(100% - 2rem)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "custom.main",
          }}
        >
          Select Profile
        </Typography>

        <SelectProfile />
      </Box>
  );
};

export default LoadProfile;