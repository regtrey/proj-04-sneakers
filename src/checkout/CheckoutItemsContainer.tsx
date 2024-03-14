import styled from 'styled-components';

import CheckoutItems from './CheckoutItems';
import { ICart } from '../types/ProductType';

const StyledCheckoutItemsContainer = styled.div`
  height: 35rem;
  overflow-y: scroll;
`;

function CheckoutItemsContainer({ items }: { items: ICart[] }) {
  return (
    <StyledCheckoutItemsContainer>
      {items.map((item) => (
        <CheckoutItems key={item.cart_id} item={item} />
      ))}
    </StyledCheckoutItemsContainer>
  );
}

export default CheckoutItemsContainer;
