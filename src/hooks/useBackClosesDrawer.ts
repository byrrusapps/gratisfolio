'use client';

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface UseBackClosesDrawerProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export default function useBackClosesDrawer({ isOpen, setOpen }: UseBackClosesDrawerProps): void {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isOpen || pushedRef.current) return;

    pushedRef.current = true;

    // Construct URL (Next.js doesn't expose hash, so we only include pathname + search)
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    // Push dummy entry
    window.history.pushState({ __drawer__: true }, "", url);

    const onPopState = () => {
      setOpen(false);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);

      // Clean up dummy entry if still present
      if (pushedRef.current && window.history.state?.__drawer__) {
        window.history.back();
      }
      pushedRef.current = false;
    };
  }, [isOpen, pathname, searchParams, setOpen]);

  // When drawer closes via UI, remove dummy entry if present
  useEffect(() => {
    if (!isOpen && pushedRef.current && window.history.state?.__drawer__) {
      pushedRef.current = false;
      window.history.back();
    }
  }, [isOpen]);
}
