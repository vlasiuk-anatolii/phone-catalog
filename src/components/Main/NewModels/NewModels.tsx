import './NewModels.scss';
import { Product } from '../../../react-app-env';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../store/selectors';
import { Slider } from '../Slider/Slider';

export const NewModels = () => {
  const allList = useSelector(getAllProducts);
  const getNoDiscountProducts = (products: Product[]) => {
    const result = products.filter((item: { discount: number; }) => item.discount === 0);
    return result;
  }

  let currentList: Product[] = getNoDiscountProducts(allList);

  return (
    <div className="newmodels">
      <Slider 
       currentList={currentList}
       title={'New models'}
     />
    </div>
  );
};
