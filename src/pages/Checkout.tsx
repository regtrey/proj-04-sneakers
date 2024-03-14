import styled from 'styled-components';

import ContactInfo from '../features/checkout/ContactInfo';
import OrderSummary from '../features/checkout/OrderSummary';

const StyledCheckout = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 6rem;
`;

function Checkout() {
  return (
    <StyledCheckout>
      <ContactInfo />
      <OrderSummary />
    </StyledCheckout>
  );
}

export default Checkout;
