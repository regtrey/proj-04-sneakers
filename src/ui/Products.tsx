import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useShoes } from '../features/useShoes';
import Product from './Product';

const StyledProducts = styled.div`
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products({ currentPath }: { currentPath: string }) {
  const { isLoading, shoes, error } = useShoes(currentPath);

  return (
    <StyledProducts>
      {isLoading
        ? 'Loading...'
        : shoes
        ? shoes.map((shoes) => (
            <Link
              key={shoes.shoe_id}
              to={`/${shoes.categorySlug}/${shoes.slug}`}
            >
              <Product product={shoes} />
            </Link>
          ))
        : `${error}`}
    </StyledProducts>
  );
}

export default Products;
