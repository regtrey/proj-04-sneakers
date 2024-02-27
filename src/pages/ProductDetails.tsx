import styled, { css } from 'styled-components';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShoe } from '../features/useShoe';

const StyledProductDetails = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;
  /* background-color: orange; */
`;

const ProductImageContainer = styled.div`
  height: 65rem;
  width: 55rem;
  position: relative;
`;

const ProductImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-md);
  display: block;
`;

const Details = styled.div`
  width: 70rem;
  width: max-content;
  /* background-color: #e49090; */
  padding: 2rem;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;

const ProductCategory = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin: 0.75rem 0 1.5rem;
  text-transform: capitalize;
`;

const ProductPrice = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const Container = styled.div`
  width: 38rem;
  /* background-color: black; */
  margin: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;

  & input {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 2;
  }
`;

interface IVariantsBox {
  $isSelected: boolean;
}

const ProductVariantsBox = styled.div<IVariantsBox>`
  height: 6.8rem;
  width: 6.8rem;
  border-radius: var(--border-radius-sm);
  outline: ${(props) =>
    props.$isSelected ? '1px solid #000' : '1px solid transparent'};
  position: relative;

  &:hover {
    outline: 1px solid #000;
  }
`;

const ProductVariantsImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-sm);
  object-position: center;
  object-fit: cover;
  display: block;
  cursor: pointer;
`;

const SizeHeading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

const SizeContainer = styled.div`
  height: max-content;
  width: 38rem;
  margin: 1rem 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

interface ISizeProps {
  $isSelected: boolean;
}

const Size = styled.div<ISizeProps>`
  height: 5rem;
  width: 12rem;
  font-size: 1.5rem;
  border: ${(props) =>
    props.$isSelected ? '1px solid #000' : '1px solid var(--color-gray-100)'};
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border: 1px solid #000;
  }

  & input {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 2;
  }
`;

const ButtonContainer = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const buttonType = {
  primary: css`
    background-color: #000;
    border: none;
    color: var(--color-gray-0);

    &:hover {
      background-color: var(--color-gray-700);
      background-color: #404040;
    }
  `,
  secondary: css`
    background-color: var(--color-gray-0);
    border: 1.5px solid var(--color-gray-200);

    &:hover {
      border: 1.5px solid #000;
    }
  `,
};

interface IButtonType {
  type: 'primary' | 'secondary';
}

const Button = styled.button<IButtonType>`
  height: 6rem;
  font-size: 1.75rem;
  font-weight: 500;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) => buttonType[props.type]}
`;

function ProductDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, shoe, error } = useShoe();

  const currentSelectedStyle = Number(searchParams.get('style')) || 1;
  const currentSelectedSize = Number(searchParams.get('size'));

  if (isLoading) return 'Loading...';
  if (!shoe || error) return 'Error...';

  const { id, name, category, colors, tag, sizes, price, image, alt } = shoe[0];

  const handleSelect = (
    e: React.MouseEvent<HTMLInputElement>,
    field: string
  ) => {
    const target = e.target as HTMLInputElement;
    searchParams.set(field, target.value);
    setSearchParams(searchParams);
  };

  return (
    <StyledProductDetails>
      <ProductImageContainer>
        <ProductImage src={image[currentSelectedStyle - 1]} alt={alt} />
      </ProductImageContainer>
      <Details>
        <ProductName>{name}</ProductName>
        <ProductCategory>{category}'s Shoes</ProductCategory>
        <ProductPrice>${price}</ProductPrice>

        <Container>
          {image.map((variant, i) => (
            <ProductVariantsBox
              key={i}
              $isSelected={currentSelectedStyle === i + 1}
            >
              <input
                type="radio"
                value={i + 1}
                onClick={(e) => handleSelect(e, 'style')}
              />
              <ProductVariantsImage src={variant} alt={`${alt}-0${i}`} />
            </ProductVariantsBox>
          ))}
        </Container>

        <SizeHeading>Select Size</SizeHeading>
        <SizeContainer>
          {sizes.map((size, index) => {
            const curSize = size.split(' ')[1];
            return (
              <Size
                key={index}
                $isSelected={currentSelectedSize === Number(curSize)}
              >
                <input
                  id={curSize}
                  type="radio"
                  value={curSize}
                  onClick={(e) => handleSelect(e, 'size')}
                />
                {size}
              </Size>
            );
          })}
        </SizeContainer>

        <ButtonContainer>
          <Button type="primary">Add to Bag</Button>
          <Button type="secondary">Favourite</Button>
        </ButtonContainer>
      </Details>
    </StyledProductDetails>
  );
}

export default ProductDetails;
