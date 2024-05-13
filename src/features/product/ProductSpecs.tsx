import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';

import { useProductDetails } from './useProductDetails';

import { ICart } from '../../types/ProductType';
import { Button } from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import ProductSize from './ProductSize';

const StyledProductSpecs = styled.div`
  width: 70rem;
  width: max-content;
  padding: 2rem;

  @media screen and (min-width: 768px) and (max-width: 850px) {
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
    padding: 1rem 0;
  }
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

  @media screen and (max-width: 768px) {
    width: 90vw;
    margin: 2rem 0;
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

function ProductSpecs() {
  const {
    isFav,
    setIsFav,
    setHasSelectedSize,
    navigate,
    userId,
    isAuthenticated,
    shoe,
    addFavItem,
    deleteFavItem,
    addItem,
    addItemLoading,
    currentSelectedStyle,
    currentSelectedSize,
    handleSelect,
    hasSelectedSize,
  } = useProductDetails();

  if (!shoe) return;

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
      selectedStyle: currentSelectedStyle,
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
      navigate('/signup');
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
    <StyledProductSpecs>
      <ProductName>{name}</ProductName>
      <ProductCategory>{category} Shoes</ProductCategory>
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
      <ProductSize
        hasSelectedSize={hasSelectedSize}
        setHasSelectedSize={setHasSelectedSize}
      />
      <ButtonContainer>
        <Button
          $variant="primary"
          $size="lg"
          onClick={() => handleAddItem('cart')}
        >
          {addItemLoading ? <SpinnerMini /> : 'Add to Bag'}
        </Button>
        <Button
          $variant="secondary"
          $size="lg"
          onClick={() => handleAddItem('favourite')}
        >
          Favourite {isFav ? <HiHeart /> : <HiOutlineHeart />}
        </Button>
      </ButtonContainer>
    </StyledProductSpecs>
  );
}

export default ProductSpecs;
