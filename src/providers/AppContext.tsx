'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useDeviceInfo, useHandleAuth, useHandleTheme, useUpdateSettings } from '@/hooks';
import { Midnight } from '@/scripts/Themes';

// 1️⃣ Define types for your state
interface AppState {
  isMobile: boolean;
  os: string;
  user: any;
  setUser: (user: any) => void;
  mode: string;
  setMode: (mode: 'light' | 'dark') => void;
  appPath: string;
  setAppPath: (path: string) => void;
  sidebar: boolean;
  setSidebar: (val: boolean) => void;
  drawer: boolean;
  setDrawer: (val: boolean) => void;
  drawerView?: any;
  setDrawerView: (view: any) => void;
  msg: string;
  setMsg: (msg: string) => void;
  msgOpen: boolean;
  setMsgOpen: (open: boolean) => void;
  msgType: string;
  setMsgType: (type: string) => void;
  font: string;
  setFont: (font: string) => void;
  info: any;
  setInfo: (val: any) => void;
  search: string;
  setSearch: (val: string) => void;
  dynamicTheme: string;
  setDynamicTheme: (theme: string) => void;
  appTheme: any;
  setAppTheme: (theme: any) => void;
  mounted: boolean; // Add this to track if client has mounted
  defaultProfile?: any;
  setDefaultProfile: (profile: any) => void;
}

// 2️⃣ Create the context
const AppContext = createContext<AppState | undefined>(undefined);

// 3️⃣ Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const { isMobile, os } = useDeviceInfo();
  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [appPath, setAppPath] = useState('Feed');
  const [sidebar, setSidebar] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerView, setDrawerView] = useState<any>();
  const [msg, setMsg] = useState('This is a sample message');
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState('info');
  const [font, setFont] = useState("'Vend Sans', sans-serif");
  const [info, setInfo] = useState<any>(false);
  const [search, setSearch] = useState('');
  const [dynamicTheme, setDynamicTheme] = useState('Automatic');
  const [appTheme, setAppTheme] = useState(Midnight);
  const [defaultProfile, setDefaultProfile] =  useState<any>();

  // Single useEffect to initialize all client-side values
  useEffect(() => {
    setMounted(true);
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light');
    
    // Load dynamicTheme from localStorage
    const savedTheme = localStorage.getItem('dynamicTheme');
    if (savedTheme) {
      setDynamicTheme(savedTheme);
    }
  }, []);

  // Hooks / effects
  useHandleAuth({user, setUser});
  useHandleTheme({setAppTheme, dynamicTheme});
  useUpdateSettings({ dynamicTheme });

  return (
    <AppContext.Provider
      value={{
        isMobile,
        os,
        user,
        setUser,
        mode,
        setMode,
        appPath,
        setAppPath,
        sidebar,
        setSidebar,
        drawer,
        setDrawer,
        drawerView,
        setDrawerView,
        msg,
        setMsg,
        msgOpen,
        setMsgOpen,
        msgType,
        setMsgType,
        font,
        setFont,
        info,
        setInfo,
        search,
        setSearch,
        dynamicTheme,
        setDynamicTheme,
        appTheme,
        setAppTheme,
        mounted,
        defaultProfile,
        setDefaultProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 4️⃣ Hook to consume context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}