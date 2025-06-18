import classNames from "classnames";
import styles from "./Container.module.scss";
import Footer from "./Footer";
import Header from "./Header";
import useIsMobile from "@utils/useIsMobile";
import useDarkMode from "@utils/useDarkMode";

const Container = ({ children, isHome, isParallax }) => {
  const isMobile = useIsMobile();
  const isDark = useDarkMode();

  return (
    <div
      className={classNames(
        styles.container,
        !isMobile && styles.pc,
        isDark && styles.dark,
        isHome && styles.homeContainer
      )}
    >
      <Header mobile={isMobile} isParallax={isParallax} />
      <div className={styles.contents}>{children}</div>
      <Footer mobile={isMobile} />
    </div>
  );
};

export default Container;
