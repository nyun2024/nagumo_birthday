import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FrameTypeButton from "@components/button/FrameTypeButton";
import styles from "./SelectFrame.module.scss";
import useIsMobile from "@utils/useIsMobile";
import Container from "@components/common/Container";
import classNames from "classnames";
import useDarkMode from "@utils/useDarkMode";

const SelectFrame = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDark = useDarkMode();

  const goToWebCam = (type) => {
    navigate(`/webcam/${type}`);
  };

  useEffect(() => {
    // WebCam 이미지 초기화
    localStorage.removeItem("filteredImages");
    localStorage.setItem("saveEdit", false);
  }, []);

  return (
    <Container
      className={classNames(
        isMobile ? styles.mobile : styles.pc,
        isDark && styles.dark,
        styles.selectContainer
      )}
    >
      <div className={styles.title}>프레임을 선택해 주세요.</div>
      <div className={styles.frameContainer}>
        <FrameTypeButton type="order" onClick={() => goToWebCam("order")} />
        <FrameTypeButton
          type="holydays"
          onClick={() => goToWebCam("holydays")}
        />
        <FrameTypeButton
          type="killerExhibition"
          onClick={() => goToWebCam("killerExhibition")}
        />
        <FrameTypeButton type="ticket" onClick={() => goToWebCam("ticket")} />
      </div>
    </Container>
  );
};

export default SelectFrame;
