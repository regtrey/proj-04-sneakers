import styled from 'styled-components';
import CartItem from './CartItem';
import { useAppSelector } from '../../store';

const StyledCartBag = styled.div`
  height: 72rem;
  width: 35vw;
  overflow-y: scroll;
  position: relative;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 500;
`;

function CartBag() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <StyledCartBag>
      <Heading>Bag</Heading>
      {cartItems.map((item, i) => (
        <CartItem key={i} item={item} />
      ))}
    </StyledCartBag>
  );
}

export default CartBag;
