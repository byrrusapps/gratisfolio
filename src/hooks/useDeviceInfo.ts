import { useEffect, useState } from "react";

type OS = "android" | "ios" | "other";

interface DeviceInfo {
  isMobile: boolean;
  os: OS;
}

interface UseDeviceInfoOptions {
  watch?: boolean;
}

/**
 * OS is one of: 'android' | 'ios' | 'other'
 * Recomputes on: resize, orientation changes, (pointer: coarse) changes,
 * and navigator.userAgentData 'change' (when supported).
 */
export function useDeviceInfo({ watch = true }: UseDeviceInfoOptions = {}): DeviceInfo {
  const [state, setState] = useState<DeviceInfo>({ isMobile: false, os: "other" });

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const nav = navigator as Navigator & {
      userAgentData?: {
        platform?: string;
        addEventListener?: (event: string, handler: () => void) => void;
        removeEventListener?: (event: string, handler: () => void) => void;
      };
    };

    const compute = () => {
      const ua = nav.userAgent || "";
      const platform =
        (nav.userAgentData && nav.userAgentData.platform) ||
        nav.platform ||
        "";

      const isAndroid = /Android/i.test(ua) || /Android/i.test(platform);

      // iPadOS 13+ reports "MacIntel" but is touch-capable
      const isIOS =
        /iPhone|iPad|iPod/i.test(ua) ||
        /iOS|iPhone|iPad|iPod/i.test(platform) ||
        (platform === "MacIntel" && navigator.maxTouchPoints > 1);

      const os: OS = isAndroid ? "android" : isIOS ? "ios" : "other";

      const coarse =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;

      const isMobile =
        isAndroid ||
        isIOS ||
        coarse ||
        /Mobi|Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);

      setState((prev) =>
        prev.isMobile === isMobile && prev.os === os ? prev : { isMobile, os }
      );
    };

    // Throttle bursts of events using rAF
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    // Initial run
    compute();

    if (!watch) return () => cancelAnimationFrame(raf);

    // Viewport/orientation listeners
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    if (window.screen?.orientation?.addEventListener) {
      window.screen.orientation.addEventListener("change", schedule);
    }

    // Pointer coarse/fine changes (e.g., plugging mouse into a tablet)
    const mm = window.matchMedia?.("(pointer: coarse)");
    if (mm?.addEventListener) mm.addEventListener("change", schedule);

    // UA-CH changes (e.g., Request Desktop Site or permission changes)
    if (nav.userAgentData?.addEventListener) {
      nav.userAgentData.addEventListener("change", schedule);
    }

    // When tab becomes visible, recalc in case environment changed
    document.addEventListener("visibilitychange", schedule);

    return () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      if (window.screen?.orientation?.removeEventListener) {
        window.screen.orientation.removeEventListener("change", schedule);
      }
      if (mm?.removeEventListener) mm.removeEventListener("change", schedule);
      if (nav.userAgentData?.removeEventListener) {
        nav.userAgentData.removeEventListener("change", schedule);
      }
      document.removeEventListener("visibilitychange", schedule);
      cancelAnimationFrame(raf);
    };
  }, [watch]);

  return state; // { isMobile, os }
}

export default useDeviceInfo;
