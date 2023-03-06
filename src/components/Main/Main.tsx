import { useState } from 'react';
import { HotPrices } from './HotPrices/HotPrices';
import './Main.scss';
import { NewModels } from './NewModels/NewModels';
import { ShopCategory } from './ShopCategory/ShopCategory';
import { TopBanners } from './TopBanners/TopBanners';

export const Main: React.FC = () => {
  const [isNumberBanner, setIsNumberBanner] = useState(1);

  return (
    <div className="main">
      <TopBanners
        setIsNumberBanner={setIsNumberBanner}
      />
      <div className="main__small-bars">
        <div className={isNumberBanner === 1
          ? 'main__bar main__bar--isactive'
          : 'main__bar'}
        />
        <div className={isNumberBanner === 2
          ? 'main__bar main__bar--isactive'
          : 'main__bar'}
        />
        <div className={isNumberBanner === 3
          ? 'main__bar main__bar--isactive'
          : 'main__bar'}
        />
      </div>
      <HotPrices />
      <ShopCategory />
      <NewModels />
    </div>
  );
};
