import {tvActionTypes} from './tvTypes';
//http://47.254.174.28/series/byYear/2021/
const ID_URL = 'http://47.254.174.28/series/byYear/2021/?page_size=10';

export const fetchUpcomingTvies = () => {
  try {
    return async dispatch => {
      const result = await fetch(ID_URL);
      const data = await result.json();
      if (data) {
        // console.log(data);
        const upcomingTV = [];
        for (var index = 0; index < data.results.length; index++) {
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
              upcomingTV.push(jsonNew.results);
            })
            .catch(error => console.error(error));

          dispatch({
            type: tvActionTypes.FETCH_UPCOMING_TV,
            payload: upcomingTV,
          });
          // console.log(upcomingTV);
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

// export const fetchMovieId = () => {
//   //   fetch("https://data-imdb1.p.rapidapi.com/movie/byYear/1982/?page_size=50", {
//   // 	"method": "GET",
//   // 	"headers": {
//   // 		"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
//   // 		"x-rapidapi-key": "2275144ed0msh7b9adee4e3f132ap143256jsncf5f8f9e72ba"
//   // 	}
//   // })
//   // .then(response => {
//   // 	response.json();
//   // })
//   // .then((json) => setMoviData(json.results))
//   // .catch(err => {
//   // 	console.error(err);
//   // });
// };

// export const fetchAllMovie = movies => {
//   return async dispatch => {
//     const movies = [];
//     const options1 = {
//       method: 'GET',
//       url: 'https://data-imdb1.p.rapidapi.com/movie/byYear/1982/',
//       params: {page_size: '10'},
//       headers: {
//         'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
//         'x-rapidapi-key': '2275144ed0msh7b9adee4e3f132ap143256jsncf5f8f9e72ba',
//       },
//     };

//     axios
//       .request(options1)
//       .then(function (response) {
//         console.log(response.data);
//         const userId = response.data.results;
//         dispatch(fetchAllMovieIdSuccess(userId));
//         movies.push(response.data.results);
//         console.log(movies);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//     const results = [];
//     for (let index = 0; index < movies.length; index++) {
//       const options2 = {
//         method: 'GET',
//         url: 'http://47.254.174.28/movie/id/' + movies[index].imdb_id + '/',
//         headers: {
//           'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
//           'x-rapidapi-key':
//             '2275144ed0msh7b9adee4e3f132ap143256jsncf5f8f9e72ba',
//         },
//       };
//       axios
//         .request(options2)
//         .then(function (response) {
//           results.push(response.data.results);
//         })
//         .catch(function (error) {
//           console.error(error);
//         });
//     }
//     // const response = await fetch(
//     //   'http://47.254.174.28/movie/id/' + movies.imdb_id + '/',
//     // );
//     const data = await response.json();
//     //let newMoviesData = setDummyPointAndIdToCards(data.movieData);
//     let moviesData = data.movieData;
//     //let datas = addExtraFeaturesToData(newMoviesData);
//     dispatch(fetchMovieSuccess(moviesData));
//     //dispatch(setPopularMovie(newMoviesData));
//   };
// };

// // export const setSearchedMovies = (movieName = '') => {
// //   return {
// //     type: movieActionTypes.SET_SEARCHED_MOVIES,
// //     payload: movieName,
// //   };
// // };

// import { tvActionTypes } from "./tvTypes";
// import {
//   addExtraFeaturesToData,
//   setDummyPointAndIdToCards,
//   setNowAndPopularCards,
// } from "../../helpers/commonFunctions";

// export const setTv = (payload) => {
//   return {
//     type: tvActionTypes.SET_ALL_TV,
//     payload,
//   };
// };

// export const setAllTv = (payload) => {
//   let newData = setDummyPointAndIdToCards(payload, "tv");
//   let datas = addExtraFeaturesToData(newData);

//   return (dispatch) => {
//     dispatch(setTv(datas));
//     dispatch(setPopularTv(datas));
//     dispatch(setNowTv(datas));
//   };
// };

// export const setPopularTv = (payload) => {
//   const [popular] = setNowAndPopularCards(payload);

//   return {
//     type: tvActionTypes.SET_POPULAR_TV,
//     payload: popular,
//   };
// };

// // export const setNowTv = (payload) => {
// //   const [, now] = setNowAndPopularCards(payload);

//   // return {
//   //   type: tvActionTypes.SET_NOW_TV,
//   //   payload: now,
//   // };
// //};
