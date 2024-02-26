import styled from 'styled-components';

const StyledHome = styled.div`
  width: 100vw;
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto;
`;

function Home() {
  return (
    <StyledHome>
      <HeroImage src="/nike-hero.jpeg" alt="Nike x NewJeans hero image" />
    </StyledHome>
  );
}

export default Home;
