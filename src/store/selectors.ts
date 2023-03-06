// Selectors - a function receiving Redux state and returning some data from it
import { RootState } from '../react-app-env';

export const getFavoritesSelector = (state: RootState) => state.favorits;
export const getSelectedCartSelector = (state: RootState) => state.selectedcart;
export const getQuery = (state: RootState) => state.query;
export const getAllProducts = (state: RootState) => state.allProducts;
export const getСurrentProductsForRender = (state: RootState) => state.currentProductsForRender;
export const getError = (state: RootState) => state.error;
export const getSortBy = (state: RootState) => state.sortBy;

