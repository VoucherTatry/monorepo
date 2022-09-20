import { useTransition } from "@remix-run/react";
import type { ReactElement, RefObject } from "react";
import { useEffect, useRef } from "react";

export function useProgress(): RefObject<HTMLDivElement> {
  const el = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { location } = useTransition();

  useEffect(() => {
    const elCurrent = el.current;
    if (!location || !elCurrent) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    elCurrent.style.width = `0%`;

    let updateWidth = (ms: number) => {
      timeout.current = setTimeout(() => {
        let width = parseFloat(elCurrent.style.width);
        let percent = !isNaN(width) ? 10 + 0.9 * width : 0;

        elCurrent!.style.width = `${percent}%`;

        updateWidth(100);
      }, ms);
    };

    updateWidth(300);

    return () => {
      clearTimeout(timeout.current);

      if (elCurrent!.style.width === `0%`) {
        return;
      }

      elCurrent!.style.width = `100%`;
      timeout.current = setTimeout(() => {
        if (elCurrent?.style.width !== "100%") {
          return;
        }

        elCurrent.style.width = ``;
      }, 200);
    };
  }, [location]);

  return el;
}

function Progress(): ReactElement {
  const progress = useProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-1">
      <div
        ref={progress}
        className="bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 transition-all ease-out"
      />
    </div>
  );
}

export default Progress;
