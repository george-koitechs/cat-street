import React, {
  DetailedHTMLProps,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";
import classNames from "classnames";

import { useAutosizeTextArea } from "./use-autosize-textarea";
import { useCombinedRefs } from "./use-combined-refs";

import "./textarea.styles.scss";

interface TextAreaProps
  extends Omit<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "value" | "onChange"
  > {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  wrapperClassName?: string;
  className?: string;
  errorMessage?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      value = "",
      onChange,
      className,
      wrapperClassName,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs<HTMLTextAreaElement>(ref, textAreaRef);
    useAutosizeTextArea(combinedRef.current, value, 80);

    return (
      <div className={classNames("textarea", wrapperClassName)}>
        <textarea
          id={props.name}
          ref={combinedRef}
          value={value}
          onChange={onChange}
          className={classNames("textarea__textarea", className, {
            textarea__textarea_active: value,
            textarea__textarea_error: !!errorMessage,
          })}
          {...props}
        />
        <label
          htmlFor={props.name}
          className={classNames("textarea__label", {
            textarea__label_error: !!errorMessage,
          })}
        >
          {label}
        </label>
      </div>
    );
  }
);
