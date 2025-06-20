import styles from "./Parallax.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { ParallaxImages } from "./ParallaxImages";

const Parallax = ({ setIsParallax }) => {
  const [typedTexts, setTypedTexts] = useState({});
  const containerRef = useRef(null);
  const smallImgRefs = useRef({});
  const [activeBigImgSection, setActiveBigImgSection] = useState(null);
  const [visibleSmTextSections, setVisibleSmTextSections] = useState([]);

  const prevScrollY = useRef(0);

  // section도달시 bigImg fadein
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > prevScrollY.current;
      prevScrollY.current = currentScrollY;

      sections.forEach((section) => {
        const id = section.getAttribute("data-id");
        if (!id) return;

        // sec01은 smallImg02 기준
        if (id === "sec01") {
          const el = smallImgRefs.current["sec01-1"]; // smallImg02 (0부터 시작)
          if (!el) return;
          const rect = el.getBoundingClientRect();

          if (rect.top <= 50 && rect.bottom > 0) {
            setActiveBigImgSection(id);
          }
        } else {
          const secRect = section.getBoundingClientRect();
          if (scrollingDown && secRect.top <= 1 && secRect.bottom > 1) {
            setActiveBigImgSection(id);
          }
          if (
            !scrollingDown &&
            secRect.bottom >= window.innerHeight - 1 &&
            secRect.top < window.innerHeight
          ) {
            setActiveBigImgSection(id);
          }
        }
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

  // 배경색 변경
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 1.3;
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

  // lgText 타이핑 + smText section 위치 체크
  useEffect(() => {
    const targets = document.querySelectorAll("[data-text-type='lg']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          const type = entry.target.getAttribute("data-text-type");
          if (!id || type !== "lg") return;

          const key = `${id}-lg`;
          const text = ParallaxImages[id]?.lgText || "";

          if (entry.intersectionRatio >= 0.8 && !typedTexts[key]) {
            entry.target.classList.add(styles.visible);

            let currentText = "";
            text.split("").forEach((char, i) => {
              setTimeout(() => {
                currentText += char;
                setTypedTexts((prev) => ({ ...prev, [key]: currentText }));
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.8 }
    );
    targets.forEach((el) => observer.observe(el));

    // smText 나타날 section 추적
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      const visibleSections = [];

      sections.forEach((section) => {
        const id = section.getAttribute("data-id");
        const rect = section.getBoundingClientRect();

        if (rect.top <= 1 && rect.bottom > 1) {
          visibleSections.push(id);
        }
      });
      setVisibleSmTextSections(visibleSections);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [typedTexts]);

  // smallImg 패럴럭스 효과
  useEffect(() => {
    const handleScroll = () => {
      Object.entries(smallImgRefs.current).forEach(([, el]) => {
        if (!el) return;
        const speed = Number(el.dataset.speed) || 0.1;
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
      <div className={styles.stickyAbsolContainer}>
        <div className={styles.stickyWrap}>
          {Object.entries(ParallaxImages).map(([key, item]) =>
            item.big.map((img, i) => (
              <img
                key={`sticky-big-${key}-${i}`}
                src={img}
                className={classNames(
                  styles.bigImg,
                  styles[`${key}BigImg`],
                  activeBigImgSection === key && styles.visible
                )}
              />
            ))
          )}
        </div>
      </div>

      {Object.entries(ParallaxImages).map(([key, item], index) => (
        <section
          data-id={key}
          className={classNames(styles[`section0${index + 1}`])}
          key={key}
        >
          {item.small.map((smallItem, i) => (
            <div
              className={classNames(styles.smallImg, styles[`small0${i + 1}`])}
              key={`small-${i}`}
              ref={(el) => {
                if (el) smallImgRefs.current[`${key}-${i}`] = el;
              }}
              data-speed={(i + 1) * 0.1}
            >
              <img src={smallItem} alt="small img" />
            </div>
          ))}
          <p data-text-type="lg" data-id={key} className={styles.dialogLgText}>
            {typedTexts[`${key}-lg`] || ""}
          </p>
          <p
            className={classNames(
              styles.dialogSmText,
              visibleSmTextSections.includes(key) && styles.visible
            )}
          >
            {ParallaxImages[key].smText}
          </p>
        </section>
      ))}
    </div>
  );
};

export default Parallax;
