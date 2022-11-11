import {tvActionTypes} from './tvTypes';

const initialState = {
  tvies: [],
  popularTvies: [],
  upcomingTvies: [],
  upcomingList: [],
  popularList: [],
};
export const upcomingTvReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvActionTypes.FETCH_UPCOMING_TV:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        upcomingTvies: action.payload,
      };
    default:
      return state;
  }
};
export const popularTvReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvActionTypes.FETCH_POP_TV:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        popularTvies: action.payload,
      };
    default:
      return state;
  }
};
export const upcomingTvListReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvActionTypes.FETCH_UPCOMING_LIST:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        upcomingList: action.payload,
      };
    default:
      return state;
  }
};
export const popularTvListReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvActionTypes.FETCH_POP_LIST:
      return {
        // upcoming: [...state.upcoming, action.payload],
        ...state,
        popularList: action.payload,
      };
    default:
      return state;
  }
};

// export const tvReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case tvActionTypes.SET_ALL_TV:
//       return {
//         ...state,
//         tvies: action.payload,
//       };

//     case tvActionTypes.SET_POPULAR_TV:
//       return {
//         ...state,
//         popularTvies: action.payload,
//       };
//     // case tvActionTypes.SET_NOW_TV:
//     //   return {
//     //     ...state,
//     //     nowTvies: action.payload,
//     //   };
//     default:
//       return state;
//   }
// };
