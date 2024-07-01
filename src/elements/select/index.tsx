import { useEffect, useRef } from "react";
import "./style.scss";

interface SelectProps {
  id: string;
  items: Array<string>;
  onChange: (index: number) => void;
}

const Select = ({ id, items, onChange }: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectRef.current!.selectedIndex = 0;
    onChange(0);
  }, [items, onChange]);

  return (
    <select
      data-testid={id}
      onChange={(event) => onChange(event.target.selectedIndex)}
      className="ds-select"
      ref={selectRef}
    >
      {items?.map((item, index) => (
        <option key={`DS_SELECT_${id}_${index}`}>{item}</option>
      ))}
    </select>
  );
};

export default Select;
