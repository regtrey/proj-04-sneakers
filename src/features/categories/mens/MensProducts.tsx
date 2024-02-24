import styled from 'styled-components';

import Product from '../../../ui/Product';
import { productData } from '../../../data/products';
import { MensProduct } from './Interface';

const StyledMensProducts = styled.div`
  height: max-content;
  /* background-color: aquamarine; */

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const products: MensProduct[] = productData;

function MensProducts() {
  return (
    <StyledMensProducts>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </StyledMensProducts>
  );
}

export default MensProducts;
