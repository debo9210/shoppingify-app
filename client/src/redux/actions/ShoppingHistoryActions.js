import axios from 'axios';
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

export const getShoppingHistory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOPPING_HISTORY_REQUEST });

    const { data } = await axios.get('/api/shoppingHistory');

    dispatch({
      type: GET_SHOPPING_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SHOPPING_HISTORY_FAIL,
      payload: error.response.data,
    });
  }
};

export const createShoppingHistory = (historyData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SHOPPING_HISTORY_REQUEST });

    const { data } = await axios.post('/api/shoppingHistory', historyData);

    dispatch({
      type: CREATE_SHOPPING_HISTORY_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SHOPPING_HISTORY_FAIL,
      payload: error.response.data,
    });
  }
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: CREATE_SHOPPING_HISTORY_FAIL,
    payload: {},
  });
};

export const clearSuccess = () => (dispatch) => {
  dispatch({
    type: CREATE_SHOPPING_HISTORY_SUCCESS,
    success: false,
  });
};

export const updateShoppingStatus = (id, status, listName) => async (
  dispatch
) => {
  try {
    dispatch({ type: UPDATE_SHOPPING_STATUS_REQUEST });

    if (id) {
      await axios.post(
        `/api/shoppingHistory/update-status/${status}/${id}/${listName}`
      );
    }

    dispatch({
      type: UPDATE_SHOPPING_STATUS_SUCCESS,
      payload: status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHOPPING_STATUS_FAIL,
      error: error.response.data,
    });
  }
};
