import {LOGOUT} from './FavAction';
import {ADD_FAV, DELETE_FAV} from './FavTypes';
const initialState = {
  favs: [],
};
export const FavReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        favs: [...state.favs, action.payload],
      };
    case LOGOUT:
      return {
        favs: [],
      };
    case DELETE_FAV:
      return {
        //...state,

        favs: handleDeleteFav(action.payload, state.favs),
      };

    default:
      return state;
  }
};
const handleDeleteFav = (item, favs) => {
  const favIndex = favs.indexOf(item);
  favs.splice(favIndex, 1);
  return favs;
};
