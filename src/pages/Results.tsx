import styled from 'styled-components';
import { useLocation, useSearchParams } from 'react-router-dom';

import Products from '../ui/Products';

const StyledResults = styled.div`
  padding: 6rem 10rem;
  padding-bottom: 4rem;
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

function Results() {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <StyledResults>
      <Heading>{query ? `Search results for '${query}'` : 'All shoes'}</Heading>
      <Products currentPath={currentPath} searchQuery={query} />
    </StyledResults>
  );
}

export default Results;
