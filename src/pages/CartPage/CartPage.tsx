import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

import './CartPage.scss';
import { getSelectedCartSelector } from '../../store/selectors';
import {
  delFromCart,
  delQuantity,
  setQuantity,
} from '../../store/actions';

const CartPage = () => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const selected = useSelector(getSelectedCartSelector);
  const [currentItems, setCurrentItems] = useState(selected.length);
  const totalArray: number[] = [];

  selected
    .forEach(item => totalArray
      .push(item.product.price * (1 - item.product.discount / 100)));

  const initialAmount = totalArray.reduce((a, x) => a + x, 0);
  const [totalMoney, setTotalMoney] = useState(initialAmount);

  const handlerMinus = (id: string) => {
    const currentproduct = selected.find(item => item.id === id);

    if (currentproduct) {
      dispatch(delQuantity({
        id,
        quantity: currentproduct?.quantity - 1,
        product: currentproduct.product,
      }));
    }
  };

  const handlerPlus = (id: string) => {
    const currentproduct = selected.find(item => item.id === id);

    if (currentproduct) {
      dispatch(setQuantity({
        id,
        quantity: currentproduct?.quantity + 1,
        product: currentproduct.product,
      }));
    }
  };

  const handlerDelete = (id: string) => {
    const delItem = selected.find(item => item.id === id);

    if (delItem) {
      dispatch(delFromCart(delItem));
      setTotalMoney(totalMoney
        - delItem.quantity * (delItem.product.price
          * (1 - delItem.product.discount / 100)));
      setCurrentItems(currentItems - delItem.quantity);
    }
  };

  const forRender = selected
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-page__container">
        <div className="cart-page__box-arrow-back">
          <div className="cart-page__arrow--back" />
          <a
            href="#/phones"
            className="cart-page__link"
            data-cy="backButton"
          >
            <div
              className="cart-page__name-page"
            >
              Back
            </div>
          </a>
        </div>

        <h1 className="cart-page__title">
          Cart
        </h1>
        {currentItems === 0
        && <p className="cart-page__reminder">Your cart is empty</p>}

        <div className="cart-page__box-left-right">
          <div className="cart-page__box-left">
            <ul className="cart-page__list">
                {forRender.map(item => (

                  <li
                    className="cart-page__list-item"
                    key={item.id}
                  >
                    <div className='cart-page__wrapper'>
                      <IconButton
                        sx={{
                          margin: '48px 0 56px 24px',
                          width: '32px',
                          height: '32px',
                        }}
                        onClick={() => {
                          handlerDelete(item.id);
                        }}
                      >
                        <div className="cart-page__cross" />
                      </IconButton>
                      
                      <div className="cart-page__image">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                        />
                      </div>
  
                      <div className="cart-page__name-item">
                        {item.product.name}
                      </div>
                    </div>

                    <div className="cart-page__wrapper">
                      <div className="cart-page__box-plus-minus">
                        <div className="cart-page__rectangle">
                          <IconButton
                            disabled={item.quantity === 1}
                            onClick={() => {
                              setTotalMoney(totalMoney
                                - (item.product.price
                                * (1 - item.product.discount / 100)));
                              handlerMinus(item.id);
                              setCurrentItems(currentItems - 1);
                            }}
                          >
                            <div className="cart-page__minus" />
                          </IconButton>
                        </div>
  
                        <div className="cart-page__text-quontity">
                          {item.quantity }
                        </div>
  
                          <div className="cart-page__rectangle">
                            <IconButton
                              onClick={() => {
                                setTotalMoney(totalMoney
                                + (item.product.price
                                  * (1 - item.product.discount / 100)));
                                handlerPlus(item.id);
                                setCurrentItems(currentItems + 1);
                              }}
    
                            >
                              <div className="cart-page__plus" />
                            </IconButton>
                          </div>
                        </div>
                        <p className="cart-page__text-worth">
                          {item.product.price
                          * (1 - item.product.discount / 100)}
                        </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="cart-page__box-right">
            <p className="cart-page__current-price">
              $
              { totalMoney }
            </p>

            <h2 className="cart-page__text-count">
              Total for
              {' '}
              {currentItems}
              {' '}
              items
            </h2>

            
              <div className="cart-page__wrapper-button">
                <button
                  type="button"
                  className={isPressed
                    // eslint-disable-next-line max-len
                    ? 'cart-page__checkout--pressed cart-page__text-checkout--pressed'
                    : 'cart-page__checkout'}
                  onClick={() => {
                    setIsPressed(!isPressed);
                  }}
                >
                  {isPressed ? 'Done' : 'Checkout'}
                </button>
              </div >

            {isPressed && (
              <p className="cart-page__sorry">
                {'We are sorry,'}<br/>
                {'but this feature'}<br/>
                {'is not implemented yet!'}
              </p>
            ) }

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
