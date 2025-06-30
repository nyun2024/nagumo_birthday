import { useState } from "react";
import styles from "./NotRobot.module.scss";
import boxImg1 from "@img/home/parallaxSlide/sec03/section03_1.jpg";
import boxImg2 from "@img/home/parallaxSlide/sec03/section03_2.jpg";
import boxImg3 from "@img/home/parallaxSlide/sec03/section03_3.jpg";
import boxImg4 from "@img/home/parallaxSlide/sec03/section03_4.jpg";
import boxImg5 from "@img/home/parallaxSlide/sec03/section03_5.jpg";
import boxImg6 from "@img/home/parallaxSlide/sec03/section03_6.jpg";
import boxImg7 from "@img/home/parallaxSlide/sec02/section02_3.jpg";
import boxImg8 from "@img/home/parallaxSlide/sec02/section02_4.jpg";
import boxImg9 from "@img/home/parallaxSlide/sec02/section02_5.jpg";
import classNames from "classnames";

const boxImgs = [
  boxImg1,
  boxImg2,
  boxImg3,
  boxImg4,
  boxImg5,
  boxImg6,
  boxImg7,
  boxImg8,
  boxImg9,
];

const NotRobot = ({ handleEnter, closePop }) => {
  const itemCount = 9;

  const [checks, setChecks] = useState(
    Array.from({ length: itemCount }, (_, i) => false)
  );

  const handleChange = (index) => (e) => {
    const updated = [...checks];
    updated[index] = e.target.checked;
    setChecks(updated);
  };

  const allChecked = checks.every(Boolean);

  const handleButtonClick = () => {
    handleEnter();
  };

  return (
    <div
      className={classNames(styles.notRobotPopup, closePop && styles.fadeOut)}
    >
      <div className={styles.notRobotContainer}>
        <div className={styles.notRobot}>
          <div className={styles.topArea}>
            <div className={styles.desc}>SELECT ALL SQUARERS WITH</div>
            <div className={styles.descTitle}>NAGUMO YOICHI</div>
            <div className={styles.desc}>
              IF THEY'RE ALL CORRECT, CLICK ENTER
            </div>
          </div>
          <div className={styles.checkBoxArea}>
            {boxImgs.map((img, index) => (
              <label key={index} className={styles.checkBox}>
                <input
                  type="checkbox"
                  checked={checks[index]}
                  onChange={handleChange(index)}
                />
                <img src={img} alt={`img-${index + 1}`} />
              </label>
            ))}
          </div>
          <div className={styles.buttonArea}>
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={!allChecked}
              className={styles.buttonEnter}
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotRobot;
