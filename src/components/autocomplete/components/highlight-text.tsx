import * as React from "react";

import "./highlight-text.css";

type PropsT = {
  searchWord: string;
  text: string;
};

export default function HighlightText({ searchWord, text }: PropsT) {
  // edge-case: without searchWord there is nothing to highlight here
  const hasSearchWord = searchWord.trim().length > 0;
  if (!hasSearchWord) {
    return <>{text}</>;
  }

  // edge-case: no text, returning null is the best we can do for now
  const hasText = text.trim().length > 0;
  if (!hasText) {
    return null;
  }

  // regular expression to get `searchWord` globally on the string and case insensitive
  const regex = new RegExp(searchWord, "gi");

  // splitting the text into chunks by `searchWord`, this way we are also removing `searchWord` from the text
  const textChunks = text.split(regex);

  const elements: React.ReactNode[] = textChunks.map(
    (chunk: string, index: number, array: string[]) => {
      const isLast = index === array.length - 1;
      let append = null;

      // if `array` has more than one item in the list, it means that we found `searchWord` in `text`
      // as we're creating a new list based on `textChunks` we need to append `searchWord` again, but now highlighted
      if (!isLast && array.length > 1) {
        append = <span className="option--highlighted">{searchWord}</span>;
      }

      return (
        <span className="option" key={index}>
          {chunk}
          {append}
        </span>
      );
    }
  );

  return <>{elements}</>;
}
