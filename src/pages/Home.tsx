import styled from 'styled-components';

const HeroImage = styled.img`
  display: block;
  margin: 0 auto;
`;

const StyledHome = styled.div``;

function Home() {
  return (
    <StyledHome>
      <HeroImage src="/nike-hero.jpeg" alt="Nike x NewJeans hero image" />
    </StyledHome>
  );
}

export default Home;
