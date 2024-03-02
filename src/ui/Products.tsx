import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import Product from './Product';
import { useShoes } from '../features/useShoes';

const StyledProducts = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

function Products() {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');

  const { isLoading, shoes, error } = useShoes(currentPath);

  return (
    <StyledProducts>
      {isLoading
        ? 'Loading...'
        : shoes
        ? shoes.map((shoes) => (
            <Link key={shoes.id} to={`/${shoes.categorySlug}/${shoes.slug}`}>
              <Product product={shoes} />
            </Link>
          ))
        : `${error}`}
    </StyledProducts>
  );
}

export default Products;
