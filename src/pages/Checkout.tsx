import styled from 'styled-components';
import ContactInfo from '../checkout/ContactInfo';

const StyledCheckout = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 6rem;
`;

const OrderSummary = styled.div`
  height: 40rem;
  width: 35rem;
  background-color: orange;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

function Checkout() {
  return (
    <StyledCheckout>
      <ContactInfo />
      <OrderSummary>
        <Heading>Order summary</Heading>
      </OrderSummary>
    </StyledCheckout>
  );
}

export default Checkout;
