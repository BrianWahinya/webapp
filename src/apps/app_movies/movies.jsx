import { useEffect, useState } from "react";
import "./movies.css";
export default function Movies() {
  const [year, setYear] = useState("2022");
  const [search, setSearch] = useState("");
  const [moviesData, setMoviesData] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const currentYear = new Date().getFullYear();
  const allYears = [];
  let i = 0;
  while (i !== 20) {
    allYears.push(currentYear - i);
    i++;
  }

  const dataFetch = () => {
    const movies_api_key = process.env.REACT_APP_MOVIE_API_KEY_v3;
    fetch(
      encodeURI(
        `https://api.themoviedb.org/3/discover/movie?page=${page}&primary_release_year=${year}&sort_by=vote_average.desc&api_key=${movies_api_key}`,
      ),
    )
      .then((data) => data.json())
      .then((jsondata) => {
        // console.log(jsondata);
        setLoading(false);
        setMoviesData(jsondata);
        // if (parseInt(jsondata.cod) >= 200 && parseInt(jsondata.cod) < 300) {
        //   setMoviesData([jsondata]);
        //   setErrors([]);
        // } else {
        //   setErrors(["Invalid Location: Enter a valid location"]);
        // }
        setSearch("");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(["An error occurred in loading the data"]);
      });
    // console.log("moviesdata", moviesData);
  };

  // Event listener
  const getMovies = (event) => {
    setMoviesData({});
    setErrors([]);
    // if (event.key === "Enter" || event.type === "click") {
    //   setLoading(true);
    //   switch (true) {
    //     case search === "":
    //       setErrors(["Please Enter a location"]);
    //       setLoading(false);
    //       break;
    //     default:
    //       dataFetch();
    //   }
    // }
    dataFetch();
  };

  const selectYear = (e) => {
    setYear(e.target.value);
  };

  const pageChange = (e) => {
    const btn_target = e.target.id;
    switch (btn_target) {
      case "start":
        setPage(1);
        break;
      case "previous":
        setPage(page - 1 === 0 ? 1 : page - 1);
        break;
      case "next":
        setPage(
          page + 1 < moviesData.total_pages && page + 1 < 500
            ? page + 1
            : moviesData.total_pages >= 500
            ? 500
            : moviesData.total_pages,
        );
        break;
      case "end":
        setPage(moviesData.total_pages >= 500 ? 500 : moviesData.total_pages);
        break;
    }
  };

  useEffect(() => {
    getMovies();
    // console.log("page", page);
    // console.log("moviesdata", moviesData);
  }, [year, page]);

  return (
    <>
      <h5>Movies App (Using TMDB API)</h5>
      {/* <input
        type="text"
        placeholder="Search Movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={getMovies}
      />
      <button onClick={getMovies}>Submit</button> */}
      <label htmlFor="year">Select Year: &nbsp;</label>
      <select name="year" id="yearMovie" onChange={selectYear} value={year}>
        {allYears.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      <br />
      <p>Total Results: {moviesData.total_results}</p>
      <p>
        Current Page: {moviesData.page}, Total Pages: {moviesData.total_pages}
      </p>
      <div className="pagination">
        <button onClick={pageChange} id="start">
          Start
        </button>
        <button onClick={pageChange} id="previous">
          Previous
        </button>
        <button onClick={pageChange} id="next">
          Next
        </button>
        <button onClick={pageChange} id="end">
          End
        </button>
      </div>
      <div className="moviesDiv">
        {moviesData.results
          ? moviesData.results.map((movie) => (
              <div key={movie.id} className="movie">
                <img
                  className="moviePoster"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                      : ""
                  }
                />
                <div>
                  <p className="movieTitle">
                    {movie.original_title && movie.original_title.length > 20
                      ? movie.original_title.slice(0, 40) + "..."
                      : movie.original_title}
                  </p>
                  <p className="movieReleaseDate">{movie.release_date}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
