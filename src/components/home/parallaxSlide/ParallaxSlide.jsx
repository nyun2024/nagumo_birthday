import { useEffect, useRef, useState } from "react";
import { SlideImages } from "./ParallaxImages";
import classNames from "classnames";
import styles from "./ParallaxSlide.module.scss";
import useIsMobile from "@utils/useIsMobile";

const ParallaxSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const smallImgRefs = useRef({});
  const slideKeys = Object.keys(SlideImages);
  const totalSlides = slideKeys.length;
  const keys = Object.keys(SlideImages);
  const isMobile = useIsMobile();

  // 슬라이드 넘어갈때 text 타이핑 효과
  useEffect(() => {
    const fullText = isMobile
      ? SlideImages[slideKeys[currentIndex]].text
      : SlideImages[slideKeys[currentIndex]].pcText;
    setTypedText("");

    const intervalRef = { id: null };

    const timeoutId = setTimeout(() => {
      let current = 0;
      intervalRef.id = setInterval(() => {
        const nextChar = fullText?.[current];
        if (nextChar !== undefined) {
          setTypedText((prev) => prev + nextChar);
          current++;
        } else {
          clearInterval(intervalRef.id);
        }
      }, 70);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalRef.id); // ✅ 이전 타이핑 중단
    };
  }, [currentIndex]);

  // 슬라이드 prev, next
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + keys.length) % keys.length);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % keys.length);
  };

  // smallImg 패럴럭스 효과
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      Object.entries(smallImgRefs.current).forEach(([, el]) => {
        if (!el) return;
        const speed = Number(el.dataset.speed) || 0.1;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const movement = (scrollTop - elementTop) * speed;
        const maxMove = 70;
        const clamped = Math.max(Math.min(movement, maxMove), -maxMove);
        el.style.transform = `translateY(${clamped}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.parallaxSlideWrapper,
        !isMobile && styles.pc
      )}
    >
      {Object.entries(SlideImages).map(([key, item], index) => (
        <div
          className={classNames(
            styles.slideItem,
            styles[`${key}SlideItem`],
            index === currentIndex && styles.activeSlide
          )}
          key={`slide-${index}`}
        >
          <img
            key={`big-${key}-${index}`}
            src={item.big}
            className={classNames(
              styles.bigImg,
              styles[`${key}BigImg`],
              index === currentIndex && styles.fadeIn
            )}
          />
          {item.small.map((smallItem, i) => (
            <div
              className={classNames(styles.smallImg, styles[`small0${i + 1}`])}
              key={`small-${i}`}
              ref={(el) => {
                if (el) smallImgRefs.current[`${key}-${i}`] = el;
              }}
              data-speed={(i + 1) * 0.05}
            >
              <img src={smallItem} alt="small img" />
            </div>
          ))}
          <p className={styles.typingText}>
            {typedText.split("").map((char, i) => (
              <span
                key={i}
                className={styles.typingChar}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>
      ))}
      <div
        className={classNames(
          styles.slidePagination,
          currentIndex === 1 && styles.sec02Page
        )}
      >
        <button type="button" className={styles.prevBtn} onClick={handlePrev}>
          <span className="blind">prev button</span>
        </button>
        <div className={styles.pageNum}>
          {currentIndex + 1} / {totalSlides}
        </div>
        <button type="button" className={styles.nextBtn} onClick={handleNext}>
          <span className="blind">next button</span>
        </button>
      </div>
    </div>
  );
};

export default ParallaxSlide;
