import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Products from '../ui/Products';

const StyledCatalog = styled.div`
  padding: 6rem 8rem;
  padding-bottom: 4rem;

  @media screen and (max-width: 768px) {
    padding: 2rem 3rem 4rem;
  }

  @media screen and (max-width: 410px) {
    padding: 2rem 1rem 4rem;
  }
`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  letter-spacing: -2px;
  margin-bottom: 2rem;

  & span {
    text-transform: capitalize;
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
`;

function Catalog() {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');
  const category =
    currentPath === 'mens' || currentPath === 'womens'
      ? currentPath.split('s').join("'s")
      : currentPath === 'kids'
      ? currentPath.substring(0, -1) + currentPath.substring(-1) + "'"
      : currentPath;

  return (
    <StyledCatalog>
      <Heading>
        <span>{currentPath === 'new-and-featured' ? 'all' : category}</span>{' '}
        shoes
      </Heading>
      <Products currentPath={currentPath} />
    </StyledCatalog>
  );
}

export default Catalog;
