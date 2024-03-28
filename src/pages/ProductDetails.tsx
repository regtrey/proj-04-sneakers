import styled from 'styled-components';
import Details from '../features/product/Details';

const StyledProductDetails = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 2rem 0;
    padding-bottom: 4rem;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

function ProductDetails() {
  return (
    <StyledProductDetails>
      <Details />
    </StyledProductDetails>
  );
}

export default ProductDetails;
