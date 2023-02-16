import { useEffect } from "react";

export const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string, maxHeight?: number) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = maxHeight && textAreaRef.scrollHeight >= maxHeight ? maxHeight : textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
