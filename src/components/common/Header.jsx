import { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = ({ mobile }) => {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 50) {
        // 스크롤 내리는 중 + 약간 내린 후
        setIsVisible(false);
      } else {
        // 스크롤 올리는 중
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    // useDarkMode 커스텀 이벤트 전송
    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <header
      className={classNames(
        styles.header,
        mobile ? "" : styles.pc,
        isDark ? styles.dark : "",
        isVisible ? styles.visible : styles.hidden
      )}
    >
      <button type="button" className={styles.btnMenu}>
        <span className="blind">메뉴 네비게이션</span>
      </button>
      <Link to="/" className={styles.linkHome}></Link>
      <label className={styles.modeSwitch}>
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className={styles.slider}></span>
      </label>
    </header>
  );
};

export default Header;
