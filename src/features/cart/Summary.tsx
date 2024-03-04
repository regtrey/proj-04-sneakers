import styled from 'styled-components';
import { useAppSelector } from '../../store';

import { ItemPrice } from './CartItem';
import { Button } from '../../ui/Button';

const StyledSummary = styled.div`
  height: max-content;
  width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 500;
`;

const SubTotal = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

const Total = styled.div`
  border-top: 1px solid var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-100);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.8rem 0;
  display: flex;
  justify-content: space-between;
`;

const MISC_FEE = 5;

function Summary() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const subTotal = cartItems.reduce((acc, cur) => acc + cur.total, 0);
  const totalPrice = subTotal + MISC_FEE;

  const handleCheckout = () => {};

  return (
    <StyledSummary>
      <Heading>Summary</Heading>
      <SubTotal>
        Subtotal <ItemPrice>${cartItems.length ? subTotal : 0}</ItemPrice>
      </SubTotal>
      <SubTotal>
        Estimated Delivery & Handling{' '}
        <ItemPrice>${cartItems.length ? MISC_FEE : 0}</ItemPrice>
      </SubTotal>

      <Total>
        Total <ItemPrice>${cartItems.length ? totalPrice : 0}</ItemPrice>
      </Total>

      <Button $variant="primary" $size="lg" onClick={handleCheckout}>
        Checkout
      </Button>
    </StyledSummary>
  );
}

export default Summary;
