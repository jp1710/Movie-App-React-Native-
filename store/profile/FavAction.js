import {ADD_FAV, DELETE_FAV} from './FavTypes';

export const addFav = payload => ({
  type: ADD_FAV,
  payload,
});
export const LOGOUT = 'LOGOUT';

export const clearCache = payload => ({
  type: LOGOUT,
  payload,
});
export const delFav = payload => ({
  type: DELETE_FAV,
  payload,
});
