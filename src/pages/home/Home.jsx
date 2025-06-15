import Container from "@components/common/Container";
import HomeMain from "@components/home/main/HomeMain";
import useIsMobile from "@utils/useIsMobile";
import Parallax from "../../components/home/parallax/Parallax";

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <Container isHome={true}>
      <HomeMain mobile={isMobile} />
      <Parallax />
    </Container>
  );
};

export default Home;
