import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getCategoryReducer,
  createCategoryReducer,
} from './redux/reducers/CategoryReducer';
import {
  getShoppingHistoryReducer,
  createShoppingHistoryReducer,
  updateShoppingStatusReducer,
} from './redux/reducers/ShoppingHistoryReducer';

const initialState = {};

const reducers = combineReducers({
  categories: getCategoryReducer,
  createCategories: createCategoryReducer,
  shoppingHistory: getShoppingHistoryReducer,
  createShoppingHistory: createShoppingHistoryReducer,
  updateShoppingStatus: updateShoppingStatusReducer,
});

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, devTools);

export default store;
