import { useState, useEffect } from "react";

const useDarkMode = () => {
  const getTheme = () => localStorage.getItem("theme") === "dark";

  const [isDark, setIsDark] = useState(getTheme);

  useEffect(() => {
    const onThemeChange = () => {
      setIsDark(getTheme());
    };

    // 커스텀 이벤트 수신
    window.addEventListener("theme-change", onThemeChange);

    return () => {
      window.removeEventListener("theme-change", onThemeChange);
    };
  }, []);

  return isDark;
};

export default useDarkMode;
