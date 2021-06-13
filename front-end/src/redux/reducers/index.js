import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { productListReducers } from './productReducers';

export default combineReducers({
  productList: productListReducers,
  cart: cartReducer
});
