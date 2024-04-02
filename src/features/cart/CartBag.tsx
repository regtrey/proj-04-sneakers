import styled from 'styled-components';

import { useUser } from '../auth/useUser';
import { useCart } from './useCart';

import { Heading } from '../../ui/Heading';
import CartItem from './CartItem';
import Spinner from '../../ui/Spinner';

const StyledCartBag = styled.div`
  height: 72rem;
  width: 40vw;
  overflow-y: scroll;
  position: relative;

  @media screen and (min-width: 768px) and (max-width: 850px) {
    width: 90vw;
    height: 40rem;
    max-height: 55rem;
  }

  @media screen and (max-width: 767px) {
    width: 90vw;
    height: 30rem;
    max-height: 47rem;
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

function CartBag() {
  const { isAuthenticated, userId } = useUser();
  const { cartItems, userCartLoading } = useCart(userId);

  return (
    <StyledCartBag>
      <Heading>Bag</Heading>
      {userCartLoading && (
        <Empty>
          <Spinner />
        </Empty>
      )}
      {(!isAuthenticated && !userCartLoading) || cartItems?.length === 0 ? (
        <Empty>Your cart is currently empty</Empty>
      ) : null}
      {cartItems
        ? cartItems.map((item, i) => <CartItem key={i} item={item} />)
        : null}
    </StyledCartBag>
  );
}

export default CartBag;
