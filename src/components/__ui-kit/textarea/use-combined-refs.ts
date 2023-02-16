import React from "react";

export function useCombinedRefs<T>(...refs: any[]): React.MutableRefObject<null | T> {
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
