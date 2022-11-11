import {movieActionTypes} from './movieTypes';

const ID_URL = 'http://47.254.174.28/movie/order/byPopularity/?page_size=20';

export const fetchPopularMovies = () => {
  try {
    return async dispatch => {
      const result = await fetch(ID_URL);
      const data = await result.json();
      if (data) {
        //console.log(data);
        const popular = [];
        for (var index = 0; index < data.results.length; index++) {
          //const dt = [];
          const MOVI_URL =
            'http://47.254.174.28/movie/id/' +
            data.results[index].imdb_id +
            '/';
          const mov = await fetch(MOVI_URL);
          const dt = await mov.json();
          await fetch(MOVI_URL)
            .then(responseNEW => responseNEW.json())
            .then(jsonNew => {
              popular.push(jsonNew.results);
            })
            .catch(error => console.error(error));

          dispatch({
            type: movieActionTypes.FETCH_POP_MOV,
            payload: popular,
          });
          //console.log(popular);
          //console.log(dt);
        }
      } else {
        console.log('unable to fetch');
      }
    };
  } catch (error) {
    console.log('error');
  }
};
