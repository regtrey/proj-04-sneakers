import styled from 'styled-components';

import { useUser } from '../auth/useUser';
import { useOrder } from './useOrder';
import Order from './Order';
import { ICart } from '../../types/ProductType';

const StyledOrderItems = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailsSpan = styled.span`
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const MS_PER_DAY = 86400000;

function OrderItems() {
  const { userId } = useUser();
  const { orderItems } = useOrder(userId);
  console.log(orderItems);

  // Milliseconds in a day: 1000ms * 60sec * 60m * 24h => 86 400 000
  // Fixed mock arrival date of 7 days: 86 400 000 * 7 + current time in ms
  const dates = orderItems?.map((item) => item.created_at);
  const curDate = new Date(dates?.at(0));
  const curTime = curDate.getTime();
  const arrivalTime = MS_PER_DAY * 7 + curTime;
  const arrivalDate = String(new Date(arrivalTime))
    .split(' ')
    .slice(0, 4)
    .join(' ');

  console.log(curTime, arrivalDate);

  return (
    <StyledOrderItems>
      {orderItems &&
        orderItems.map((item) => {
          return (
            <>
              <DetailsSpan>Order #{item.order_id.split('-').at(0)}</DetailsSpan>
              <DetailsSpan>Arrives by {arrivalDate}</DetailsSpan>
              {item.order.map((orderItem: ICart, i: number) => (
                <Order key={i} item={orderItem} />
              ))}
            </>
          );
        })}
    </StyledOrderItems>
  );
}

export default OrderItems;
