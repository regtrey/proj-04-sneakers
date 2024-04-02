import styled from 'styled-components';
import Products from '../ui/Products';

const StyledResults = styled.div`
  padding: 6rem 10rem;
  padding-bottom: 4rem;

  @media screen and (max-width: 850px) {
    padding: 2rem 0;
    padding-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function Results() {
  return (
    <StyledResults>
      <Products />
    </StyledResults>
  );
}

export default Results;
