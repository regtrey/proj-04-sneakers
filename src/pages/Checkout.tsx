import styled from 'styled-components';

import ContactInfo from '../features/checkout/ContactInfo';
import OrderSummary from '../features/checkout/OrderSummary';

const StyledCheckout = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 6rem;

  @media screen and (min-width: 768px) and (max-width: 850px) {
    padding: 3rem;
    flex-direction: column;
    gap: 2rem;
  }

  @media screen and (max-width: 767px) {
    padding: 2rem;
    flex-direction: column;
    gap: 2rem;
  }
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
