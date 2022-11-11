import {tvActionTypes} from './tvTypes';
//https://data-imdb1.p.rapidapi.com/series/order/byPopularity/?page_size=10
const ID_URL =
  'http://47.254.174.28/series/order/byPopularity/?page_size=2-page_size=12';

export const fetchPopularTvies = () => {
  try {
    return async dispatch => {
      const result = await fetch(ID_URL);
      const data = await result.json();
      if (data) {
        // console.log(data);
        const popularTV = [];
        for (var index = 2; index < data.results.length; index++) {
          //const dt = [];
          const TV_URL =
            'http://47.254.174.28/series/id/' +
            data.results[index].imdb_id +
            '/';
          const mov = await fetch(TV_URL);
          const dt = await mov.json();
          await fetch(TV_URL)
            .then(responseNEW => responseNEW.json())
            .then(jsonNew => {
              popularTV.push(jsonNew.results);
            })
            .catch(error => console.error(error));

          dispatch({
            type: tvActionTypes.FETCH_POP_TV,
            payload: popularTV,
          });
          // console.log(popularTV);
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
