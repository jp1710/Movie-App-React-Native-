import {
  upcomingMovieReducer,
  popularMovieReducer,
  upcomingMovieListReducer,
  popularMovieListReducer,
} from './movie/movieReducer';
import {
  popularTvListReducer,
  popularTvReducer,
  upcomingTvListReducer,
  upcomingTvReducer,
} from './tv/tvReducer';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FavReducer} from './profile/FavReducer';
import {userReducer} from './profile/userReducer';
import {likeReducer} from './profile/like';

export const rootReducer = combineReducers({
  upcomemovie: upcomingMovieReducer,
  popmovie: popularMovieReducer,
  upcomingTv: upcomingTvReducer,
  popTv: popularTvReducer,
  newListMovie: upcomingMovieListReducer,
  popListMovie: popularMovieListReducer,
  newListTv: upcomingTvListReducer,
  popListTv: popularTvListReducer,
  favsList: FavReducer,
  userName: userReducer,
  likes: likeReducer,

  //tv: tvReducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
