import React, { useState } from "react";
import classNames from "classnames";

import "./select.styles.scss";

interface SelectProps<T> {
  value: string;
  label?: string;
  onChange: (o: string) => void;
  options: T[];
  optionKey: string;
  uniqueKey?: string;
  withFlag?: boolean;
}
export function Select<T extends Record<string, any>>({
  value,
  label,
  onChange,
  options,
  optionKey,
  uniqueKey,
  withFlag,
}: SelectProps<T>) {
  const [isOpened, setIsOpened] = useState(false);

  function open() {
    setIsOpened(true);
  }
  function close() {
    setIsOpened(false);
  }
  function selectValue(v: string) {
    onChange(v);
    close();
  }

  return (
    <div className="select">
      <div className="select__select" onClick={open}>
        <span className="select__value">
          {withFlag && (
            <img
              src={options.find((o) => o[optionKey] === value)?.flag}
              alt=""
              style={{ width: 16 }}
            />
          )}
          {value}
        </span>
        <img src="/images/arrow-down.svg" alt="" className="select_arrow"></img>
      </div>
      {!!label && (
        <p
          onClick={!!value ? undefined : open}
          className={classNames("select__label", {
            select__label_focused: isOpened || !!value,
          })}
        >
          {label}
        </p>
      )}
      {isOpened && (
        <>
          <div className="select__overlay" onClick={close}></div>
          <div className="select__options">
            {options.map((c) => (
              <div
                className={classNames("select__option", {
                  select__option_selected: value === c[optionKey],
                })}
                key={c[uniqueKey ?? optionKey]}
                onClick={() => selectValue(c[optionKey])}
              >
                {withFlag && <img src={c.flag} alt="" style={{ width: 16 }} />}
                {c[optionKey]}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
