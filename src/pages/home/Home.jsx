import Container from "@components/common/Container";
import HomeMain from "@components/home/main/HomeMain";
import useIsMobile from "@utils/useIsMobile";
import Parallax from "../../components/home/parallax/Parallax";
import { useState } from "react";

const Home = () => {
  const isMobile = useIsMobile();
  const [isParallax, setIsParallax] = useState(false);

  return (
    <Container isHome={true} isParallax={isParallax}>
      <HomeMain mobile={isMobile} />
      <Parallax setIsParallax={setIsParallax} />
    </Container>
  );
};

export default Home;
