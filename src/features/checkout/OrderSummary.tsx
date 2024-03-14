import styled from 'styled-components';
import Summary from '../cart/Summary';

const StyledOrderSummary = styled.div`
  height: 40rem;
  width: 35rem;
`;

function OrderSummary() {
  return (
    <StyledOrderSummary>
      <Summary isCheckingout={true} />
    </StyledOrderSummary>
  );
}

export default OrderSummary;
