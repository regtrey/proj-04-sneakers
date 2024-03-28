import styled from 'styled-components';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { useShoes } from '../features/useShoes';

import { Heading } from './Heading';
import Product from './Product';
import Spinner from './Spinner';

const StyledProducts = styled.div`
  height: max-content;
  min-height: 100dvh;
  max-height: max-content;
  display: grid;
  grid-template-columns: repeat(3, 36rem);
  justify-content: space-between;
  gap: 4rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content 1fr;
    gap: 2rem;
  }
`;

const Empty = styled.div`
  height: 40rem;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;

  grid-column: 1 / -1;
`;

function Products() {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');
  const category =
    currentPath === 'mens' || currentPath === 'womens'
      ? currentPath.split('s').join("'s")
      : currentPath === 'kids'
      ? currentPath.substring(0, -1) + currentPath.substring(-1) + "'"
      : currentPath;

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const { isLoading, shoes, error } = useShoes(currentPath, searchQuery);

  return (
    <StyledProducts>
      <Heading>
        {!searchQuery ? (
          currentPath === 'new-and-featured' ? (
            <span>all</span>
          ) : (
            <span>{category}</span>
          )
        ) : searchQuery ? (
          `Search results for '${searchQuery}'`
        ) : (
          'All shoes'
        )}{' '}
        {!searchQuery && 'shoes'}
      </Heading>

      {searchQuery && shoes?.length === 0 && (
        <Empty>No search results found for '{searchQuery}'</Empty>
      )}
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
