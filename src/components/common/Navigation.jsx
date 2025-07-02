import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import useIsMobile from "@utils/useIsMobile";
import classNames from "classnames";

const Navigation = () => {
  const isMobile = useIsMobile();
  return (
    <nav className={classNames(styles.navigation, !isMobile && styles.pc)}>
      <ul>
        <li>
          <span>01</span>
          <Link to={"/photoBooth"}>
            Nagumo 4cut
            {isMobile ? <br /> : " "}
            PhotoBooth
          </Link>
        </li>
        <li>
          <span>02</span>
          <Link to={"/message"}>
            HBD Message
            {isMobile ? <br /> : " "}
            To Nagumo
          </Link>
        </li>
        <li>
          <span>03</span>
          <Link to={"/etc"}>Other Sites</Link>
        </li>
        <li>
          <span>04</span>
          <Link to={"/reference"}>Reference</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
