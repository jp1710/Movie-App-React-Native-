import {tvActionTypes} from './tvTypes';

const ID_URL = 'http://47.254.174.28/series/byYear/2021/?page_size=12';

export const fetchNewListTv = () => {
  try {
    return async dispatch => {
      const result = await fetch(ID_URL);
      const data = await result.json();
      if (data) {
        // console.log(data);
        const upcoming = [];
        for (var index = 0; index < data.results.length; index++) {
          //const dt = [];
          const MOVI_URL =
            'http://47.254.174.28/series/id/' +
            data.results[index].imdb_id +
            '/';
          const mov = await fetch(MOVI_URL);
          const dt = await mov.json();
          await fetch(MOVI_URL)
            .then(responseNEW => responseNEW.json())
            .then(jsonNew => {
              upcoming.push(jsonNew.results);
            })
            .catch(error => console.error(error));

          dispatch({
            type: tvActionTypes.FETCH_UPCOMING_LIST,
            payload: upcoming,
          });
          // console.log(upcoming);
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
