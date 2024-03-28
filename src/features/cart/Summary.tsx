import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../auth/useUser';
import { useCart } from './useCart';

import { Heading } from '../../ui/Heading';
import { Button } from '../../ui/Button';
import { ItemPrice } from './CartItem';
import CheckoutItemsContainer from '../checkout/CheckoutItemsContainer';
import formatCurrency from '../../utils/formatCurrency';

const StyledSummary = styled.div`
  height: max-content;
  width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

function Summary({ isCheckingout = false }: { isCheckingout?: boolean }) {
  const navigate = useNavigate();
  const { userId } = useUser();
  const { cartItems } = useCart(userId);

  const subTotal = cartItems?.reduce((acc, cur) => acc + cur.total, 0);
  const totalPrice = subTotal + MISC_FEE;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <StyledSummary>
      <Heading>Summary</Heading>
      <SubTotal>
        Subtotal{' '}
        <ItemPrice>
          {formatCurrency(cartItems?.length ? subTotal : 0)}
        </ItemPrice>
      </SubTotal>
      <SubTotal>
        Estimated Delivery & Handling{' '}
        <ItemPrice>
          {formatCurrency(cartItems?.length ? MISC_FEE : 0)}
        </ItemPrice>
      </SubTotal>

      <Total>
        Total{' '}
        <ItemPrice>
          {formatCurrency(cartItems?.length ? totalPrice : 0)}
        </ItemPrice>
      </Total>

      {isCheckingout && cartItems && (
        <CheckoutItemsContainer items={cartItems} />
      )}
      {!isCheckingout && cartItems && cartItems?.length > 0 && (
        <Button $variant="primary" $size="lg" onClick={handleCheckout}>
          Checkout
        </Button>
      )}
    </StyledSummary>
  );
}

export default Summary;
