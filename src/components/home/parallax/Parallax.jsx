import styles from "./Parallax.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { ParallaxImages } from "./ParallaxImages";

const Parallax = ({ setIsParallax }) => {
  const [visibleBigImgs, setVisibleBigImgs] = useState({});
  const [typedTexts, setTypedTexts] = useState({});
  const containerRef = useRef(null);
  const smallImgRefs = useRef({});

  // 배경색 변경
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 1.2;
      const isIntersecting =
        rect.top < viewportCenter && rect.bottom > viewportCenter;
      isIntersecting
        ? document.querySelector("html").classList.add("parallax")
        : document.querySelector("html").classList.remove("parallax");
      isIntersecting ? setIsParallax(true) : setIsParallax(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.querySelector("html").classList.remove("parallax");
      setIsParallax(false);
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

        // 조건: 요소의 상단이 화면 위에서 50% 이내에 들어오면
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0 && id) {
          newVisible[id] = true;
        }
      });

      setVisibleBigImgs((prev) => ({ ...prev, ...newVisible }));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // text
  useEffect(() => {
    const targets = document.querySelectorAll("[data-text-type]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          const type = entry.target.getAttribute("data-text-type");
          if (!id || !type) return;

          const key = `${id}-${type}`;
          const text = ParallaxImages[id][`${type}Text`];

          if (entry.intersectionRatio >= 0.8 && !typedTexts[key]) {
            entry.target.classList.add(styles.visible);
            let currentText = "";

            text.split("").forEach((char, i) => {
              setTimeout(() => {
                currentText += char;
                setTypedTexts((prev) => ({ ...prev, [key]: currentText }));
              }, i * 110);
            });
          }
        });
      },
      { threshold: 0.8 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [typedTexts]);

  // smallImg 스크롤 이질감
  useEffect(() => {
    const handleScroll = () => {
      Object.entries(smallImgRefs.current).forEach(([, el]) => {
        if (!el) return;

        const speed = Number(el.dataset.speed) || 0.03;
        const offsetTop =
          el.closest("section")?.getBoundingClientRect().top || 0;

        const movement = offsetTop * speed;

        el.style.transform = `translateY(${movement}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.parallaxContainer}>
      {Object.entries(ParallaxImages).map(([key, item], index) => {
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
                ref={(el) => {
                  if (el) smallImgRefs.current[`${key}-${i}`] = el;
                }}
                data-speed={(i + 1) * 0.02} // 각각 다른 속도
              />
            ))}
            <p
              data-text-type="lg"
              data-id={key}
              className={styles.dialogLgText}
            >
              {typedTexts[`${key}-lg`] || ""}
            </p>

            <p
              data-text-type="sm"
              data-id={key}
              className={styles.dialogSmText}
            >
              {typedTexts[`${key}-sm`] || ""}
            </p>
          </section>
        );
      })}
    </div>
  );
};

export default Parallax;
