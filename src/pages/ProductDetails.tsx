import styled from 'styled-components';
import { useShoe } from '../features/useShoe';

const StyledProductDetails = styled.div`
  padding: 6rem 4rem;
  display: flex;
  position: relative;
`;

const ProductImage = styled.img`
  width: 50%;
  border-radius: var(--border-radius-md);
  display: block;
`;

const Details = styled.div`
  width: 50%;
  background-color: #e49090;
`;

function ProductDetails() {
  const { isLoading, shoe, error } = useShoe();

  if (isLoading) return 'Loading...';
  if (!shoe || error) return 'Error...';

  const { name, category, colors, tag, price, image, alt } = shoe[0];

  return (
    <StyledProductDetails>
      <ProductImage src={image[0]} alt={alt} />
      <Details></Details>
    </StyledProductDetails>
  );
}

export default ProductDetails;
