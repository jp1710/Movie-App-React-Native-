import {USER_DP, USER_NAME} from './userTypes';
const initialState = {
  user: [],
  dp: [],
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME:
      return {
        user: [state.user, action.payload],
      };
    case USER_DP:
      return {
        dp: [state.dp, action.payload],
      };
    default:
      return state;
  }
};
