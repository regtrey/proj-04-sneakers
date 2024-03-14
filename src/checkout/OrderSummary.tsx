import styled from 'styled-components';
import Summary from '../features/cart/Summary';

const StyledOrderSummary = styled.div`
  height: 40rem;
  width: 35rem;
  /* background-color: orange; */
`;

function OrderSummary() {
  return (
    <StyledOrderSummary>
      <Summary isCheckingout={true} />
    </StyledOrderSummary>
  );
}

export default OrderSummary;
