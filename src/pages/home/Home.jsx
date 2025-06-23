import { useState, useEffect, useRef } from "react";
import Container from "@components/common/Container";
import HomeMain from "@components/home/main/HomeMain";
import useIsMobile from "@utils/useIsMobile";
import NagumoTMI from "@components/home/nagumoTMI/NagumoTMI";
import Navigation from "@components/common/Navigation";
import ParallaxSlide from "@components/home/parallaxSlide/ParallaxSlide";
import TextLine from "@components/home/textLine/TextLine";
import Loading from "@pages/Loading/Loading";
import useDarkMode from "@utils/useDarkMode";
import classNames from "classnames";
import styles from "./Home.module.scss";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isParallax, setIsParallax] = useState(false);

  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const videoRef = useRef(null);
  const isDark = useDarkMode();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (isVideoLoaded && isMinTimePassed) {
      setIsLoading(false);
      if (video) {
        video.play().catch((err) => {
          console.warn("비디오 재생 실패", err);
        });
      }
    }
  }, [isVideoLoaded, isMinTimePassed]);

  // WebCam 이미지 초기화
  useEffect(() => {
    localStorage.removeItem("filteredImages");
    localStorage.setItem("saveEdit", false);
  }, []);

  // 배경색 전환
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const isIntersecting =
        rect.top < viewportCenter && rect.bottom > viewportCenter;

      if (isIntersecting && !isNavVisible) {
        document.querySelector("html").classList.add("parallax");
        setIsParallax(true);
      } else {
        document.querySelector("html").classList.remove("parallax");
        setIsParallax(false);
      }
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
  }, [isNavVisible]);

  // 네비게이션 보임 여부 관찰
  useEffect(() => {
    if (!navRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(navRef.current);

    return () => {
      if (navRef.current) observer.unobserve(navRef.current);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Container isHome={true} isParallax={isParallax}>
        <HomeMain mobile={isMobile} videoRef={videoRef} />
        <div ref={containerRef}>
          <TextLine isParallax={isParallax} />
          <ParallaxSlide />
          <div className={classNames(styles.bottomArea, isDark && styles.dark)}>
            <NagumoTMI />
            <div ref={navRef} className={styles.navWrap}>
              <Navigation />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
