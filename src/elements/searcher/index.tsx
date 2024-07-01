import SearchIcon from "@assets/images/search.svg";
import Translations from "@assets/translations/en.json";
import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

interface SearcherProps {
  onInput: (value: string) => void;
  numResults?: number;
  defaultValue?: string;
}

const TIME_UPDATE = 300;

const Searcher = ({
  numResults,
  defaultValue = "",
  onInput,
}: SearcherProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateTimeout = useRef<number>();

  const onInput_ = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      window.clearTimeout(updateTimeout.current);
      updateTimeout.current = window.setTimeout(() => {
        onInput(value.toLowerCase());
      }, TIME_UPDATE);
    },
    [onInput],
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(updateTimeout.current);
    };
  }, []);

  return (
    <div className="searcher-container">
      <div className="searcher-input-container">
        <img src={SearchIcon} />
        <input
          type="text"
          placeholder={Translations.search}
          onInput={onInput_}
          ref={inputRef}
          value={inputValue}
        />
      </div>
      <div className="searcher-num-results">
        {numResults ? `${numResults} ${Translations.results}` : ""}
      </div>
    </div>
  );
};

export default Searcher;
