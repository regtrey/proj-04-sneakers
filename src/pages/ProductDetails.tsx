import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useUser } from '../features/auth/useUser';
import { useShoe } from '../features/useShoe';
import { useAddCartItem } from '../features/cart/useAddCartItem';

import { Button } from '../ui/Button';
import { ICart } from '../types/ProductType';
// import { useUpdateCartItem } from '../features/cart/useUpdateCartItem';
import { useFavourite } from '../features/favourites/useFavourite';
import { useAddFavourite } from '../features/favourites/useAddFavourite';
import { useDeleteFavourite } from '../features/favourites/useDeleteFavourite';

const StyledProductDetails = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;
`;

const ProductImageContainer = styled.div`
  height: 65rem;
  width: 55rem;
  position: relative;
`;

const ProductImage = styled(LazyLoadImage)`
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-md);
  display: block;
`;

const Details = styled.div`
  width: 70rem;
  width: max-content;
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

const ProductVariantsImage = styled(LazyLoadImage)`
  height: 6.8rem;
  width: 6.8rem;
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

const sizeError = {
  none: css`
    outline: 1px solid transparent;
  `,
  error: css`
    outline: 1px solid #c11313;
  `,
};

interface IError {
  $sizeSelect?: 'none' | 'error';
}

const SizeContainer = styled.div<IError>`
  height: max-content;
  width: 38rem;
  border-radius: var(--border-radius-sm);
  outline-offset: 1px;
  margin: 1rem 0 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;

  ${(props) =>
    props.$sizeSelect === 'none' ? sizeError['none'] : sizeError['error']}
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

const SelectSizeSpan = styled.span<IError>`
  font-size: 1.5rem;
  color: red;
  position: absolute;
  bottom: -3rem;

  display: ${(props) => (props.$sizeSelect === 'none' ? 'none' : 'block')};
`;

const ButtonContainer = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & svg {
    margin-left: 0.5rem;
  }
`;

function ProductDetails() {
  const [isFav, setIsFav] = useState(false);
  const [hasSelectedSize, setHasSelectedSize] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname.replace('/', '').split('/');

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { userId, isAuthenticated } = useUser();
  const { shoe, isLoading, error } = useShoe(currentPath);
  // const { updateItem } = useUpdateCartItem(userId, shoe?.shoe_id, 'shoe_id');

  const { addFavItem } = useAddFavourite();
  const { deleteFavItem } = useDeleteFavourite(userId, shoe?.shoe_id);
  const { favItem } = useFavourite(userId, shoe?.shoe_id);

  const { addItem } = useAddCartItem();

  const currentSelectedStyle = Number(searchParams.get('style')) || 1;
  const currentSelectedSize = Number(searchParams.get('size'));

  const curFavItem = favItem && favItem[0];

  useEffect(() => {
    if (curFavItem) {
      setIsFav(curFavItem?.isFavourite);
      searchParams.set('size', curFavItem?.selectedSize);
      setSearchParams(searchParams);
    }
    if (!curFavItem) {
      setIsFav(false);
    }
  }, [curFavItem, curFavItem?.isFavourite]);

  if (isLoading) return 'Loading...';
  if (!shoe || error) return 'Error...';

  const {
    shoe_id,
    name,
    brand,
    category,
    tag,
    colors,
    sizes,
    price,
    image,
    alt,
    placeholder,
    slug,
    categorySlug,
  } = shoe;

  const handleSelect = (e: React.MouseEvent, field: string) => {
    const target = e.target as HTMLInputElement;
    searchParams.set(field, target.value);
    setSearchParams(searchParams);
  };

  const handleAddItem = (field: string) => {
    if (!currentSelectedSize) {
      setHasSelectedSize(false);
      return;
    }

    const cartItems: ICart = {
      shoe_id,
      name,
      brand,
      category,
      tag,
      slug,
      categorySlug,
      color: colors[currentSelectedStyle - 1],
      sizes,
      selectedSize: currentSelectedSize,
      image: image[currentSelectedStyle - 1],
      alt,
      placeholder: image[currentSelectedStyle - 1],
      price,
      total: price,
      quantity: 1,
      isFavourite: true,
      user_id: userId,
    };

    if (!isAuthenticated) {
      navigate('/signin');
    }

    if (isAuthenticated) {
      if (field === 'cart') {
        addItem(cartItems);
      }
      if (field === 'favourite' && isFav) {
        setIsFav(false);
        deleteFavItem();
      }
      if (field === 'favourite' && !isFav) {
        setIsFav(true);
        addFavItem(cartItems);
      }
    }
  };

  return (
    <StyledProductDetails>
      <ProductImageContainer>
        <ProductImage
          src={image[currentSelectedStyle - 1]}
          alt={alt}
          placeholderSrc={placeholder[currentSelectedStyle - 1]}
          effect="blur"
        />
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
              <ProductVariantsImage
                src={variant}
                alt={`${alt}-0${i}`}
                placeholderSrc={placeholder[i]}
                effect="blur"
              />
            </ProductVariantsBox>
          ))}
        </Container>

        <SizeHeading>Select Size</SizeHeading>
        <SizeContainer $sizeSelect={hasSelectedSize ? 'none' : 'error'}>
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
                  onClick={(e) => {
                    setHasSelectedSize(true);
                    handleSelect(e, 'size');
                  }}
                />
                {size}
              </Size>
            );
          })}
          <SelectSizeSpan $sizeSelect={hasSelectedSize ? 'none' : 'error'}>
            Please select a size.
          </SelectSizeSpan>
        </SizeContainer>

        <ButtonContainer>
          <Button
            $variant="primary"
            $size="lg"
            onClick={() => handleAddItem('cart')}
          >
            Add to Bag
          </Button>
          <Button
            $variant="secondary"
            $size="lg"
            onClick={() => handleAddItem('favourite')}
          >
            Favourite {isFav ? <HiHeart /> : <HiOutlineHeart />}
          </Button>
        </ButtonContainer>
      </Details>
    </StyledProductDetails>
  );
}

export default ProductDetails;
