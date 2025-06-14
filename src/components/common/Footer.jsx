import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer = ({ mobile }) => {
  return (
    <footer className={classNames(styles.footer, mobile ? "" : styles.pc)}>
      <p>Copyright 2021. kws04394 All rights reserved.</p>
      <a
        href="https://x.com/kws04394?s=21&t=stsc6fZOdwcWZCW8N_3nwA"
        target="_blank"
      >
        @kws04394
      </a>
    </footer>
  );
};

export default Footer;
