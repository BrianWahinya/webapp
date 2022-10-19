import { useState } from "react";
import { CustomModal, FaIcon } from "../../components";
import "./css/movie.css";

const Movie = ({ movieInfo, moreInfo }) => {
  const {
    original_title: name,
    poster_path: imgsrc,
    backdrop_path: modalBgImg,
    overview: details,
    release_date: date,
  } = movieInfo;
  const [openModal, setOpenModal] = useState(false);
  const seeMore = () => setOpenModal(!openModal);
  const modalContentCss = {
    title: name,
    body: details,
    bodyStyle: {
      backgroundImage: `url("https://image.tmdb.org/t/p/w185${modalBgImg}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  };
  return (
    <div className="movieDiv" onClick={seeMore}>
      <img
        alt={name}
        className="movieImg"
        src={`https://image.tmdb.org/t/p/w185${imgsrc}`}
      />
      <div className="overlay">
        <FaIcon name="moreinfo" />
        <p className="moreInfo">{moreInfo}</p>
      </div>
      <p className="movieName">
        {name} <br /> <span className="movieDate">{date}</span>
      </p>
      <CustomModal
        openModal={openModal}
        seeMore={seeMore}
        modalContentCss={modalContentCss}
      />
    </div>
  );
};
export default Movie;
