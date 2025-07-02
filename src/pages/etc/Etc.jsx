import Container from "@components/common/Container";
import sakadayTest from "@img/etc/sakaday_test.jpg";
import shinSnapshot from "@img/etc/shin_snapshot.jpg";
import styles from "./Etc.module.scss";
import useIsMobile from "@utils/useIsMobile";
import classNames from "classnames";
const Etc = () => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <div className={classNames(styles.etcContainer, !isMobile && styles.pc)}>
        <a
          href="https://sakaday-test.pages.dev/"
          target="_blank"
          className={styles.siteLink}
        >
          <img src={sakadayTest} alt="" />
          <div className={styles.title}>사카데이 능력고사</div>
        </a>
        <a
          href="https://shin-snapshots.pages.dev/"
          target="_blank"
          className={styles.siteLink}
        >
          <img src={shinSnapshot} alt="" />
          <div className={styles.title}>
            2025 신 생일기념
            <br />
            신둥네컷
          </div>
        </a>
      </div>
    </Container>
  );
};

export default Etc;
