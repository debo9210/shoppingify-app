import {
  CREATE_SHOPPING_HISTORY_FAIL,
  CREATE_SHOPPING_HISTORY_REQUEST,
  CREATE_SHOPPING_HISTORY_SUCCESS,
  GET_SHOPPING_HISTORY_FAIL,
  GET_SHOPPING_HISTORY_REQUEST,
  GET_SHOPPING_HISTORY_SUCCESS,
  UPDATE_SHOPPING_STATUS_FAIL,
  UPDATE_SHOPPING_STATUS_REQUEST,
  UPDATE_SHOPPING_STATUS_SUCCESS,
} from '../constants';

export const getShoppingHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHOPPING_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SHOPPING_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        history: action.payload,
      };
    case GET_SHOPPING_HISTORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createShoppingHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHOPPING_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SHOPPING_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.success,
        history: action.payload,
      };
    case CREATE_SHOPPING_HISTORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateShoppingStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SHOPPING_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SHOPPING_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    case UPDATE_SHOPPING_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
