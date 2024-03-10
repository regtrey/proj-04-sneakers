import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Products from '../ui/Products';

const StyledCatalog = styled.div`
  padding: 6rem 4rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  letter-spacing: -2px;
  margin-bottom: 2rem;

  & span {
    text-transform: capitalize;
  }
`;

const Layout = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 4rem;
`;

const Refinements = styled.aside`
  background-color: green;

  grid-column: 1 / 2;
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

      <Layout>
        <Refinements>REFINEMENTS</Refinements>
        <Products currentPath={currentPath} />
      </Layout>
    </StyledCatalog>
  );
}

export default Catalog;
