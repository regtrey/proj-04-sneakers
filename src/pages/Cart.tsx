import styled from 'styled-components';

import CartBag from '../features/cart/CartBag';
import Summary from '../features/cart/Summary';

const StyledCart = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 6rem;

  @media screen and (max-width: 768px) {
    padding: 2rem;
    padding-bottom: 4rem;
    flex-direction: column;
    gap: 2rem;
  }
`;

function Cart() {
  return (
    <StyledCart>
      <CartBag />
      <Summary />
    </StyledCart>
  );
}

export default Cart;
