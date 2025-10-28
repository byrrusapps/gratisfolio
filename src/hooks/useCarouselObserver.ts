// useCarouselObserver.ts
import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  axis?: "x" | "y";
}

interface UseCarouselObserverReturn {
  containerRef: React.RefObject<HTMLElement | null>;
  registerItem: (index: number) => (el: HTMLElement | null) => void;
  activeIndex: number;
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
}

export default function useCarouselObserver({
  threshold = 0.6,
  rootMargin = "0px",
  axis = "x",
}: UseCarouselObserverOptions = {}): UseCarouselObserverReturn {
  const containerRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemsRefMap = useRef<Map<number, HTMLElement>>(new Map());
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const registerItem = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      const prev = itemsRefMap.current.get(index);
      if (prev && observerRef.current) observerRef.current.unobserve(prev);

      if (el) {
        itemsRefMap.current.set(index, el);
        if (observerRef.current) observerRef.current.observe(el);
      } else {
        itemsRefMap.current.delete(index);
      }
    },
    []
  );

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const node = itemsRefMap.current.get(index);
      const root = containerRef.current;
      if (!node || !root) return;

      // For carousels using CSS scroll-snap this is great:
      node.scrollIntoView({ behavior, block: "nearest", inline: "start" });

      // If you don't use scroll-snap and want pixel alignment, uncomment:
      // const rect = node.getBoundingClientRect();
      // const rootRect = root.getBoundingClientRect();
      // const delta = axis === "x"
      //   ? rect.left - rootRect.left + root.scrollLeft
      //   : rect.top - rootRect.top + root.scrollTop;
      // axis === "x"
      //   ? root.scrollTo({ left: delta, behavior })
      //   : root.scrollTo({ top: delta, behavior });
    },
    [axis]
  );

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    const opts: IntersectionObserverInit = {
      root: rootEl,
      rootMargin,
      threshold: Array.isArray(threshold) ? threshold : [threshold],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // consider only intersecting entries and choose the best one
      const visibleEntries = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) return;

      const best = visibleEntries[0].target;
      // find the index that owns this node
      for (const [idx, el] of itemsRefMap.current.entries()) {
        if (el === best) {
          setActiveIndex(idx);
          break;
        }
      }
    }, opts);

    // start observing anything already registered
    itemsRefMap.current.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [threshold, rootMargin]);

  return {
    containerRef,
    registerItem,
    activeIndex,
    scrollToIndex,
  };
}