import classNames from "classnames";
import styles from "./Container.module.scss";
import Footer from "./Footer";
import Header from "./Header";
import useIsMobile from "@utils/useIsMobile";
import useDarkMode from "@utils/useDarkMode";

const Container = ({ chidren, isHome }) => {
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
      <Header mobile={isMobile} />
      <div className={styles.contents}>{chidren}</div>
      <Footer mobile={isMobile} />
    </div>
  );
};

export default Container;
