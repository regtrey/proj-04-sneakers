import styled from 'styled-components';
import CartBag from '../features/cart/CartBag';
import Summary from '../features/cart/Summary';

const StyledCart = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 6rem;
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
