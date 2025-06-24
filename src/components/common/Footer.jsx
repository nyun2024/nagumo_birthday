import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer = ({ mobile, isHome, isWebCam }) => {
  return (
    <footer
      className={classNames(
        styles.footer,
        mobile ? styles.mobile : styles.pc,
        isHome && styles.isHome,
        isWebCam && styles.isWebCam
      )}
    >
      <div className={styles.footerInner}>
        <p>Copyright 2021. kws04394 All rights reserved.</p>
        <a
          href="https://x.com/kws04394?s=21&t=stsc6fZOdwcWZCW8N_3nwA"
          target="_blank"
        >
          @kws04394
        </a>
      </div>
    </footer>
  );
};

export default Footer;
