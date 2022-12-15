import * as React from "react";

import AutoComplete, { ItemT } from "../../components/autocomplete";

import { searchPoemsByTitle } from "../../apis/poetrydb";

import "./poetry.css";

export default function Poetry() {
  const [items, setItems] = React.useState<ItemT[]>([]);

  // useRef instead of useState prevents re-rendering this component when `debouncedOnChange` is triggered
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const onChange = React.useCallback(async (searchCriteria: string) => {
    // nothing to search for, nothing to show
    if (searchCriteria.trim().length === 0) {
      setItems([]);
      return;
    }

    const result = await searchPoemsByTitle(searchCriteria);

    const resultItems = result.map((item) => ({
      id: item.id,
      label: `${item.title}, by ${item.author}`,
    }));

    setItems(resultItems);
  }, []);

  /**
   * debouncing the call to onChange prevents excessive API calls while the user is typing
   */
  const debouncedOnChange = React.useCallback(
    (searchCriteria: string) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onChange(searchCriteria), 750);
    },
    [onChange]
  );

  return (
    <div className="poetry">
      <label>
        Search for poems by title:
        <br />
        <small>Try "angels"</small>
        <AutoComplete items={items} onChange={debouncedOnChange} />
      </label>
    </div>
  );
}
