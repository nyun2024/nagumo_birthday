import { useEffect } from "react";
import Container from "@components/common/Container";
import classNames from "classnames";
import styles from "./Reference.module.scss";
import useIsMobile from "@utils/useIsMobile";

const Reference = () => {
  const isMobile = useIsMobile();

  // WebCam 이미지 초기화
  useEffect(() => {
    localStorage.removeItem("filteredImages");
    localStorage.setItem("saveEdit", false);
  }, []);

  return (
    <Container>
      <div className={classNames(styles.refContainer, !isMobile && styles.pc)}>
        <div className={styles.title}>Reference</div>
        <ul>
          <li>
            <a
              href="https://youtu.be/QI4N-A9wQdk?si=faqR8pHEo9Hx2io2"
              target="_blank"
            >
              【SAKAMOTO DAYS】 ORDER PV 【最新16巻発売記念】
            </a>
          </li>
          <li>
            <a href="https://youtu.be/XFJ7XNPzmaM?si=X934ie-gMOhjtGEb">
              【公式】『SAKAMOTO DAYS』1周年&5巻発売記念PV
            </a>
          </li>
          <li>
            <a href="https://youtu.be/1Fp_68qdz_w?si=qkn6-HkMI8XJbhp6">
              JUMP MV /『SAKAMOTO DAYS』×『走れSAKAMOTO』| Vaundy
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Reference;
