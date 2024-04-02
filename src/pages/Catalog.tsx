import styled from 'styled-components';
import Products from '../features/product/Products';

const StyledCatalog = styled.div`
  padding: 6rem 0;
  padding-bottom: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 2rem 0;
    padding-bottom: 6rem;
  }
`;

function Catalog() {
  return (
    <StyledCatalog>
      <Products />
    </StyledCatalog>
  );
}

export default Catalog;
