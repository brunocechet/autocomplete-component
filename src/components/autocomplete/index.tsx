import * as React from "react";

import HighlightText from "./components/highlight-text";

import "./autocomplete.css";

export type ItemT = {
  id: string;
  label: string;
};

export type PropsT = {
  initialValue?: string;
  items: ItemT[];
  onChange: (inputValue: string) => void;
};

export default function Autocomplete({
  initialValue = "",
  items,
  onChange,
}: PropsT) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOnChange = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      // trimming the string avoids unnecessary calls to onChange when typing space
      const searchCriteria = event.currentTarget.value.trim();

      onChange(searchCriteria);
    },
    [onChange]
  );

  const renderItems = React.useCallback((items: ItemT[]) => {
    if (items.length === 0) {
      return null;
    }

    // used for highlighting
    const inputValue = inputRef.current?.value.trim() || "";

    return (
      <ul className="autocomplete__items">
        {items.map((item) => (
          <li className="autocomplete__option" key={item.id}>
            <HighlightText searchWord={inputValue} text={item.label} />
          </li>
        ))}
      </ul>
    );
  }, []);

  return (
    <div className="autocomplete">
      <input
        className="autocomplete__input"
        defaultValue={initialValue}
        onChange={handleOnChange}
        ref={inputRef}
        type="text"
      />
      {renderItems(items)}
    </div>
  );
}
