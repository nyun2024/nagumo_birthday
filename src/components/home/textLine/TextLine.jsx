import { useEffect, useRef } from "react";
import styles from './TextLine.module.scss'
import classNames from "classnames";

const TextLine = ({ isParallax }) => {
  const circleRef = useRef(null)
  const waveRef = useRef(null)

  useEffect(() => {
    if (isParallax) {
      circleRef.current?.classList.add(styles.animateLine)
      waveRef.current?.classList.add(styles.animateLine)
    }
  }, [isParallax])

  return (
    <div className={styles.textLineWrap}>
      <div className={styles.textInner}>
          <p className={classNames(styles.text, isParallax && styles.changeColor)}>
            殺しに正義も<br />悪もないよ
          </p>
          <div className={styles.circleLine}>
            <svg width="119" height="53" viewBox="0 0 119 53" fill="none">
              <path 
                ref={circleRef}
                d="M67.5 45.9814C49.3333 51.6481 10.0765 57.5 1.99999 34.4817C0.0765919 29 11 11.9817 54 3.48172C97 -5.01828 114.5 10.4817 117.5 17.4817C120.5 24.4817 110.5 37.4814 56.5 51.4814" 
                stroke="#FF0000" 
                stroke-width="2" 
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div className={styles.waveLine}>
            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="20" viewBox="0 0 230 20" fill="none">
              <path 
                ref={waveRef}
                d="M1 18.5004C15.3333 12.6671 45 2.3004 49 7.5004C51 15.0004 51 16.5004 56 16.5004C60 16.5004 90.6667 9.50041 105.5 6.00041C107.667 5.50041 112.3 5.50041 113.5 9.50041C114.7 13.5004 124.333 11.1671 129 9.50041C132.5 8.16707 140 5.90039 142 7.5004C146.5 9.00086 149 11.5013 153 10.5009C158 9.50042 182 4.50086 184 5.00086C186 5.50086 192 5.50173 194 5.00086C195.6 4.60017 217.667 2.16667 228.5 1" 
                stroke="#FF0000" 
                stroke-width="2" 
                stroke-linecap="round"
              />
            </svg>
          </div>
      </div>
    </div>
  )
}

export default TextLine