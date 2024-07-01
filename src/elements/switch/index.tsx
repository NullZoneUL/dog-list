import { useCallback, useEffect, useRef } from "react";
import "./style.scss";

interface SwitchProps {
  onInput: (checked: boolean) => void;
  defaultValue?: boolean;
}

const Switch = ({ onInput, defaultValue = false }: SwitchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInput_ = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onInput(event.target.checked),
    [onInput],
  );

  useEffect(() => {
    inputRef.current!.checked = defaultValue;
  }, []);

  return (
    <label className="switch">
      <input type="checkbox" onInput={onInput_} ref={inputRef} />
      <span className="switch-slider"></span>
    </label>
  );
};

export default Switch;
