import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../api/api';
import { Product } from '../../../react-app-env';
import './ShopCategory.scss';

export const ShopCategory: React.FC = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const phonesAll = allProducts.filter(item => item.type === 'phone');
  const tabletsAll = allProducts.filter(item => item.type === 'tablet');
  const accessoriesAll = allProducts.filter(item => item.type === 'accessory');

  useEffect(() => {
    getProducts()
      .then(result => {
        setAllProducts(result);
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  },
  []);

  return (
    <div className="shop-category">
      <h1 className="shop-category__title">Shop by category</h1>
      <div className="shop-category__box-content">
        {errorMsg.length !== 0
        && <p className="phonespage__error">{errorMsg}</p>}
        <div className="shop-category__box-category">
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            className="shop-category__icon-button"
            onClick={() => {
              navigate('/phones');
            }}
          >
            <div className="shop-category__image" />
          </IconButton>
          <h3 className="shop-category__subtitle">Mobile phones</h3>
          <p className="shop-category__counter">
            {`${phonesAll.length} models`}
          </p>
        </div>

        <div className="shop-category__box-category">
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            className="shop-category__iconbutton"
            onClick={() => {
              navigate('/tablets');
            }}
          >
            <div className="shop-category__image shopcategory__image--tablets" />
          </IconButton>
          <h3 className="shop-category__subtitle">Tablets</h3>
          <p className="shop-category__counter">
            {`${tabletsAll.length} models`}
          </p>
        </div>

        <div className="shop-category__box-category">
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            className="shop-category__iconbutton"
            onClick={() => {
              navigate('/accessories');
            }}
          >
            <div
              className="shop-category__image shop-category__image--accessories"
            />
          </IconButton>
          <h3 className="shop-category__subtitle">Accessories</h3>
          <p className="shop-category__counter">
            {`${accessoriesAll.length} models`}
          </p>
        </div>
      </div>
    </div>
  );
};
