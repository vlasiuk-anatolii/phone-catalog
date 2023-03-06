/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './ProductDetailsPage.scss';
import { Product, ProductDetails } from '../../react-app-env';
import { NotFound } from '../../components/NotFound/NotFound';

import {
  getFavoritesSelector,
  getSelectedCartSelector,
  getError,
} from '../../store/selectors';

import {
  delFavorites,
  delFromCart,
  setError,
  setFavorites,
  setSelectedCart,
} from '../../store/actions';
import { MayLike } from '../../components/Main/MayLike/MayLike';
import { getDetails } from '../../api/api';

export const ProductDetailsPage = () => {
  let localStorageAllProducts: Product[] = [];
  const getAllProducts: string | null = localStorage.getItem('allProducts');
  if (getAllProducts) {
    localStorageAllProducts = JSON.parse(getAllProducts);
  }
  const errorMsg = useSelector(getError);
  const { id } = useParams<{ id: string }>();
  const [
    currentProductDetails,
    setCurrentProductDetails,
  ] = useState<ProductDetails | undefined>(undefined);
  const [isSelected, setIsSelected] = useState(false);
  const [isAddedProduct, setIsAddedProduct] = useState(false);
  const [urlImage, setUrlImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFavorite = useSelector(getFavoritesSelector);
  const currentSelectedCart = useSelector(getSelectedCartSelector);
  let currentPrice = 0;
  const currentProduct = localStorageAllProducts.find(item => item.id === id);

  if (currentProduct) {
    currentPrice = currentProduct.price
    * (1 - currentProduct.discount / 100);
  }
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

  const handlerAddOrDelete = () => {
    if (currentProduct?.id) {
      if (currentFavorite.includes(currentProduct?.id)) {
        dispatch(delFavorites(currentProduct?.id));
      } else {
        dispatch(setFavorites(currentProduct?.id));
      }
    }
  };

  useEffect(() => {
    getDetails(id)
      .then(result => {
        setCurrentProductDetails(result);
      })
      .catch((error) => {
        dispatch(setError(`${error}`));
      });
  }, [id]);

  return (
    <>
      <Header />
      <div className="product-details">
        <div className="product-details__container">
          <div className="product-details__box-img-home-arrow">
            <IconButton
              color="inherit"
              sx={{
                padding: '0',
              }}
              onClick={() => {
                navigate('/');
              }}
            >
              <div className="product-details__img-home" />
            </IconButton>
            <div className="product-details__arrow" />
            <a href={`#/${currentProduct?.type}s`} className="product-details__link">
              <div
                className="product-details__name-category"
              >
                {currentProduct?.type}
              </div>
            </a>
            <div className="product-details__arrow" />
            {errorMsg.length !== 0
            && <p className="product-details__error">{errorMsg}</p>}
            {!currentProduct && <NotFound />}
            <div className="product-details__name-page">
              {currentProduct?.name}
            </div>
          </div>
          <div className="product-details__box-arrow-back">
            <div className="product-details__arrow--back" />
            <a
              href="#/phones"
              className="product-details__link"
              data-cy="backButton"
            >
              <div
                className="product-details__name-page"
              >
                Back
              </div>
            </a>
          </div>
          <h1 className="product-details__title">
            {currentProduct?.name}
          </h1>
          <div className="product-details__box-left-right">
            <div className="product-details__box-left">
              <div className="product-details__box-img">
                <div>
                  <ul className="product-details__list">
                    {currentProductDetails?.images.map((item, i) => (
                      <IconButton
                        sx={{
                          padding: 0,
                          marginBottom: '16px',
                        }}
                        onClick={() => {
                          setUrlImage(item);
                        }}
                        key={i}
                      >
                        <li className="product-details__little-img">
                          <img
                            src={item}
                            alt={currentProductDetails.name}
                          />
                        </li>
                      </IconButton>
                    ))}
                  </ul>
                </div>
                <div className="product-details__box-main-img">
                  <img
                    src={urlImage.length === 0
                      ? `${currentProductDetails?.images[0]}`
                      : `${urlImage}`}
                    alt={currentProductDetails?.name}
                    className="product-details__main-img"
                  />
                </div>
              </div>
              <div className="product-details__box-text">
                <h2
                  className="product-details__about-title"
                >
                  About
                </h2>
                <div className="product-details__divider" />
                <h3 className="product-details__about-subtitle">
                  Description
                </h3>
                <p className="product-details__text">
                  {currentProductDetails?.description}
                </p>
                <h3 className="product-details__about-subtitle">
                  Additional Features
                </h3>
                <p className="product-details__text">
                  {currentProductDetails?.additionalFeatures}
                </p>
              </div>
            </div>
            <div className="product-details__box-right">
              <div className="product-details__box-price-phone">
                <h2 className="product-details__current-price">
                  $
                  {currentPrice}
                </h2>
                <h2 className={currentProduct?.discount === 0
                  ? 'product-details__prev-price--none'
                  : 'product-details__prev-price'}
                >
                  $
                  {currentProduct?.price}
                </h2>
              </div>
              <div className="product-details__box-buttons">
                <button
                  type="button"
                  className={isAddedProduct
                    // eslint-disable-next-line max-len
                    ? 'product-details__add-to-cart--pressed product-details__text-add-to-cart--pressed'
                    : 'product-details__add-to-cart'}
                  onClick={() => {
                    setIsAddedProduct(!isAddedProduct);
                    if (currentProduct) {
                      handlerSelectedToCart(currentProduct, currentProduct.id);
                    }
                  }}
                >
                  {isAddedProduct ? 'Selected' : 'Add to cart'}
                </button>
                <IconButton
                  size="small"
                  sx={{ padding: 0 }}
                  onClick={() => {
                    setIsSelected(!isSelected);
                    handlerAddOrDelete();
                  }}
                >
                  <div className="product-details__rectangle">
                    <div className={(currentProduct?.id
                    && isSelected)
                      ? 'product-details__favorites_selected'
                      : 'product-details__favorites'}
                    />
                  </div>
                </IconButton>
              </div>
              <div className="product-details__box-info">
                <div className="product-details__screen-name">
                  <p className="product-details__text-features">Screen</p>
                  <p className="product-details__value-features">
                    {currentProduct?.screen}
                  </p>
                </div>
                <div className="product-details__capacity-name">
                  <p className="product-details__text-features">Capacity</p>
                  <p className="product-details__value-features">
                    {currentProduct?.capacity}
                  </p>
                </div>
                <div className="product-details__ram-name">
                  <p className="product-details__text-features">RAM</p>
                  <p className="product-details__value-features">
                    {currentProduct?.ram}
                  </p>
                </div>
              </div>
              <h2 className="product-details__about-title">Tech specs</h2>
              <div className="
                product-details__divider
                product-details__divider--right"
              />
              <div className="product-details__tech-specs">
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    OS
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.android.os}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    UI
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.android.ui}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Availability
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.availability.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    StandbyTime
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.battery.standbyTime}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    TalkTime
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.battery.talkTime}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Battery
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.battery.type}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Camera Features
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.camera.features.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Camera Primary
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.camera.primary}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Bluetooth
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.connectivity.bluetooth}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    GPS
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.connectivity.gps ? 'true' : 'false'}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Infrared
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.connectivity.infrared
                      ? 'true'
                      : 'false'}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Wi-Fi
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.connectivity.wifi}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Screen Resolution
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.display.screenResolution}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Screen Size
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.display.screenSize}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Touch Screen
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.display.touchScreen
                      ? 'true'
                      : 'false'}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Accelerometer
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.hardware.accelerometer
                      ? 'true'
                      : 'false'}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    FM Radio
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.hardware.fmRadio
                      ? 'true'
                      : 'false'}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Physical Keyboard
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.hardware.physicalKeyboard
                      ? 'true'
                      : 'false'}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    USB
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.hardware.usb}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    CPU
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.hardware.cpu}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    AudioJack
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.hardware.audioJack}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Dimensions
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.sizeAndWeight.dimensions.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Weight
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.sizeAndWeight.weight}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    Flash Storage
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.storage.flash}
                  </p>
                </div>
                <div className="product-details__tech-specs-name">
                  <p className="product-details__text-tech-specs">
                    RAM Storage
                  </p>
                  <p className="product-details__value-tech-specs">
                    {currentProductDetails?.storage.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!currentProductDetails && <NotFound />}
      </div>
      <div className="product-details__may-like-wrapper">
        <MayLike />
      </div >
      <Footer />
    </>
  );
};
