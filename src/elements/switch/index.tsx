import { useCallback } from "react";
import "./style.scss";

interface SwitchProps {
  onInput: (checked: boolean) => void;
}

const Switch = ({ onInput }: SwitchProps) => {
  const onInput_ = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onInput(event.target.checked),
    [onInput],
  );

  return (
    <label className="switch">
      <input type="checkbox" onInput={onInput_} />
      <span className="switch-slider"></span>
    </label>
  );
};

export default Switch;
