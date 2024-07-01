import Switch from "@elements/switch";
import PawImage from "@assets/images/paw.webp";
import { useCallback, useEffect, useRef } from "react";
import { setViewMode, getViewMode } from "@utils/mode";
import "./style.scss";

const Header = () => {
  const defaultViewMode = useRef(getViewMode());

  const onStyleModeSwitch = useCallback((checked: boolean) => {
    document.documentElement.setAttribute(
      "data-color-mode",
      checked ? "dark" : "light",
    );
    setViewMode(checked);
  }, []);

  useEffect(() => {
    onStyleModeSwitch(defaultViewMode.current);
  }, []);

  return (
    <header>
      <img src={PawImage} />
      <div className="header-right-position">
        <Switch
          onInput={onStyleModeSwitch}
          defaultValue={defaultViewMode.current}
        />
      </div>
    </header>
  );
};

export default Header;
