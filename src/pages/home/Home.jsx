import { useState, useEffect, useRef } from "react";
import Container from "@components/common/Container";
import HomeMain from "@components/home/main/HomeMain";
import useIsMobile from "@utils/useIsMobile";
import NagumoTMI from "@components/home/nagumoTMI/NagumoTMI";
import Navigation from "@components/common/Navigation";
import ParallaxSlide from "@components/home/parallaxSlide/ParallaxSlide";
import TextLine from "@components/home/textLine/TextLine";

const Home = () => {
  const isMobile = useIsMobile();
  const [isParallax, setIsParallax] = useState(false);
  const containerRef = useRef(null);

  // 배경색 전환
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const isIntersecting =
        rect.top < viewportCenter && rect.bottom > viewportCenter;
      if (isIntersecting) {
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
  }, [setIsParallax]);

  return (
    <Container isHome={true} isParallax={isParallax}>
      <HomeMain mobile={isMobile} />
      <div ref={containerRef}>
        <TextLine isParallax={isParallax} />
        <ParallaxSlide />
        <NagumoTMI />
        <Navigation />
      </div>
    </Container>
  );
};

export default Home;
