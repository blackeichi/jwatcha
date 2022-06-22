const API_KEY = "4bc5f53a3e7b9a35ef5fbd55f9f2b964";
const BASE_PATH = "https://api.themoviedb.org/3";

export function makeImg(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export interface IGetResult {
  page: number;
  results: [
    {
      poster_path: string;
      popularity: number;
      id: number;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      first_air_date: string;
      name: string;
    }
  ];
}

export function getPopularTv(genre?: string) {
  return fetch(
    `${BASE_PATH}/tv/${genre}?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export function getPopularMovie(genre?: string) {
  return fetch(
    `${BASE_PATH}/movie/${genre}?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export function getTrending() {
  return fetch(`${BASE_PATH}/trending/all/day?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
