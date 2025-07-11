import { useEffect } from "react";
import Container from "@components/common/Container";
import { Comments } from "@hyvor/hyvor-talk-react";
import hbdNagumo from "@img/hbdMessage/hbd_nagumo.png";
import useIsMobile from "@utils/useIsMobile";
import styles from "./HbdMessage.module.scss";
import classNames from "classnames";

const HbdMessage = () => {
  const isMobile = useIsMobile();

  // WebCam 이미지 초기화
  useEffect(() => {
    localStorage.removeItem("filteredImages");
    localStorage.setItem("saveEdit", false);
  }, []);

  return (
    <Container
      className={classNames(styles.hbdContainer, !isMobile && styles.pc)}
    >
      <div className={styles.topMainContainer}>
        <h3 className={styles.hbdTitle}>
          Happy Birthday
          <br />
          Nagumo
        </h3>
        <div className={styles.infoWrap}>
          <div className={styles.cautionList}>
            <div className={styles.desc}>
              나구모에게 생일 축하 메세지를
              {isMobile ? <br /> : " "}
              남겨주세요!
            </div>
            <ul>
              <li>
                2025.07.31까지만 댓글 작성이 가능합니다. 작성된 댓글은 추후에도
                보실 수 있습니다.
              </li>
              <li>
                스팸성 또는 도배성, 무분별하고 악의적인 댓글은 사전 통보 없이
                삭제 조치합니다.
              </li>
              <li>
                욕설, 비방, 차별적 표현 등 타인에게 불쾌감을 줄 수 있는 댓글은
                금지됩니다.
              </li>
              <li>
                사용자가 남긴 댓글은 사이트 운영자의 의사와는 관련이 없습니다.
              </li>
            </ul>
          </div>
          <div className={styles.imgWrap}>
            <img
              src={hbdNagumo}
              className={styles.nagumoImg}
              alt="happy birthday nagumo"
            />
          </div>
        </div>
      </div>
      <div className={styles.messageWrap}>
        <div className={styles.loading}>
          로딩 중이니 잠시만 기다려 주세요...
        </div>
        <div className={styles.message}>
          <Comments website-id={13439} page-id={1} />
        </div>
      </div>
    </Container>
  );
};

export default HbdMessage;
