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
  const [bgDark, setBgDark] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setBgDark(entry.intersectionRatio > 0.5); //50%
      },
      { threshold: [0, 0.5, 1] }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionEls = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 1 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames(styles.parallaxContainer, bgDark && styles.bgDark)}
    >
      {Object.entries(sectionImg).map(([key, item], index) => {
        const isVisible = visibleSections.includes(key);
        return (
          <section
            data-id={key}
            className={classNames(styles[`section0${index + 1}`])}
            key={key}
          >
            <div
              className={classNames(styles.bigWrap, isVisible && styles.fadeIn)}
            >
              {item.big.map((bigItem, i) => (
                <img src={bigItem} className={styles.bigImg} key={`big-${i}`} />
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
            <p>{item.text}</p>
          </section>
        );
      })}
    </div>
  );
};

export default Parallax;
