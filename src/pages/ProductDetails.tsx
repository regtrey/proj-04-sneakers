import styled from 'styled-components';
import { useShoe } from '../features/useShoe';

const StyledProductDetails = styled.div`
  padding: 6rem 4rem;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ProductImageContainer = styled.div`
  height: 80vh;
  width: 40vw;
  position: relative;
`;

const ProductImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-md);
  display: block;
`;

const Details = styled.div`
  width: 50%;
  /* background-color: #e49090; */
  padding: 2rem;
  padding-left: 6rem;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;

const ProductCategory = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-transform: capitalize;
`;

const ProductPrice = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const Container = styled.div`
  width: max-content;
  /* background-color: black; */
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const ProductVariantsBox = styled.div`
  height: 8rem;
  width: 8rem;
  border-radius: var(--border-radius-sm);
  outline: 2px solid transparent;
  position: relative;

  &:hover {
    outline: 2px solid #000;
  }
`;

const ProductVariants = styled.img`
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-sm);
  object-position: center;
  object-fit: cover;
  display: block;
  cursor: pointer;
`;

function ProductDetails() {
  const { isLoading, shoe, error } = useShoe();

  if (isLoading) return 'Loading...';
  if (!shoe || error) return 'Error...';

  const { name, category, colors, tag, price, image, alt } = shoe[0];

  return (
    <StyledProductDetails>
      <ProductImageContainer>
        <ProductImage src={image[0]} alt={alt} />
      </ProductImageContainer>
      <Details>
        <ProductName>{name}</ProductName>
        <ProductCategory>{category}'s Shoes</ProductCategory>
        <ProductPrice>${price}</ProductPrice>

        <Container>
          {image.map((variant, i) => (
            <ProductVariantsBox key={i}>
              <ProductVariants src={variant} alt={`${alt}-0${i}`} />
            </ProductVariantsBox>
          ))}
        </Container>
      </Details>
    </StyledProductDetails>
  );
}

export default ProductDetails;
