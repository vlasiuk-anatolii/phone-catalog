/* eslint-disable react-hooks/exhaustive-deps */
import './MayLike.scss';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../store/selectors';
import { Product } from '../../../react-app-env';
import { Slider } from '../Slider/Slider';
import { useEffect, useState } from 'react';

export const MayLike = () => {
  const [forRender, setforRender] = useState<Product[]>([]);
  let localStorageAllProducts: Product[] = [];
  const strAllProducts: string | null = localStorage.getItem('allProducts');
  if (strAllProducts) {
    localStorageAllProducts = JSON.parse(strAllProducts);
  }
  
  const allProducts = useSelector(getAllProducts);
  
  const createRandomList = (arr:Product[]) => {
    const randomList: Product[] = [];
    for (let i = 0; i < arr.length; i += 1) {
      const randomNumber = Math.floor(Math.random() * arr.length);
      if(!(randomList.some(item => item.id === arr[randomNumber].id))) {
        randomList[i] = {
          ...arr[randomNumber],
        };
      }
    }
    return randomList;
  };

  let arrayForHandle: Product[] = allProducts;
  if (allProducts.length === 0) {
    arrayForHandle = localStorageAllProducts;
  }

  useEffect(() => {
    setforRender(createRandomList(arrayForHandle));
  }, []);

  return (
    <div className="maylike">
      <Slider 
       currentList={forRender}
       title={'You may also like'}
     />
    </div>
  );
};
