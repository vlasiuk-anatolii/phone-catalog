
import './HotPrices.scss';
import { useEffect } from 'react';
import { getProducts } from '../../../api/api';
import { setAllProducts, setError } from '../../../store/actions';
import { getAllProducts } from '../../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../../react-app-env';
import { Slider } from '../Slider/Slider';

export const HotPrices = () => {
  const dispatch = useDispatch();
  const allList = useSelector(getAllProducts);

  useEffect(() => {
    getProducts()
      .then(result => {
        dispatch(setAllProducts(result));
        localStorage.setItem('allProducts', JSON.stringify(result));
      })
      .catch((error) => {
        dispatch(setError(`${error}`));
      });
  }, [dispatch]);

  const getDiscountProducts = (products: Product[]) => {
    const result = products.filter((item: { discount: number; }) => item.discount !== 0);
    return result;
  }

  let currentList: Product[] = getDiscountProducts(allList);

  return (
    <div className="hotprices">
     <Slider 
       currentList={currentList}
       title={'Hot prices'}
     />
    </div>
  );
};

