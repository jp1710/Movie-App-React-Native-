import {movieActionTypes} from './movieTypes';

const initialState = {
  upcoming: [],
  upcomingList: [],
  userId: [],
  // now: [],
  popular: [],
  popularList: [],
  moviesData: [],
  //searchedMovies: [],
};
export const upcomingMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieActionTypes.FETCH_UPCOMING_MOV:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        upcoming: action.payload,
      };
    default:
      return state;
  }
};
export const popularMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieActionTypes.FETCH_POP_MOV:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        popular: action.payload,
      };
    default:
      return state;
  }
};
export const upcomingMovieListReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieActionTypes.FETCH_UPCOMING_LIST:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        upcomingList: action.payload,
      };
    default:
      return state;
  }
};
export const popularMovieListReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieActionTypes.FETCH_POP_LIST:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        popularList: action.payload,
      };
    default:
      return state;
  }
};
