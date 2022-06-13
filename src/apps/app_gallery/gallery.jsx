import { useEffect, useState } from "react";

export default function Gallery() {
  const dataDefault = {
    page: "",
    per_page: "",
    total_results: "",
    photos: [],
  };
  const [data, setData] = useState(dataDefault);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api.pexels.com/v1/search?query=code&per_page=40",
          {
            method: "GET",
            // mode: "no-cors",
            // credentials: "same-origin",
            // referrerPolicy: "no-referrer",
            headers: {
              Accept: "application/json",
              Authorization: process.env.REACT_APP_PEXELS_API,
            },
          },
        );
        const jsonData = await response.json();
        return jsonData;
      } catch (e) {
        console.error(e);
      }
    };

    getData()
      .then((datos) => {
        console.log(datos);
        setData(datos ? datos : dataDefault);
      })
      .catch((err) => console.error(err.stack));
  }, []);
  return (
    <>
      <h5>Gallery (coding in progress)</h5>
      <p>Total: {data.total_results}</p>
      <p>
        Page: {data.page} &nbsp; Per_page: {data.per_page}
      </p>
      {data.photos.map((photo) => (
        <img key={photo.id} src={photo.src.small} alt={`${photo.alt}`} />
      ))}
    </>
  );
}
