import { useEffect, useState } from "react";
import { Loader } from "../../components";
import "./gallery.css";

export default function Gallery() {
  const dataDefault = {
    page: "",
    per_page: "",
    total_results: "",
    photos: [],
  };
  const [data, setData] = useState(dataDefault);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("cars");
  const [loading, setLoading] = useState(false);

  const topics = [
    "ocean",
    "coding",
    "cars",
    "soccer",
    "dogs",
    "cats",
    "people",
    "basketball",
    "roads",
  ];

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${topic}&page=${page}&per_page=40&orientation=landscape&size=large`,
          {
            method: "GET",
            // mode: "no-cors",
            credentials: "same-origin",
            referrerPolicy: "no-referrer",
            headers: {
              Accept: "application/json",
              // "Access-Control-Allow-Origin": "*",
              Authorization: process.env.REACT_APP_PEXELS_API,
            },
          },
        );
        const jsonData = await response.json();
        return jsonData;
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };

    getData()
      .then((datos) => {
        // console.log(datos);
        setData(datos ? datos : dataDefault);
        setLoading(false);
      })
      .catch((err) => console.error(err.stack));
  }, [page, topic]);

  const pageChange = (e) => {
    const btn_target = e.target.id;
    const maxPages = data.total_results / data.per_page;
    switch (btn_target) {
      case "start":
        setPage(1);
        break;
      case "previous":
        setPage(page - 1 === 0 ? 1 : page - 1);
        break;
      case "next":
        setPage(page + 1 > maxPages ? 1 : page + 1);
        break;
      case "end":
        setPage(maxPages);
        break;
      default:
    }
  };
  const changeTopic = (e) => {
    setTopic(e.target.value);
    setPage(1);
  };
  return (
    <div className="mainGalDiv">
      <h5>Gallery (coding in progress)</h5>
      <p>From Pexels API</p>
      {loading ? (
        <Loader />
      ) : (
        <>
          <p>Total: {data.total_results}</p>
          <p>
            <label htmlFor="topics">Topic:</label>
            <select name="topics" onChange={changeTopic} value={topic}>
              {topics.map((tp) => (
                <option key={tp} value={tp}>
                  {tp}
                </option>
              ))}
            </select>
            &nbsp; Page: {data.page} &nbsp; Per_page: {data.per_page}
          </p>
          <div className="pagination">
            <button
              className="btn btn-sm btn-info"
              onClick={pageChange}
              id="start"
            >
              Start
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={pageChange}
              id="previous"
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={pageChange}
              id="next"
            >
              Next
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={pageChange}
              id="end"
            >
              End
            </button>
          </div>
          <div className="divGallery">
            {data.photos.map((photo) => (
              <div key={photo.id} className="containerImage">
                <img
                  className="photo"
                  src={photo.src.small}
                  alt={`${photo.alt}`}
                  // onMouseEnter={imageHover}
                  // onMouseLeave={imageHoverOut}
                />
                <div className="photographer">
                  Photo by: {photo.photographer}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
