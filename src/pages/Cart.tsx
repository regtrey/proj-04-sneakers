import styled from 'styled-components';

import CartBag from '../features/cart/CartBag';
import Summary from '../features/cart/Summary';

const StyledCart = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 6rem;

  @media screen and (min-width: 768px) and (max-width: 850px) {
    padding: 2rem 0 4rem;
    /* padding-bottom: 4rem; */
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  @media screen and (max-width: 767px) {
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
