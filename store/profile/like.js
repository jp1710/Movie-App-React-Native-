export const ADD_LIKE = 'ADD_LIKE';

export const addLike = payload => ({
  type: ADD_LIKE,
  payload,
});

// import { ADD_LIKE} from './FavTypes';
const initialState = {
  likes: 0,
};
export const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKE:
      return {
        likes: [state.likes + 1, action.payload],
      };

    default:
      return state;
  }
};
