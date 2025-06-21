import { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";

const Header = ({ mobile, isParallax }) => {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

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

  useEffect(() => {
    if (!navOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [navOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    // useDarkMode 커스텀 이벤트 전송
    window.dispatchEvent(new Event("theme-change"));
  };
  

  return (
    <>
      <header
        className={classNames(
          styles.header,
          !mobile && styles.pc,
          isDark && styles.dark,
          isVisible ? styles.visible : styles.hidden,
          isParallax && styles.isParallax
        )}
      >
        <button type="button" className={styles.btnMenu} onClick={() => setNavOpen(true)}>
          <span className="blind">navigation</span>
        </button>
        <Link to="/" className={styles.linkHome}></Link>
        <label className={styles.modeSwitch}>
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <span className={styles.slider}></span>
        </label>
      </header>
      {
        navOpen &&
        <div className={classNames(
          styles.navPopup,
          !mobile && styles.pc,
          isDark && styles.dark
        )}>
          <div className={styles.navPopupInner}>
            <div className={styles.navTop}>
              <button className={classNames(styles.closeButton)} onClick={() => setNavOpen(false)}>
                <span className="blind">close navigation</span>
              </button>
            </div>
            <Navigation />
          </div>
        </div>
      }
    </>
  );
};

export default Header;
