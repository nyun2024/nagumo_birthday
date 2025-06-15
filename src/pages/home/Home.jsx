import Container from "@components/common/Container";
import HomeMain from "@components/home/main/HomeMain";
import useIsMobile from "@utils/useIsMobile";

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <Container isHome={true}>
      <HomeMain mobile={isMobile} />
    </Container>
  );
};

export default Home;
