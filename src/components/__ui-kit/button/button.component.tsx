import React from "react";
import classNames from "classnames";

import "./button.styles.scss";

export type ButtonVariant = "v1" | "v2" | "v3";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({ variant = "v1", children, ...buttonProps }) => {
  return (
    <button {...buttonProps} className={classNames("button", buttonProps.className, `button_${variant}`)}>
      {children}
    </button>
  );
};
