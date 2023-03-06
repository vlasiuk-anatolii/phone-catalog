/* eslint-disable react-hooks/exhaustive-deps */
import './Search.scss';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { setCurrentProductsForRender, setQuery } from '../../store/actions';
import { getQuery } from '../../store/selectors';
import { Product } from '../../react-app-env';

export const Search: React.FC = () => {
  const query = useSelector(getQuery);
  const dispatch = useDispatch();
  
  const visibleSearch = window.location.hash;
  const allProducts = localStorage.getItem('allProducts');
  const parsedProducts: Product[] = typeof allProducts === 'string' ? JSON.parse(allProducts) : null;

  React.useEffect(() => {
    const keyDownHandler = (
      event: { key: string; preventDefault: () => void; },
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        const filtered: Product[] = parsedProducts.filter(item => item.name.includes(query) && visibleSearch.includes(item.type));
        dispatch(setCurrentProductsForRender(filtered));
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [dispatch, query]);
  
  return (
    <div className={
      ((/(phones$)/).test(visibleSearch)
      || (/(tablets$)/).test(visibleSearch)
      || (/(accessories$)/).test(visibleSearch)
      || (/(favorites$)/).test(visibleSearch))
        ? 'search'
        : 'search--none'
    }
    >
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: 327,
          height: 64,
          boxSizing: 'border-box',
          borderRadius: 0,
          borderBottom: '0px solid red',
          boxShadow: '-1px 0px 0px 0px #e2e6e9',
        }}
      >
        <InputBase
          sx={{
            ml: '24px',
            flex: 1,
            fontFamily: 'Mont-Regular, sans-serif',
            fontSize: '14px',
          }}
          placeholder={`Search in ${window.location.hash.replace(/(#\/)/, '')}`}
          className="search__input"
          value={query}
          onChange={(event) => {
            dispatch(setQuery(event.target.value));
          }}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => {
            dispatch(setQuery(''));
          }}
        >
          <div className={query.length === 0
            ? 'search__lupa'
            : 'search__cross'}
          />
        </IconButton>
      </Paper>
    </div>
  );
};
