import styled from 'styled-components';
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

function Summary() {
  return (
    <StyledSummary>
      <Heading>Summary</Heading>
      <SubTotal>
        Subtotal <ItemPrice>$142</ItemPrice>
      </SubTotal>
      <SubTotal>
        Estimated Delivery & Handling <ItemPrice>$5</ItemPrice>
      </SubTotal>

      <Total>
        Total <ItemPrice>$147</ItemPrice>
      </Total>

      <Button type="primary" $size="lg">
        Checkout
      </Button>
    </StyledSummary>
  );
}

export default Summary;
