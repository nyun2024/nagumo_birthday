import Container from "@components/common/Container";
import HomeMain from "@components/home/main/HomeMain";
import useIsMobile from "@utils/useIsMobile";
import Parallax from "../../components/home/parallax/Parallax";
import { useState } from "react";
import NagumoTMI from "@components/home/nagumoTMI/NagumoTMI";
import Navigation from "@components/common/Navigation";

const Home = () => {
  const isMobile = useIsMobile();
  // const [isParallax, setIsParallax] = useState(false);

  return (
    <Container isHome={true}>
      <HomeMain mobile={isMobile} />
      {/* <Parallax setIsParallax={setIsParallax} /> */}
      <NagumoTMI />
      <Navigation />
    </Container>
  );
};

export default Home;
