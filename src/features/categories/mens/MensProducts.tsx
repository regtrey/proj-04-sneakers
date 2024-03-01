import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Product from '../../../ui/Product';
import { useShoes } from '../../useShoes';

const StyledMensProducts = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

function MensProducts() {
  const { isLoading, shoes, error } = useShoes();

  return (
    <StyledMensProducts>
      {isLoading
        ? 'Loading...'
        : shoes
        ? shoes.map((shoes) => (
            <Link key={shoes.id} to={`/mens/${shoes.slug}`}>
              <Product product={shoes} />
            </Link>
          ))
        : `${error}`}
    </StyledMensProducts>
  );
}

export default MensProducts;
