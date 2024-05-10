// promise
const getMoviesPromise = () => {
  fetch("https://yts.am/api/v2/list_movies.json")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
};

// async, await은 promise를 더 간단하게 사용할 수 있게 해줌
// async 함수는 항상 promise를 반환
// await는 async 함수 내에서만 사용 가능
// await는 promise가 처리될 때까지 기다림
const getMoviesAsync = async () => {
  try {
    const response = await fetch("https://yts.am/api/v2/list_movies.json");
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
};

const getMovies = async () => {
  try {
    const [moviesResponse, upcomingResponse] = await Promise.all([
      fetch("https://yts.mx/api/v2/list_movies.json"),
      fetch("https://yts.mx/api/v2/movie_suggestions.json?movie_id=100"),
    ]);
    const [movies, upcoming] = await Promise.all([moviesResponse.json(), upcomingResponse.json()]);
    console.log(movies, upcoming);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
};

getMovies();
