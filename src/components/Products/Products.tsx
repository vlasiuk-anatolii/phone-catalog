/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { ProductsList } from '../Main/ProductsList/ProductsList';
import './Products.scss';
import { NotFound } from '../NotFound/NotFound';
import { Loader } from '../Loader/Loader';
import { getAllProducts, getError, getSortBy, getСurrentProductsForRender } from '../../store/selectors';
import { setCurrentProductsForRender, setSortBy } from '../../store/actions';
import { Product } from '../../react-app-env';

type Props = {
  kindProduct: string,
}

export const Products = ({ kindProduct }: Props) => {
  let localStorageAllProducts: Product[] = [];
  const strAllProducts: string | null = localStorage.getItem('allProducts');
  if (strAllProducts) {
    localStorageAllProducts = JSON.parse(strAllProducts);
  }
  
  const dispatch = useDispatch();
  const currentListForRender = useSelector(getСurrentProductsForRender);
  
  const sorting = (sortByWhat: string, arr: Product[]) => {
    switch (sortByWhat) {
      case 'age':
        return [...arr].sort((a, b) => a.age - b.age);
      case 'name':
        return [...arr].sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return [...arr].sort((a, b) => a.price - b.price);
      default:
        return arr;
    }
  };
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#313237',
      },
    },
    typography: {
      fontFamily: 'Mont-SemiBold, sans-serif',
      fontSize: 12,
    },
    shape: {
      borderRadius: 0,
    },
  });

  const [itemsPerPage, setItemsPerPage] = useState('16');
  const allProducts = useSelector(getAllProducts);
  const currentError = useSelector(getError);
  const sortBy = useSelector(getSortBy);
  
  const handleChangeSortBy = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as string));
  };

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value as string);
  };

  const navigate = useNavigate();
  let arrayForHandle: Product[] = allProducts;
  if (allProducts.length === 0) {
    arrayForHandle = localStorageAllProducts;
  }

  useEffect(() => {
    const result = arrayForHandle.filter((item: { type: string; }) => item.type === `${kindProduct}`);
    dispatch(setCurrentProductsForRender(sorting(sortBy, result)));
   }, [allProducts, dispatch, kindProduct, sortBy]);

  return (
    <div className="product">
      <Header />
      <div className="product__container">
        <div className="product__box-img-home-arrow">
          <IconButton
            color="inherit"
            sx={{
              padding: '0',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <div
              className="product__img-home"
            />
          </IconButton>

          <div className="product__arrow" />
          <div className="product__name-page">{`${kindProduct}`.replace(/(^\w)/, '$1'.toUpperCase())}</div>
        </div>
        <h1 className="product__title">{`${kindProduct}`.replace(/(^\w)/, '$1'.toUpperCase())}</h1>
        <p className="product__count-models">
          { currentListForRender.length }
          {' '}
          models
        </p>
        <div className="product__box-selectors">
          <div className="product__sort-by">
            <label
              className="product__label-name"
              htmlFor="sort-by"
            >
              Sort by
            </label>
            <ThemeProvider theme={theme}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl>
                  <Select
                    sx={{
                      padding: '0',
                      outlineStyle: 'none',
                    }}
                    value={sortBy}
                    onChange={handleChangeSortBy}
                    displayEmpty
                    id="sort-by"
                    className="product__select"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="age">Newest</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Cheapest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ThemeProvider>
          </div>

          <div className="product__sort-by">
            <label
              className="product__label-name"
              htmlFor="items-on-page"
            >
              Items on page
            </label>
            <ThemeProvider theme={theme}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl>
                  <Select
                    sx={{
                      padding: '0',
                      outlineStyle: 'none',
                    }}
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                    displayEmpty
                    id="items-on-page"
                    className="product__select"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ThemeProvider>
          </div>
        </div>
      </div>
      {currentError.length !== 0 && <p className="product__error">{currentError}</p>}
      {!currentListForRender.length && <NotFound />}
      {currentListForRender.length === 0 && <Loader />}
      <div className="product__box-cards">
        <ProductsList
          currentListForRender={currentListForRender}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <Footer />
    </div>
  );
};
