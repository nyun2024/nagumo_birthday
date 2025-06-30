import { useState, useEffect } from "react";
import order from "@img/photoBooth/frame/order/order_nagumo_frame.png";
import holydays from "@img/photoBooth/frame/holydays/holydays_nagumo_frame.png";
import killerExhibition from "@img/photoBooth/frame/killerExhibition/killerExhibition_frame.png";
import ticket from "@img/photoBooth/frame/ticketType/ticket_frame.png";
import useIsMobile from "@utils/useIsMobile";
import styles from "./FrameTypeButton.module.scss";
import classNames from "classnames";

const imgs = {
  order,
  holydays,
  killerExhibition,
  ticket,
};
const titles = {
  order: "OREDR",
  holydays: "Holydays",
  killerExhibition: "세기의 킬러전",
  ticket: "Ticket",
};

const FrameTypeButton = ({ type, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imgSrc = imgs[type];
  const isMobile = useIsMobile();

  const handleZoomClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={classNames(
          isMobile ? styles.mobile : styles.pc,
          styles.frameTypeButton
        )}
      >
        <div className={styles.frameName}>{titles[type]}</div>
        <div
          className={classNames(
            styles.imgWrap,
            (type === "killerExhibition" || type === "ticket") && styles.lgFrame
          )}
        >
          {imgSrc && <img src={imgSrc} alt={`${type} icon`} />}
        </div>
        <button
          type="button"
          className={styles.selectBtn}
          onClick={onClick}
        ></button>
        <button
          type="button"
          className={styles.zoomBtn}
          onClick={handleZoomClick}
        ></button>
      </div>

      {isOpen && (
        <div className={styles.frameLayer}>
          <div className={styles.dim} onClick={handleCloseClick}></div>
          <img src={imgSrc} alt={`${type} icon`} />
        </div>
      )}
    </>
  );
};

export default FrameTypeButton;
