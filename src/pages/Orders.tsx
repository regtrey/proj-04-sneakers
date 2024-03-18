import styled from 'styled-components';
import OrderItems from '../features/orders/OrderItems';

const StyledOrders = styled.div`
  padding: 6rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 500;
`;

function Orders() {
  return (
    <StyledOrders>
      <Heading>Orders</Heading>
      <OrderItems />
    </StyledOrders>
  );
}

export default Orders;
