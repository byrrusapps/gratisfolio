"use client";

import { createContext, useContext, useRef, useState, useMemo, useEffect } from "react";
import { palette1, palette2, palette3, palette4, sizes } from "@/scripts/CV-Scripts";
import { Palette } from "@/scripts/CV-Scripts/palette";
import { createTheme, useTheme } from "@mui/material";
import CustomTheme from "@/scripts/CustomTheme";
import { ModeStyles } from "@/scripts/CV-Scripts/sizes";
import { useApp } from "./AppContext";
import { FS } from "@/scripts";
import { firestore } from "@/scripts/FS/init/InitFirebase";

/* ------------------------------- Interfaces ------------------------------- */
interface FontConfig {
  label: string;
  value: string;
  setter: (value: string) => void; // Note: typo "settter" preserved from original
}

interface PaletteConfig {
  key: "value" | "primary" | "secondary";
  label: string;
}

interface Headings {
  value: Record<string, string>;
  placeholder: Record<string, string>;
  flex: Record<string, string>;
  keys: Array<string>;
}

export interface CVData {
  experience: Record<string, string>[];
  education: Record<string, string>[];
  skills: Record<string, string>[];
  languages: Record<string, string>[];
  projects: Record<string, string>[];
  headings: Record<string, string>;
  avatar: string | null;
  showAvatar: boolean;
  mode: "light" | "dark";
  layout: "spacious" | "compact";
  contentRef: React.RefObject<HTMLDivElement | null>;
  fonts: {
    body: string;
    title: string;
  };
  profile: Record<
    | "name"
    | "profession"
    | "summary"
    | "email"
    | "phone"
    | "website"
    | "address",
    {
      value: any;
      ignore: boolean | undefined;
      icon: string | undefined;
    }
  >;
  contact: {
    value: any;
    ignore: boolean | undefined;
    icon: string | undefined;
    id: string | undefined;
  }[];
  size: ModeStyles;
  goldenRatio: [string, string];
  flex: Record<string, string>;
}

interface MultiFormFns {
    readonly add: () => void;
    readonly remove: (index: number) => void;
    readonly update: (index: number, key: string, value: string) => void;
    readonly replace: (array: []) => void;
    readonly cvData: Record<string, string>[];
}

interface CreateState {
  pos: number;
  setPos: (index: number) => void;
  Builder: Array<any>;
  cvData: CVData;
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  showAvatar: boolean;
  setShowAvatar: React.Dispatch<React.SetStateAction<boolean>>;
  headings: Headings;
  setHeadings: React.Dispatch<React.SetStateAction<Headings>>;
  palette: any;
  setPalette: React.Dispatch<React.SetStateAction<any>>;
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<"spacious" | "compact">>;
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  palettes: Array<any>;
  bodyFont: string;
  setBodyFont: React.Dispatch<React.SetStateAction<string>>;
  titleFont: string;
  setTitleFont: React.Dispatch<React.SetStateAction<string>>;
  fontsBuilder: Array<FontConfig>;
  toggleFlex: ({ key, value, setter }: {
    key: string;
    value: string;
    setter: React.Dispatch<React.SetStateAction<Headings>>;
}) => void;
  changeHeading: (params: {
    key: keyof Headings["value"];
    value: string;
    setter: React.Dispatch<React.SetStateAction<Headings>>;
  }) => void;
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
  paletteBuilder: PaletteConfig[];
  aspectRatio: string;
  setAspectRatio: React.Dispatch<React.SetStateAction<string>>;
  Theme: Record<string, any>;
  size: ModeStyles;
  goldenRatio: [string, string];
  GenTheme: Record<string, any>;
  profileId: string | null;
  setProfileId: React.Dispatch<React.SetStateAction<string | null>>;
  profileName: string | null;
  setProfileName: React.Dispatch<React.SetStateAction<string | null>>;
  profileList: any[] | null;
  setProfileList: React.Dispatch<React.SetStateAction<any[] | null>>;
  singleForms: Field[];
  setSingleForms: (value: React.SetStateAction<Field[]>) => void;
  expFns: MultiFormFns;
  eduFns: MultiFormFns;
  skillFns: MultiFormFns;
  langFns: MultiFormFns;
  projectsFns: MultiFormFns;
  experience:  Record<string, any>[];
  education:  Record<string, any>[];
  skills:  Record<string, any>[];
  languages:  Record<string, any>[];
  projects:  Record<string, any>[];
}

type Field = {
  id: string;
  value: any;
  ignore?: boolean;
  label?: string;
  placeholder?: string;
  section?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  icon?: string;
};

type ExtractField = {
  icon?: string;
  value?: any;
  placeholder?: any;
  ignore?: boolean;
  id?: string;
};

type HandleSingleFormChange = {
  id: string;
  value: any;
  ignore?: boolean;
  setter: React.Dispatch<React.SetStateAction<Field[]>>;
};

type HeadingKey = keyof Headings["value"];

/* ------------------------------- Utilities ------------------------------- */

const toggleFlex = ({ 
  key, 
  value, 
  setter 
}: { 
  key: keyof Headings['flex']; 
  value: string; 
  setter: React.Dispatch<React.SetStateAction<Headings>> 
}) => {
  setter(prev => ({
    ...prev,
    flex: {
      ...prev.flex,
      [key]: value === "flex" ? "none" : "flex"
    }
  }));
};

const changeHeading = ({
  key,
  value,
  setter,
}: {
  key: HeadingKey;
  value: string;
  setter: React.Dispatch<React.SetStateAction<Headings>>;
}) => {
  setter((prev) => ({
    ...prev,
    value: {
      ...prev.value,
      [key]: value,
    },
  }));
};

const updatePalette = ({
  mode,
  key,
  value,
  setter,
}: {
  mode: "light" | "dark";
  key: "value" | "primary" | "secondary";
  value: string;
  setter: React.Dispatch<React.SetStateAction<Palette>>;
}) => {
  // Validate hex color
  const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

  if (!isValidHex) {
    console.warn(`Invalid hex color: ${value}`);
    return;
  }

  setter((prev) => ({
    ...prev,
    [mode]: {
      ...prev[mode],
      [key]: value,
    },
  }));
};

const handleSingleFormChange = ({
  id,
  value,
  ignore,
  setter,
}: HandleSingleFormChange) => {
  setter((prev) =>
    prev.map((field) =>
      field.id === id
        ? {
            ...field,
            ...(value !== undefined && { value }),
            ...(ignore !== undefined && { ignore }),
          }
        : field,
    ),
  );
};

const extractSingleInfo = ({
  icon,
  value,
  placeholder,
  ignore,
  id,
}: ExtractField) => {
  const hasValue = value && value.length > 0;
  return { value: hasValue ? value : placeholder, ignore, icon, id };
};

const extractHeading = ({
  headings,
  key,
}: {
  headings: Headings;
  key: string;
}) => {
  const val = headings.value[key];
  const placeholder = headings.placeholder[key] || "";
  return val && val.trim().length > 0 ? val : placeholder;
};

/* ------------------------------- useMultiForm ------------------------------ */

interface UseMultiFormParams<T extends string> {
  keys: T[];
  placeholders?: Record<T, string>;
}

const useMultiForm = <T extends string>({
  keys,
  placeholders = {} as Record<T, string>,
}: UseMultiFormParams<T>) => {
  const [forms, setForms] = useState<Record<T, string>[]>([]);

  const replace = (array: []) => {
    setForms(array);
  }

  const add = () => {
    const newEntry = Object.fromEntries(keys.map((k) => [k, ""])) as Record<
      T,
      string
    >;
    setForms((prev) => [...prev, newEntry]);
  };

  const remove = (index: number) => {
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const update = (index: number, key: T, value: string) => {
    setForms((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  };

  const cvData = useMemo(
    () =>
      forms.map(
        (form) =>
          Object.fromEntries(
            keys.map((k) => {
              const val = form[k];
              const placeholder = placeholders[k] || "";
              const isValid =
                val !== null && val !== undefined && val.trim().length > 0;
              return [k, isValid ? val : placeholder];
            }),
          ) as Record<(typeof keys)[number], string>,
      ),
    [forms, keys, placeholders],
  );

  return [forms, { add, remove, update, replace, cvData }] as const;
};

/* ------------------------------- Context Setup ----------------------------- */

const CreateContext = createContext<CreateState | undefined>(undefined);

const CreateProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { user } = useApp();

  const [pos, setPos] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [aspectRatio, setAspectRatio] = useState(`1 / ${297 / 210}`);

  const palettes = [palette1, palette2, palette3, palette4];
  const [palette, setPalette] = useState<Palette>({
    light: { ...palette4.light },
    dark: { ...palette4.dark },
  });
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [bodyFont, setBodyFont] = useState("Outfit");
  const [titleFont, setTitleFont] = useState("Squada One");
  const [layout, setLayout] = useState<"spacious" | "compact">("compact");
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileList, setProfileList] = useState<Array<any> | null>(null);
  const size = sizes?.[layout]?.viewing;
  const goldenRatio = sizes?.goldenRatio;
  const fonts = { body: bodyFont, title: titleFont };

  const { value: background, primary, secondary } = palette?.[mode];
  const contrast = theme.palette.getContrastText(background);
  const detectMode = ["#fff", "255,"].some((el) => contrast.includes(el))
    ? "dark"
    : "light";

  const GenTheme: Record<string, any> = {
    ...CustomTheme({
      bgHex: background,
      primary: primary,
      onPrimary: background,
      secondary: secondary,
      mode: detectMode,
    }),
  };

  const Theme = createTheme({
    typography: {
      fontFamily: bodyFont,
    },

    palette: {
      ...GenTheme,
    },
  });

  const Lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`;
  const Mauris = `Mauris eget porta neque, sed suscipit augue. Etiam eu tortor a mauris malesuada hendrerit a eu sem. Sed sodales diam eget ante accumsan consequat. Pellentesque efficitur tortor at diam blandit porta. In sem turpis, elementum eget libero in, ornare bibendum ante. Morbi ac ultricies ligula, eu condimentum diam.`;

  const [avatar, setAvatar] = useState<string | null>(null);
  const [showAvatar, setShowAvatar] = useState(true);

  const [headings, setHeadings] = useState<Headings>({
    value: {
      profession: "",
      profile: "",
      experience: "",
      education: "",
      skills: "",
      languages: "",
      projects: "",
      contact: "",
      phone:"",
      address: "",
      website: "",
      email: "",
    },
    placeholder: {
      profession: "Profession",
      profile: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      projects: "Projects",
      contact: "Contact",
      phone:"Phone",
      address: "Address",
      website: "Website",
      email: "Email",
    },
    flex: {
      profession:"flex",
      profile: "flex",
      experience: "flex",
      education: "flex",
      skills: "flex",
      languages: "flex",
      projects: "flex",
      contact: "flex",
    },
    keys: [
      "profession",
      "profile",
      "experience",
      "contact",
      "education",
      "skills",
      "languages",
      "projects",
      "phone",
      "address",
      "website",
      "email",
    ],
  });

  const flex = headings.flex;

  const extractedHeaders = Object.fromEntries(
    Object.keys(headings.placeholder).map((key) => [
      key,
      extractHeading({ headings, key }),
    ]),
  ) as Record<string, string>;

  /* ---------------------------- Single Forms ---------------------------- */

  const [singleForms, setSingleForms] = useState<Field[]>([
    {
      id: "profession",
      label: "Profession",
      placeholder: "SOFTWARE DEVELOPER",
      value: "",
      type: "text",
      section: "work",
      required: true,
      icon: "work",
    },
    {
      id: "name",
      label: "Full Name",
      placeholder: "Taylor Johnson",
      value: "",
      type: "text",
      section: "profile",
      required: true,
      icon: "id_card",
    },
    {
      id: "summary",
      label: "Profile Summary",
      placeholder: "Write a short bio...",
      value: Mauris,
      type: "text",
      section: "profile",
      required: true,
      icon: "frame_person",
      multiline: true,
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "johndoe@example.com",
      value: "",
      type: "email",
      section: "contact",
      icon: "alternate_email",
    },
    {
      id: "phone",
      label: "Phone Number",
      placeholder: "+123 456 7890",
      value: "",
      type: "tel",
      section: "contact",
      icon: "call",
    },
    {
      id: "website",
      label: "Website / Portfolio",
      placeholder: "https://yourportfolio.com",
      value: "",
      type: "url",
      section: "contact",
      icon: "language",
      ignore: false,
    },
    {
      id: "address",
      label: "Address / Zip Code",
      placeholder: "123 Street, City, Country",
      value: "",
      type: "text",
      section: "contact",
      icon: "home_pin",
      ignore: false,
    },
  ]);

  const contact = singleForms
    .filter((i) => i.section === "contact" && !(i.ignore))
    .map(extractSingleInfo);

  const profile = singleForms
    .filter((i) => i.section !== "contact")
    .reduce(
      (acc, item) => {
        acc[item.id] = extractSingleInfo(item);
        return acc;
      },
      {} as Record<string, any>,
    );

  /* ---------------------------- Multi Forms ----------------------------- */

  const experienceBase = {
    key: ["position", "company", "details", "bulletPoints"],
    placeholder: {
      position: "ENTER YOUR JOB POSITION HERE",
      company: "Company Name - street/state address here | 2022 - 2026",
      details: Lorem,
      bulletPoints: `This is a bullet point. \n This is another bullet point separated from the previous by a new line.`
    },
  };

  const [experience, expFns] = useMultiForm({
    keys: experienceBase.key,
    placeholders: experienceBase.placeholder,
  });

  const educationBase = {
    key: ["degree", "institution", "year", "details"],
    placeholder: {
      degree: "YOUR DEGREE NAME HERE",
      institution: "University or College Name",
      year: "2016 - 2022",
      details: Mauris,
    },
  };

  const [education, eduFns] = useMultiForm({
    keys: educationBase.key,
    placeholders: educationBase.placeholder,
  });

  const skillBase = {
    key: ["skill", "proficiency_(1_to_100)", "details"],
    placeholder: {
      skill: "PHOTOSHOP",
      "proficiency_(1_to_100)": "80",
      details: Mauris,
    },
  };

  const [skills, skillFns] = useMultiForm({
    keys: skillBase.key,
    placeholders: skillBase.placeholder,
  });

    const langBase = {
    key: ["language"],
    placeholder: {
      language: "English",
    },
  };

  const [languages, langFns] = useMultiForm({
    keys: langBase.key,
    placeholders: langBase.placeholder,
  });

      const projectsBase = {
    key: ["name", "bulletPoints", "year"],

    placeholder: {
      name: "PROJECT NAME",
      year: "2022-2026",
      bulletPoints: `This is a bullet point. \n This is another bullet point separated from the previous by a new line.`

    },
  };

  const [projects, projectsFns] = useMultiForm({
    keys: projectsBase.key,
    placeholders: projectsBase.placeholder,
  });

  /* ---------------------------- Builder Arrays --------------------------- */

  const singleFormsBuilder = [
    {
      heading: extractedHeaders["profession"],
      toMap: singleForms.filter((i) => i.section === "work"),
      setter: setSingleForms,
      handleChange: handleSingleFormChange,
    },
    {
      heading: extractedHeaders["profile"],
      toMap: singleForms.filter((i) => i.section === "profile"),
      setter: setSingleForms,
      handleChange: handleSingleFormChange,
    },
    {
      heading: extractedHeaders["contact"],
      toMap: singleForms.filter((i) => i.section === "contact"),
      setter: setSingleForms,
      handleChange: handleSingleFormChange,
    },
  ];

  const multiFormsBuilder = [
    {
      heading: extractedHeaders["experience"],
      keys: experienceBase.key,
      state: experience,
      functions: expFns,
    },
    {
      heading: extractedHeaders["education"],
      keys: educationBase.key,
      state: education,
      functions: eduFns,
    },
    {
      heading: extractedHeaders["skills"],
      keys: skillBase.key,
      state: skills,
      functions: skillFns,
    },
    {
      heading: extractedHeaders["languages"],
      keys: langBase.key,
      state: languages,
      functions: langFns,
    },
    {
      heading: extractedHeaders["projects"],
      keys: projectsBase.key,
      state: projects,
      functions: projectsFns,
    },
  ];

  const Builder = [
    { type: "single", content: singleFormsBuilder },
    { type: "multi", content: multiFormsBuilder },
  ];

  const fontsBuilder: FontConfig[] = [
    {
      label: "Headings Font",
      value: titleFont,
      setter: setTitleFont,
    },
    {
      label: "Body Font",
      value: bodyFont,
      setter: setBodyFont,
    },
  ];

  const paletteBuilder: PaletteConfig[] = [
    {
      key: "value",
      label: "Background Color (Hex)",
    },
    {
      key: "primary",
      label: "Primary Color (Hex)",
    },
    {
      key: "secondary",
      label: "Secondary Color (Hex)",
    },
  ];

  /* ---------------------------- CV Data Output --------------------------- */

  // const cvData: CVData = {
  //   contact,
  //   profile,
  //   experience: expFns.cvData,
  //   education: eduFns.cvData,
  //   skills: skillFns.cvData,
  //   languages: langFns.cvData,
  //   projects: projectsFns.cvData,
  //   headings: extractedHeaders,
  //   avatar,
  //   showAvatar,
  //   mode,
  //   layout,
  //   contentRef,
  //   fonts,
  //   size,
  //   goldenRatio,
  //   flex,
  // };

  const cvData: CVData = {
    contact,
    profile,
    experience: experience,
    education: education,
    skills: skills,
    languages: languages,
    projects: projects,
    headings: extractedHeaders,
    avatar,
    showAvatar,
    mode,
    layout,
    contentRef,
    fonts,
    size,
    goldenRatio,
    flex,
  };

  
  /* ---------------------------- Fetch and fill in info --------------------------- */

    useEffect(() => {

   const unsub = user && FS.read(firestore, {
      path: `users/${user?.myUid}/profiles`,
      listen: true,
      onResult: (data: any[]) => {
        if(data){
          setProfileList(data);
          if(!profileId){
      const { profile, experience, education, skills, languages, projects} = data?.[0] || {};
      setSingleForms(profile);
      expFns.replace(experience || []);
      eduFns.replace(education || [])
      skillFns.replace(skills || []);
      langFns.replace(languages || []);
      projectsFns.replace(projects || []);
      }                   
        }
      }
    })

    return () => {
      if(unsub && typeof unsub === "function") unsub();
    }
  }, [user, FS.read, profileId, expFns, eduFns, skillFns, langFns, projectsFns]);

  useEffect(() => {

    const data = profileList?.find(i => i.id === profileId);
    
    if(data){
      const { profile, experience, education, skills, languages, projects} = data || {};
      setSingleForms(profile);
      expFns.replace(experience || []);
      eduFns.replace(education || [])
      skillFns.replace(skills || []);
      langFns.replace(languages || []);
      projectsFns.replace(projects || []);
      }

  }, [profileId, profileList, expFns, eduFns, skillFns, langFns, projectsFns]);

  /* ---------------------------- Provider Return -------------------------- */

  return (
    <CreateContext.Provider
      value={{
        pos,
        setPos,
        Builder,
        cvData,
        avatar,
        setAvatar,
        showAvatar,
        setShowAvatar,
        palette,
        setPalette,
        layout,
        setLayout,
        mode,
        setMode,
        headings,
        setHeadings,
        contentRef,
        palettes,
        bodyFont,
        setBodyFont,
        titleFont,
        setTitleFont,
        fontsBuilder,
        changeHeading,
        updatePalette,
        paletteBuilder,
        aspectRatio,
        setAspectRatio,
        Theme,
        GenTheme,
        size,
        goldenRatio,
        toggleFlex,
        profileId,
        setProfileId,
        profileName,
        setProfileName,
        profileList, 
        setProfileList,
        singleForms,
        setSingleForms,
        expFns,
        eduFns,
        skillFns,
        langFns,
        projectsFns,
        experience,
        education,
        skills,
        languages,
        projects,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

/* ----------------------------- Custom Hook ----------------------------- */

const useCreate = () => {
  const context = useContext(CreateContext);
  if (!context) throw new Error("useCreate must be used within CreateProvider");
  return context;
};

export { CreateProvider, useCreate };
