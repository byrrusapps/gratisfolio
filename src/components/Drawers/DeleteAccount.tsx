import { useApp } from "@/providers/AppContext";
import DeleteUser from "@/scripts/Auth/DeleteUser";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const DeleteAccount = () => {
  const { user, setMsg, setMsgOpen, setMsgType, setDrawer } = useApp();
  const { myTag, myUid } = user || {};
  const [deleting, setDeleting] = useState(false);
  const theme = useTheme();

  const handleCancel = () => {
    setDrawer(false);
  };

  const handleDelete = async () => {
    if (!myTag || !myUid) {
      setMsgOpen(true);
      setMsgType("error");
      setMsg("Missing user information");
      return;
    }

    setDeleting(true);
    
    try {
      await DeleteUser({
        setMsg,
        setMsgOpen,
        setMsgType,
        myTag,
        myUid,
      });
      setDrawer(false);
    } catch (error) {
      setDeleting(false);
    }
  };

  return (
    <Box
      sx={{
        my: 4,
        width: "calc(100% - 3rem)",
        p: 2,
        alignSelf: "center",
        bgcolor: "background.paper",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "myPaper.main",
        }}
      >
        Are you sure you want to delete your account?
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "myPaper.grey",
        }}
      >
        This action is irreversible. All your data will be permanently deleted.
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleCancel}
          disabled={deleting}
          fullWidth
          sx={{
            color: "myPaper.main",
            borderColor: "divider",
            fontFamily: theme.typography.fontFamily,
            "&:hover": {
              borderColor: "myPaper.main",
              bgcolor: "action.hover",
            },
          }}
        >
          No, keep it
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleting}
          fullWidth
          startIcon={deleting ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {deleting ? "Deleting..." : "Yes, delete"}
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccount;