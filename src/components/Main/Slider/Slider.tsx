import { IconButton } from '@mui/material';
import './Slider.scss';
import { useState } from 'react';
import { Card } from '../Card/Card';
import { Loader } from '../../Loader/Loader';
import { Product } from '../../../react-app-env';
import { getError } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import { CONSTS } from '../../../const/const';

type Props = {
  currentList: Product[],
  title: string,
  idKey?: string
}

export const Slider: React.FC<Props> = ({ currentList, title }) => {
  const errorMsg = useSelector(getError);
  const [position, setPosition] = useState(0);
  const [disablePrev, setdisablePrev] = useState(false);
  const [disableNext, setdisableNext] = useState(false);
  const widthOneCard = CONSTS.WIDTH_ONE_CARD;

  const getNext = () => {
    const moveon: number = position + +widthOneCard;

    setdisablePrev(false);

    if (position < +widthOneCard * (currentList.length - 1)) {
      setdisableNext(false);
      setPosition(moveon);
    } else {
      setdisableNext(true);
    }
  };

  const getPrev = () => {
    setdisableNext(false);
    if (position > 0) {
      const moveon: number = position - +widthOneCard;

      setdisablePrev(false);
      setPosition(moveon);
    } else {
      setdisablePrev(true);
    }
  };

  return (
    <div className="slider">
      {currentList.length === 0 && <Loader />}
      {errorMsg.length !== 0 && <p className="slider__error">{errorMsg}</p>}
      <div className="slider__box-title-button">
        <h1 className="slider__title">{title}</h1>
        <div className="slider__box-button">
          <IconButton
            disabled={disablePrev}
            sx={{
              padding: 0,
            }}
            onClick={getPrev}
          >
            <div className="slider__rectangle">
              <div className="slider__arrow-left" />
            </div>
          </IconButton>
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            disabled={disableNext}
            onClick={getNext}
          >
            <div className="slider__rectangle">
              <div className="slider__arrow-right" />
            </div>
          </IconButton>
        </div>
      </div>

      <div className="slider__box-list">
        <ul
          className="slider__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {currentList.map(item => (
            <li
              key={item.id}
              className="slider__list-item"
            >
              <Card
                age={item.age}
                id={item.id}
                type={item.type}
                imageUrl={item.imageUrl}
                name={item.name}
                snippet={item.snippet}
                price={item.price}
                discount={item.discount}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

