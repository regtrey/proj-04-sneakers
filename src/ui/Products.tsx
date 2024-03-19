import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useShoes } from '../features/useShoes';
import Product from './Product';
import Spinner from './Spinner';

const StyledProducts = styled.div`
  height: max-content;
  min-height: 100dvh;
  max-height: max-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

function Products({
  currentPath,
  searchQuery,
}: {
  currentPath: string;
  searchQuery?: string;
}) {
  const { isLoading, shoes, error } = useShoes(currentPath, searchQuery);

  return (
    <StyledProducts>
      {isLoading ? (
        <Spinner $custom="grid-column: 1 / -1;" />
      ) : shoes ? (
        shoes.map((shoes) => (
          <Link key={shoes.shoe_id} to={`/${shoes.categorySlug}/${shoes.slug}`}>
            <Product product={shoes} />
          </Link>
        ))
      ) : (
        `${error}`
      )}
    </StyledProducts>
  );
}

export default Products;
