import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Card.scss';
import {
  delFavorites, delFromCart, setFavorites, setSelectedCart,
} from '../../../store/actions';
import {
  getFavoritesSelector,
  getSelectedCartSelector,
} from '../../../store/selectors';
import { ObjectForCart, Product } from '../../../react-app-env';

type Props = {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
};

export const Card: React.FC<Props> = ({
  age,
  id,
  type,
  imageUrl,
  name,
  snippet,
  price,
  discount,
  screen,
  capacity,
  ram,
}) => {
  const dispatch = useDispatch();
  const currentFavorite = useSelector(getFavoritesSelector);
  const currentSelectedCart = useSelector(getSelectedCartSelector);
  const currentPrice = price * (1 - discount / 100);
  const [isSelected, setIsSelected] = useState(false);
  const [isAddedProduct, setIsAddedProduct] = useState(false);

  const handlerSelectedToCart = (obj: Product, index: string) => {
    if (currentSelectedCart.some(item => item.id === index)) {
      dispatch(delFromCart({
        id: obj.id,
        quantity: 1,
        product: obj,
      }));
    } else {
      dispatch(setSelectedCart({
        id: obj.id,
        quantity: 1,
        product: obj,
      }));
    }
  };

  const isProductInCart = (id:string, arr: ObjectForCart[]): boolean => {
    return arr.some(item => item.id === id);
  }

  const isProductFavorite = (id:string, arr:string[]): boolean => {
    return arr.some(item => item === id);
  }

  const handlerAddOrDelete = (index: string) => {
    if (currentFavorite.includes(index)) {
      dispatch(delFavorites(index));
    } else {
      dispatch(setFavorites(index));
    }
  };

  // function isPageFavorite() {
  //   if (window.location.href.includes('/favorites')) {
  //     setIsSelected(true);
  //   }
  // }

  // useEffect(() => {
  //   isPageFavorite();
  // }, []);

  return (
    <div data-cy="cardsContainer" className="card">
      <NavLink to={`/product/${id}`}>
        <div className="card__box-image">
          <img
            src={imageUrl}
            alt={name}
          />
        </div>
      </NavLink>

      <div className="card__name-phone">
        <p className="card__name">{name}</p>
      </div>

      <div className="card__box-price-phone">
        <h2 className="card__current-price">
          $
          {currentPrice}
        </h2>
        <h2 className={discount === 0
          ? 'card__prev-price--none'
          : 'card__prev-price'}
        >
          $
          {price}
        </h2>
      </div>

      <div className="card__divider" />

      <div className="card__box-info">
        <div className="card__screen-name">
          <p className="card__text-features">Screen</p>
          <p className="card__value-features">{screen}</p>
        </div>

        <div className="card__capacity-name">
          <p className="card__text-features">Capacity</p>
          <p className="card__value-features">{capacity}</p>
        </div>

        <div className="card__ram-name">
          <p className="card__text-features">RAM</p>
          <p className="card__value-features">{ram}</p>
        </div>
      </div>

      <div className="card__box-buttons">
        <button
          type="button"
          className={isProductInCart(id, currentSelectedCart)
            ? 'card__add-to-cart--pressed card__text-add-to-cart--pressed'
            : 'card__add-to-cart'}
          onClick={() => {
            const obj = {
              age,
              id,
              type,
              imageUrl,
              name,
              snippet,
              price,
              discount,
              screen,
              capacity,
              ram,
            };

            setIsAddedProduct(!isAddedProduct);
            handlerSelectedToCart(obj, id);
          }}
        >
          {isAddedProduct ? 'Added to cart' : 'Add to cart'}
        </button>
        <IconButton
          size="small"
          sx={{ padding: 0 }}
          onClick={() => {
            setIsSelected(!isSelected);
            handlerAddOrDelete(id);
          }}
        >
          <div className="card__rectangle">
            <div
              id="heart"
              className={isProductFavorite(id, currentFavorite)
                ? 'card__favorites-selected'
                : 'card__favorites'}
            />
          </div>
        </IconButton>
      </div>
    </div>
  );
};
