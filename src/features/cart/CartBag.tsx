import styled from 'styled-components';

import { useUser } from '../auth/useUser';
import { useCart } from './useCart';

import CartItem from './CartItem';
import Spinner from '../../ui/Spinner';

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

const Empty = styled.div`
  height: 20rem;
  font-size: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CartBag() {
  const { userId } = useUser();
  const { cartItems, userCartLoading } = useCart(userId);

  return (
    <StyledCartBag>
      <Heading>Bag</Heading>
      {cartItems?.length === 0 && <Empty>Your cart is currently empty</Empty>}
      {userCartLoading && <Spinner />}
      {cartItems
        ? cartItems.map((item, i) => <CartItem key={i} item={item} />)
        : null}
    </StyledCartBag>
  );
}

export default CartBag;
