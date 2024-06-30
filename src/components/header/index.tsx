import Switch from "@elements/switch";
import PawImage from "@assets/images/paw.webp";
import { useCallback } from "react";
import "./style.scss";

const Header = () => {
  const onStyleModeSwitch = useCallback((checked: boolean) => {
    document.documentElement.setAttribute(
      "data-color-mode",
      checked ? "dark" : "light",
    );
  }, []);

  return (
    <header>
      <img src={PawImage} />
      <div className="header-right-position">
        <Switch onInput={onStyleModeSwitch} />
      </div>
    </header>
  );
};

export default Header;
