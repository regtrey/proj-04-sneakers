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

  @media screen and (max-width: 768px) {
    height: 47rem;
    width: 90vw;
  }
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
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
