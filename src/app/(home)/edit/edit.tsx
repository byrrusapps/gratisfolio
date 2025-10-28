"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Switch,
  TextFieldVariants,
  Typography,
  useTheme,
} from "@mui/material";
import { MyIcon, Tabs, VisuallyHiddenInput } from "@/components";
import Controller from "../../../components/Controller";
import Input from "../../../components/Input";
import { useCreate } from "@/providers/CreateContext";
import { Palette } from "@/scripts/CV-Scripts/palette";
import { useApp } from "@/providers/AppContext";
import Link from "next/link";

interface BuilderProps {
  type: "single" | "multi";
  content: Array<any>;
}

interface ColorInputProps {
  paletteKey: "value" | "primary" | "secondary";
  label: string;
  palette: Palette;
  mode: "light" | "dark";
  setPalette: React.Dispatch<React.SetStateAction<Palette>>;
  updatePalette: ({
    mode,
    key,
    value,
    setter,
  }: {
    mode: "light" | "dark";
    key: "value" | "primary" | "secondary";
    value: string;
    setter: React.Dispatch<React.SetStateAction<Palette>>;
  }) => void;
  variant: TextFieldVariants;
}

const ColorInput: React.FC<ColorInputProps> = ({
  paletteKey,
  label,
  palette,
  mode,
  setPalette,
  variant,
  updatePalette,
}) => {
  const [val, setVal] = useState(palette[mode][paletteKey]);

  useEffect(() => {
    setVal(palette[mode][paletteKey]);
  }, [palette, mode, paletteKey]);

  return (
    <Input
      label={label}
      value={val}
      setValue={setVal}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 7) {
          setVal(value);
          updatePalette({ mode, key: paletteKey, value, setter: setPalette });
        }
      }}
      type="text"
      variant={variant}
      sx={{ margin: "1rem 0 0 0", color: "custom.main" }}
    />
  );
};

const Edit = () => {
  const theme = useTheme();
  const { user, setDrawer, setDrawerView, setInfo, } = useApp();
  const {
    Builder,
    layout,
    setLayout,
    avatar,
    setAvatar,
    showAvatar,
    setShowAvatar,
    palette,
    palettes,
    setPalette,
    mode,
    setMode,
    fontsBuilder,
    headings,
    changeHeading,
    setHeadings,
    paletteBuilder,
    updatePalette,
    toggleFlex,
    cvData,

    profileList,

    singleForms,

    experience,

    education,

    skills,

    languages,

    projects,

  } = useCreate();
  const [pos, setPos] = useState(0);
  const variant = "filled";
  const array = [
    {
      text: "Input",
      icon: "power_input",
    },
    {
      text: "Styling",
      icon: "mobile_layout",
    },
  ];

  const SaveButton = () => {

    return(
      <Fragment>
        {user && (
        <ButtonBase
        onClick={async () => {
          setDrawer(true);
          setDrawerView("save-to-profile");

          const profile = singleForms;
          const data = {
            profile, experience, education, skills, languages, projects
          }
          console.log(data);
          setInfo({data, profileList});
        }}
        sx={{
          margin:"2rem 0 0 0",
          width: "calc(100% - 2rem)",
          padding: "0.5rem 1rem",
          backgroundColor: "primary.main",
          color: "colors.onPrimary",
          borderRadius: "2rem",
          gap: "0.25rem",
        }}
      >
        <MyIcon>save_as</MyIcon>
        <Typography>Save to profile</Typography>
      </ButtonBase>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Box
        sx={{
          margin: "0rem 0 0 0",
          width: "calc(100% - 2rem)",
          padding: "1rem 1rem",
          alignSelf: "center",
          // backgroundColor: "background.paper",
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Tabs
          {...{
            pos,
            setPos,
            array,
          }}
        />

        {pos === 1 ? (
          <Fragment>
            <Controller title="Layout">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {["compact", "spacious"].map((i) => (
                  <ButtonBase
                    key={i}
                    onClick={() => {
                      setLayout(i as "compact" | "spacious");
                    }}
                    sx={{
                      margin: "1rem 0 0 0",
                      width: "fit-content",
                      padding: "0.5rem 1rem",
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: "1rem",
                      gap: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "custom.main",
                        fontSize: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {i}
                    </Typography>

                    <MyIcon
                      sx={{
                        color: layout === i ? "custom.main" : "custom.grey",
                      }}
                    >
                      {layout === i
                        ? "radio_button_checked"
                        : "radio_button_unchecked"}
                    </MyIcon>
                  </ButtonBase>
                ))}
              </Box>
            </Controller>

            <Controller title="Profile Image">
              <Box
                component="label"
                sx={{
                  margin: "1rem 0 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={avatar as string}
                  sx={{
                    width: "6rem",
                    height: "auto",
                    borderRadius: "0",
                  }}
                />

                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0]; // Fixed: Added optional chaining

                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        if (e.target?.result) {
                          // Fixed: Added null check
                          setAvatar(e.target.result as string); // Fixed: Added type assertion
                        }
                        event.target.value = "";
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*" // Fixed: Removed template literal (unnecessary)
                />
              </Box>

              <Box
                sx={{
                  margin: "1rem 0 0 0",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <ButtonBase
                  sx={{
                    width: "fit-content",
                    padding: "0.5rem 1rem",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      color: "custom.main",
                      fontSize: "1rem",
                    }}
                  >
                    Show Image
                  </Typography>

                  <Switch
                    checked={showAvatar}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setShowAvatar(checked);
                    }}
                  />
                </ButtonBase>
                {/* <ButtonBase
                  onClick={() => {
                    setAvatar("/images/default-av.jpg");
                  }}
                  sx={{
                    width: "fit-content",
                    padding: "0.5rem 1rem",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      color: "custom.main",
                      fontSize: "1rem",
                    }}
                  >
                    Reset
                  </Typography>

                  <MyIcon>refresh</MyIcon>
                </ButtonBase> */}
              </Box>
            </Controller>

            <Controller title="Choose Color">
              <Box
                sx={{
                  margin: "1rem 0 0 0",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                {palettes.map((item, index) => (
                  <ButtonBase
                    key={`${item.light.value}-${index}`}
                    onClick={() => setPalette(item)}
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "2rem",
                      backgroundColor: item.light.value,
                      color: theme.palette.getContrastText(item.light.value),
                    }}
                  >
                    {item === palette && (
                      <MyIcon className="material-symbols-outlined">
                        check
                      </MyIcon>
                    )}
                  </ButtonBase>
                ))}
              </Box>

              {paletteBuilder.map(({ key, label }) => (
                <ColorInput
                  key={key}
                  paletteKey={key}
                  label={label}
                  palette={palette}
                  mode={mode}
                  setPalette={setPalette}
                  variant={variant}
                  updatePalette={updatePalette}
                />
              ))}

              <ButtonBase
                sx={{
                  margin: "1rem 0 0 0",
                  width: "fit-content",
                  padding: "0.5rem 1rem",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "1rem",
                }}
              >
                <Typography sx={{ color: "custom.main", fontSize: "1rem" }}>
                  Dark Mode
                </Typography>
                <Switch
                  checked={mode === "dark"}
                  onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
                />
              </ButtonBase>
            </Controller>

            <Controller title="Choose Font">
              <Box
                sx={{
                  margin: "1rem 0 0 0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Alert
                  severity="warning"
                  icon={<MyIcon>touch_app</MyIcon>}
                  onClick={() => {
                    window.open("https://fonts.google.com/", "_blank");
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Box>
  <Typography variant="body2" color="text.secondary">
    Enter the exact name of any Google Font
  </Typography>
  <Typography variant="caption" color="text.disabled">
    Browse available fonts at{" "}
    <Link 
      href="https://fonts.google.com" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        color: theme.palette.primary.main,
      }}
    >
      fonts.google.com
    </Link>
  </Typography>
</Box>
                </Alert>

                <Fragment>
                  {fontsBuilder.map((item) => {
                    const { label, value, setter } = item;

                    return (
                      <Input
                        key={label}
                        variant={variant}
                        label={label}
                        value={value}
                        setValue={setter}
                        onChange={(e) => {
                          const value = e.target.value;
                          setter(value);
                        }}
                        sx={{
                          margin: "2rem 0 0 0",
                          color: "custom.main",
                          "& > *": {
                            fontFamily: value,
                          },
                        }}
                      />
                    );
                  })}
                </Fragment>
              </Box>
            </Controller>

            <Controller title="Change Headings">
              {headings.keys.map((field) => (
                <Input
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={headings.value[field]}
                  setValue={setHeadings}
                  onChange={(e) =>
                    changeHeading({
                      key: field,
                      value: e.target.value,
                      setter: setHeadings,
                    })
                  }
                  type="text"
                  variant={variant}
                  sx={{
                    margin: "1rem 0 0 0",
                    color: "custom.main",
                  }}
                />
              ))}
            </Controller>

            <Controller title="Hide Sections">
              {headings.keys.map((field) => (
                <ButtonBase
                  key={field}
                  onClick={() => {
                    toggleFlex({
                      key: field,
                      value: headings.flex?.[`${field}`],
                      setter: setHeadings,
                    })
                  }}
                  sx={{
                    padding:"0.5rem 1rem",
                    color:"divider",
                    // border:`1px solid currentColor`,
                    backgroundColor:"divider",
                    flexDirection:"row",
                    width:"100%",
                    textAlign:"start",
                    alignItems:"center",
                    justifyContent:"space-between",
                    borderRadius:"2rem",
                  }}
                >
                  <Typography
                  sx={{
                    color:"myPaper.main",
                    fontWeight:"bold",
                    fontSize:"1.125rem",
                  }}
                  >
                    {cvData.headings?.[field]}
                  </Typography>

                  <Switch
                  checked={headings.flex?.[field] === "flex"}
                  />
                </ButtonBase>
              ))}
            </Controller>
          </Fragment>
        ) : (
          <Fragment>
            {/* Builder Sections */}
            {Builder?.map(({ type, content }: BuilderProps, i: number) => {
              if (type === "single") {
                return (
                  <Fragment key={`builder-single-${i}`}>
                    {content?.map(
                      (
                        {
                          heading,
                          toMap,
                          setter,
                          handleChange,
                        }: {
                          heading: string;
                          toMap: any[];
                          setter: any;
                          handleChange: any;
                        },
                        j: number,
                      ) => (
                        <Controller
                          key={`controller-single-${j}`}
                          title={heading}
                        >
                          {toMap?.map(
                            (
                              {
                                value,
                                label,
                                id,
                                ignore,
                                multiline,
                                type,
                                required,
                              }: any,
                              k: number,
                            ) => (
                              <Input
                                key={`input-single-${id}-${k}`}
                                type={type}
                                label={label}
                                value={value}
                                setValue={(val) =>
                                  handleChange({ id, value: val, setter })
                                }
                                variant={variant}
                                InputProps={{
                                  multiline,
                                  ...(!required && {
                                    endAdornment: (
                                      <MyIcon
                                        component={ButtonBase}
                                        onClick={() =>
                                          handleChange({
                                            id,
                                            ignore: !ignore,
                                            setter,
                                          })
                                        }
                                      >
                                        {ignore ? "add" : "remove"}
                                      </MyIcon>
                                    ),
                                  }),
                                }}
                                sx={{
                                  color: "custom.main",
                                  borderRadius: "2rem",
                                }}
                              />
                            ),
                          )}
                        </Controller>
                      ),
                    )}
                  </Fragment>
                );
              }

              // --- Multi Forms ---
              return (
                <Fragment key={`builder-multi-${i}`}>
                  {content?.map(
                    (
                      {
                        heading,
                        keys,
                        state,
                        functions,
                      }: {
                        heading: string;
                        keys: string[];
                        state: any[];
                        functions: {
                          add: () => void;
                          remove: (index: number) => void;
                          update: (
                            index: number,
                            key: string,
                            value: string,
                          ) => void;
                        };
                      },
                      j: number,
                    ) => (
                      <Controller key={`controller-multi-${j}`} title={heading}
                      >
                        {/* Add New Button */}
                        <ButtonBase
                          onClick={() => functions.add()}
                          sx={{
                            margin: "2rem 0 0 0",
                            padding: "0.5rem 1rem",
                            borderRadius: "2rem",
                            color: "custom.main",
                            gap: "1rem",
                            border: `1px solid currentColor`,
                          }}
                        >
                          <MyIcon>add_circle</MyIcon>
                          <Typography>Add New</Typography>
                        </ButtonBase>

                        {/* Dynamic Form Fields */}
                        {state?.map((obj, stateIndex) => (
                          <Fragment key={`multi-state-${stateIndex}`}>
                            {stateIndex !== 0 ? <Divider /> : null}
                            {keys.map((key, keyIndex) => (
                              <Input
                                key={`multi-${heading}-${key}-${keyIndex}`}
                                label={key
                                  .replace(/[-_]/g, " ")
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (s) => s.toUpperCase())
                                  .trim()}
                                value={obj[key]}
                                setValue={(val) =>
                                  functions.update(stateIndex, key, val)
                                }
                                variant={variant}
                                InputProps={{
                                  multiline: true,
                                  ...(keyIndex === 0 && {
                                    endAdornment: (
                                      <MyIcon
                                        component={ButtonBase}
                                        onClick={() =>
                                          functions.remove(stateIndex)
                                        }
                                      >
                                        delete_forever
                                      </MyIcon>
                                    ),
                                  }),
                                }}
                              />
                            ))}
                          </Fragment>
                        ))}
                      </Controller>
                    ),
                  )}
                </Fragment>
              );
            })}

            <SaveButton />
          </Fragment>
        )}
      </Box>


    </Fragment>
  );
};

export default Edit;