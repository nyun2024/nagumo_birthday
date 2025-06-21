import { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./Dice.module.scss";
import classNames from "classnames";
import useIsMobile from "@utils/useIsMobile";

const getRandomRotation = () => {
  const rotations = [
    { x: 0,   y: 0,   value: 1 },
    { x: -90, y: 0,   value: 2 },
    { x: 0,   y: 90,  value: 3 },
    { x: 0,   y: -90, value: 4 },
    { x: 90,  y: 0,   value: 5 },
    { x: 180, y: 0,   value: 6 },
  ];
  const choice = rotations[Math.floor(Math.random() * rotations.length)];
  return choice;
};

const Dice = forwardRef((_, ref) =>  {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  
  const rollDice = () => {
    const { x, y } = getRandomRotation();
    const randX = x + 360 * (Math.floor(Math.random() * 4) + 1);
    const randY = y + 360 * (Math.floor(Math.random() * 4) + 1);
    setRotation({ x: randX, y: randY });
  };

  useImperativeHandle(ref, () => ({
    roll: rollDice,
  }));

  return (
    <div className={classNames(styles.diceWrap, !isMobile && styles.pcDice)}>
      <div
        className={styles.dice}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className={classNames(styles.face, styles.one)}>
          <div className={styles.dotCenter}></div>
        </div>
        <div className={classNames(styles.face, styles.two)}>
          <div className={styles.dotTopLeft}></div>
          <div className={styles.dotBottomRight}></div>
        </div>
        <div className={classNames(styles.face, styles.three)}>
          <div className={styles.dotTopLeft}></div>
          <div className={styles.dotCenter}></div>
          <div className={styles.dotBottomRight}></div>
        </div>
        <div className={classNames(styles.face, styles.four)}>
          <div className={styles.dotTopLeft}></div>
          <div className={styles.dotTopRight}></div>
          <div className={styles.dotBottomLeft}></div>
          <div className={styles.dotBottomRight}></div>
        </div>
        <div className={classNames(styles.face, styles.five)}>
          <div className={styles.dotTopLeft}></div>
          <div className={styles.dotTopRight}></div>
          <div className={styles.dotCenter}></div>
          <div className={styles.dotBottomLeft}></div>
          <div className={styles.dotBottomRight}></div>
        </div>
        <div className={classNames(styles.face, styles.six)}>
          <div className={styles.dotTopLeft}></div>
          <div className={styles.dotTopRight}></div>
          <div className={styles.dotMiddleLeft}></div>
          <div className={styles.dotMiddleRight}></div>
          <div className={styles.dotBottomLeft}></div>
          <div className={styles.dotBottomRight}></div>
        </div>
      </div>
    </div>
  );
});

export default Dice;