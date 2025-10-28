import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import Controller from "../Controller";
import Input from "../Input";
import { Fragment, useState } from "react";
import MyIcon from "../MyIcon";
import { FS } from "@/scripts";
import { v4 as uuidv4 } from 'uuid';
import { useApp } from "@/providers/AppContext";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
}

const SaveToProfile = () => {
  const variant = "filled";
  const { user, setDrawer, setMsg, setMsgOpen, setMsgType, info } = useApp();
  const [loading, setLoading] = useState(false);

  const SaveButton = ({ text, onClick, disabled, loading }: ButtonProps) => {
    return (
      <ButtonBase
        onClick={onClick}
        disabled={disabled || loading}
        sx={{
          width: "calc(100% - 2rem)",
          padding: "0.5rem 1rem",
          backgroundColor: "primary.main",
          color: "background.default",
          borderRadius: "2rem",
          gap: "0.25rem",
          "&.Mui-disabled": {
            backgroundColor: "grey.disabled",
            color: "grey.main",
            opacity: 0.5,
          },
        }}
      >
        {loading ? (
          <CircularProgress variant="indeterminate" size="1rem" />
        ) : (
          <Fragment>
            <MyIcon>save_as</MyIcon>
            <Typography>{text}</Typography>
          </Fragment>
        )}
      </ButtonBase>
    );
  };

  const CreateNew = () => {
    const [name, setName] = useState("");

    const handleCreateProfile = async () => {
      if (!name.trim()) return;

      setLoading(true);

      try {
        const id = uuidv4();
        const data = {
          id,
          name: name.trim(),
          ...info?.data,
        };

        await FS.set({
          path: `users/${user?.myUid}/profiles/${id}`,
          data,
        });

        setLoading(false);
        setDrawer(false);
        setMsg("Profile created successfully");
        setMsgType("success");
        setMsgOpen(true);
      } catch (error: any) {
        setLoading(false);
        setMsg(error?.message || "Failed to create profile");
        setMsgType("error");
        setMsgOpen(true);
      }
    };

    return (
      <Fragment>
        <Input
          variant={variant}
          value={name}
          setValue={setName}
          label="Profile Name"
        />

        <SaveButton
          text="Create and save to profile"
          disabled={!name.trim()}
          loading={loading}
          onClick={handleCreateProfile}
        />
      </Fragment>
    );
  };

  const SelectProfile = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<Record<string, any> | null>(null);

    const { profileList, data:dt } = info || {};

    const handleUpdateProfile = async () => {
      if (!selectedProfile?.id) return;

      setLoading(true);

      try {
        const data = {
          ...selectedProfile,
          ...dt,
        };

        await FS.update({
          path: `users/${user?.myUid}/profiles/${selectedProfile.id}`,
          data,
        });

        setLoading(false);
        setDrawer(false);
        setMsg("Profile updated successfully");
        setMsgType("success");
        setMsgOpen(true);
      } catch (error: any) {
        setLoading(false);
        setMsg(error?.message || "Failed to update profile");
        setMsgType("error");
        setMsgOpen(true);
      }
    };

    return (
      <Fragment>
        {profileList && profileList.length > 0 ? (
          <Fragment>
            {profileList.map((item: Record<string, any>) => {
              const { name, id } = item;
              const isSelected = selected === id;

              return (
                <ButtonBase
                  key={id}
                  onClick={() => {
                    setSelected(id);
                    setSelectedProfile({name, id});
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "myPaper.main",
                      fontSize: "1rem",
                    }}
                  >
                    {name}
                  </Typography>

                  <MyIcon
                    filled={isSelected}
                    sx={{
                      color: isSelected ? "primary.main" : "myPaper.grey",
                      fontSize: "1.5rem",
                    }}
                  >
                    {isSelected ? "check_circle" : "radio_button_unchecked"}
                  </MyIcon>
                </ButtonBase>
              );
            })}

            <SaveButton
              text="Save to selected profile"
              disabled={!selected}
              loading={loading}
              onClick={handleUpdateProfile}
            />
          </Fragment>
        ) : (
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            No profiles available
          </Typography>
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
        <Controller title="Create New Profile">
          <CreateNew />
        </Controller>

        <Controller title="Select Profile">
          <SelectProfile />
        </Controller>
      </Box>
  );
};

export default SaveToProfile;