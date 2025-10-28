'use client';

import { useBackClosesDrawer } from '@/hooks';
import { useApp } from '@/providers/AppContext';

export function DrawerBackHandler() {
  const { drawer, setDrawer } = useApp();
  
  useBackClosesDrawer({ isOpen: drawer, setOpen: setDrawer });
  
  return null; // This component doesn't render anything
}