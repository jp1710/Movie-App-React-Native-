import {USER_DP, USER_NAME} from './userTypes';

export const userName = payload => ({
  type: USER_NAME,
  payload,
});
export const userDP = payload => ({
  type: USER_DP,
  payload,
});
