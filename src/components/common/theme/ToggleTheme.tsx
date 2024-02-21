import React from "react";
import { useAppContext } from "@/context/appContext";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const ToggleTheme = () => {

    const { theme, setTheme } = useAppContext();

  const clickHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {theme === "dark" ? (
        <MdLightMode
          onClick={clickHandler}
          size={22}
          className="text-white cursor-pointer"
        />
      ) : (
        <MdDarkMode
          onClick={clickHandler}
          size={22}
          className="text-black cursor-pointer"
        />
      )}
    </>
  );
};

export default ToggleTheme;
