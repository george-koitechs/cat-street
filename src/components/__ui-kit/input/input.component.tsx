import React, { useRef } from "react";
import classNames from "classnames";

import "./input.styles.scss";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  errorMessage?: string;
  before?: {
    element: JSX.Element;
    size: number;
  };
}
export function Input({ label, errorMessage, before, ...inputProps }: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className="input">
      {!!before && (
        <div className="input__before" style={{ maxWidth: before.size }}>
          {before.element}
        </div>
      )}
      <input
        id={inputProps.name}
        className={classNames("input__input", {
          input__input_active: inputProps.value,
          input__input_error: !!errorMessage,
        })}
        {...inputProps}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label
        htmlFor={inputProps.name}
        className={classNames("input__label", {
          input__label_error: !!errorMessage,
          input__label_withBefore: !!before,
        })}
        style={{ left: before?.size && !inputProps.value && !focused ? 6 + before.size : 6 }}
      >
        {label}
      </label>
    </div>
  );
}
