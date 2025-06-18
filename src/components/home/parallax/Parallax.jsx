import styles from "./Parallax.module.scss";
import sec01_big from "@img/home/parallax/parallax_section01_big.png";
import sec01_1 from "@img/home/parallax/parallax_section01_1.png";
import sec01_2 from "@img/home/parallax/parallax_section01_2.png";
import sec01_3 from "@img/home/parallax/parallax_section01_3.png";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

const sectionImg = {
  sec01: {
    big: [sec01_big],
    small: [sec01_1, sec01_2, sec01_3],
    text: "どれで逝きたい？",
  },
  sec02: {
    big: [sec01_big],
    small: [sec01_1, sec01_2, sec01_3],
    text: "どれで逝きたい？",
  },
};

const Parallax = () => {
  const [visibleBigImgs, setVisibleBigImgs] = useState({});
  const [typedTexts, setTypedTexts] = useState({});
  const containerRef = useRef(null);

  // 배경색 변경
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const isIntersecting =
        rect.top < viewportCenter && rect.bottom > viewportCenter;
      document.body.style.backgroundColor = isIntersecting ? "#000" : "";
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.body.style.backgroundColor = "";
    };
  }, []);

  // bigImg fadeIn
  useEffect(() => {
    const handleScroll = () => {
      const imgEls = document.querySelectorAll("[data-bigimg]");
      const newVisible = {};

      imgEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const id = el.getAttribute("data-id");

        // 조건: 요소의 상단이 화면 위에서 80% 이내에 들어오면
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0 && id) {
          newVisible[id] = true;
        }
      });

      setVisibleBigImgs((prev) => ({ ...prev, ...newVisible }));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // text
  useEffect(() => {
    const targets = document.querySelectorAll("[data-text]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.intersectionRatio >= 0.8 && id && !typedTexts[id]) {
            const fullText = sectionImg[id].text;
            let currentText = "";
            fullText.split("").forEach((char, i) => {
              setTimeout(() => {
                currentText += char;
                setTypedTexts((prev) => ({ ...prev, [id]: currentText }));
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.8 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [typedTexts]);

  return (
    <div ref={containerRef} className={styles.parallaxContainer}>
      {Object.entries(sectionImg).map(([key, item], index) => {
        const typedText = typedTexts[key] || "";

        return (
          <section
            data-id={key}
            className={classNames(styles[`section0${index + 1}`])}
            key={key}
          >
            <div className={styles.bigWrap}>
              {item.big.map((bigItem, i) => (
                <img
                  data-bigimg
                  data-id={key}
                  src={bigItem}
                  className={classNames(
                    styles.bigImg,
                    visibleBigImgs[key] && styles.fadeIn
                  )}
                  key={`big-${i}`}
                />
              ))}
            </div>

            {item.small.map((smallItem, i) => (
              <img
                src={smallItem}
                className={classNames(
                  styles.smallImg,
                  styles[`small0${i + 1}`]
                )}
                key={`small-${i}`}
                alt="small img"
              />
            ))}

            <p data-text data-id={key}>
              {typedText}
            </p>
          </section>
        );
      })}
    </div>
  );
};

export default Parallax;
