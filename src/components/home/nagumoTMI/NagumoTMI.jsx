import { useRef, useState } from "react";
import Dice from "./Dice";
import nagumo from "@img/home/nagumoTMI/rolling_dice_nagumo.jpg";
import styles from "./NagumoTMI.module.scss";
import useIsMobile from "@utils/useIsMobile";
import classNames from "classnames";
import { Tmi } from "./Tmi";

const NagumoTMI = () => {
  const diceRef = useRef();
  const isMobile = useIsMobile();
  const [tmiMessage, setTmiMessage] = useState("");

  const handleRoll = () => {
    diceRef.current?.roll();

    let newIndex = Math.floor(Math.random() * Tmi.length);

    // 직전 tmi랑 안겹치게
    if (Tmi.length > 1) {
      while (Tmi[newIndex] === tmiMessage) {
        newIndex = Math.floor(Math.random() * Tmi.length);
      }
    }

    setTimeout(() => {
      setTmiMessage(Tmi[newIndex]);
    }, 1100);
  };

  return (
    <div
      className={classNames(styles.nagumoTMIContainer, !isMobile && styles.pc)}
    >
      <div className={styles.title}>Nagumo's TMI</div>
      <p className={styles.desc}>
        주사위를 굴리면 나구모의 TMI가 랜덤으로 나옵니다.
      </p>

      <div className={styles.nagumoTMIBox}>
        <div className={styles.nagumoDiceWrap}>
          <img src={nagumo} className={styles.img} />
          <Dice ref={diceRef} />
        </div>
        <div className={styles.tmiTextBOx}>
          <div className={styles.tmiText}>
            <p>나구모는요...</p>
            <p>{tmiMessage}</p>
          </div>
          <button
            type="button"
            className={styles.rollingBtn}
            onClick={handleRoll}
          >
            주사위
            {isMobile ? <br /> : " "}
            굴리기!
          </button>
        </div>
      </div>
    </div>
  );
};

export default NagumoTMI;
