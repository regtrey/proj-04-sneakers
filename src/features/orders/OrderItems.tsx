import styled from 'styled-components';
import React from 'react';

import { useUser } from '../auth/useUser';
import { useOrder } from './useOrder';

import { ICart } from '../../types/ProductType';
import Order from './Order';
import Spinner from '../../ui/Spinner';

const StyledOrderItems = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    gap: 0;
  }
`;

const DetailsSpan = styled.span`
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const Empty = styled.div`
  height: 20rem;
  font-size: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MS_PER_DAY = 86400000;

function OrderItems() {
  const { userId } = useUser();
  const { orderItems, orderItemsLoading } = useOrder(userId);

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

  return (
    <StyledOrderItems>
      {orderItems?.length === 0 && <Empty>You have no orders yet</Empty>}
      {orderItemsLoading && <Spinner />}
      {orderItems &&
        orderItems.map((item) => {
          return (
            <React.Fragment key={item.order_id}>
              <DetailsSpan>Order #{item.order_id.split('-').at(0)}</DetailsSpan>
              <DetailsSpan>Arrives by {arrivalDate}</DetailsSpan>
              {item.order.map((orderItem: ICart, i: number) => (
                <Order key={item.order_id + i} item={orderItem} />
              ))}
            </React.Fragment>
          );
        })}
    </StyledOrderItems>
  );
}

export default OrderItems;
