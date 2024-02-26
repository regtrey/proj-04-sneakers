import styled from 'styled-components';

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
        ? shoes.map((shoes) => <Product key={shoes.id} product={shoes} />)
        : `${error}`}
    </StyledMensProducts>
  );
}

export default MensProducts;
