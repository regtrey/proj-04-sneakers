import styled from 'styled-components';

import { useAppSelector } from '../../store';
import { useCart } from './useCart';
import { useUser } from '../auth/useUser';

import CartItem from './CartItem';

const StyledCartBag = styled.div`
  height: 72rem;
  width: 40vw;
  overflow-y: scroll;
  position: relative;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 500;
`;

function CartBag() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const { userId } = useUser();
  const { data } = useCart(userId);

  const items = data ? data : cartItems;

  return (
    <StyledCartBag>
      <Heading>Bag</Heading>
      {items.map((item, i) => (
        <CartItem key={i} item={item} />
      ))}
    </StyledCartBag>
  );
}

export default CartBag;
