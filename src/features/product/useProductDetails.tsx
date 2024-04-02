import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useUser } from '../auth/useUser';
import { useShoe } from '../useShoe';
import { useAddFavourite } from '../favourites/useAddFavourite';
import { useDeleteFavourite } from '../favourites/useDeleteFavourite';
import { useFavourite } from '../favourites/useFavourite';
import { useAddCartItem } from '../cart/useAddCartItem';

export function useProductDetails() {
  const [isFav, setIsFav] = useState(false);
  const [hasSelectedSize, setHasSelectedSize] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname.replace('/', '').split('/');

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { userId, isAuthenticated } = useUser();
  const { shoe, isLoading, error } = useShoe(currentPath);

  const { addFavItem } = useAddFavourite();
  const { deleteFavItem } = useDeleteFavourite(userId, shoe?.shoe_id);
  const { favItem } = useFavourite(userId, shoe?.shoe_id);

  const { addItem, addItemLoading } = useAddCartItem();

  const currentSelectedStyle = Number(searchParams.get('style')) || 1;
  const currentSelectedSize = Number(searchParams.get('size'));

  const curFavItem = favItem && favItem[0];

  useEffect(() => {
    if (curFavItem) {
      setIsFav(curFavItem?.isFavourite);
      searchParams.set('size', curFavItem?.selectedSize);
      searchParams.set('style', curFavItem?.selectedStyle);
      setSearchParams(searchParams);
    }
    if (!curFavItem) {
      setIsFav(false);
    }
  }, [curFavItem, curFavItem?.isFavourite, searchParams, setSearchParams]);

  const handleSelect = (e: React.MouseEvent, field: string) => {
    const target = e.target as HTMLInputElement;
    searchParams.set(field, target.value);
    setSearchParams(searchParams);
  };

  return {
    isFav,
    setIsFav,
    hasSelectedSize,
    setHasSelectedSize,
    currentPath,
    navigate,
    searchParams,
    setSearchParams,
    userId,
    isAuthenticated,
    shoe,
    isLoading,
    error,
    addFavItem,
    deleteFavItem,
    favItem,
    addItem,
    addItemLoading,
    currentSelectedStyle,
    currentSelectedSize,
    curFavItem,
    handleSelect,
  };
}
