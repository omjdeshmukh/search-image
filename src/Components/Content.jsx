import React, { useRef, useCallback, useContext } from "react";
import useFetchApi from "./Custom/customFetchHook";
import { AppState } from "../App";
import Model from "./model";

function Content() {
  const [loading, responce, error] = useFetchApi();

  const { appState, setAppState } = useContext(AppState);

  const { selectedImageUrl, selectedImageTitle, show } = appState;

  const observer = useRef();

  const handleClick = (item) => {
    console.log(item);
    setAppState((prevState) => {
      return {
        ...prevState,
        selectedImageUrl: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
        selectedImageTitle: item.title,
        show: true,
      };
    });
  };

  const lastElement = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAppState((prevState) => {
            return {
              ...prevState,
              page: prevState.page + 1,
              perpage: prevState.perpage + 20,
            };
          });
        }
      },
      [loading]
    );

    if (node) observer.current.observe(node);
  });

  if (error) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    );
  }

  return (
    <>
      <main className="content">
        {responce &&
          responce.photo.map((item, index) => {
            const { title, id, server, secret } = item;

            if (responce.photo.length === index + 1) {
              return (
                <>
                  <figure
                    onClick={() => handleClick(item)}
                    key={id}
                    ref={lastElement}
                    className="content-image-container"
                  >
                    <img
                      src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
                      alt={title}
                      className="content-image"
                    />
                    <figcaption>{title}</figcaption>
                  </figure>
                </>
              );
            } else {
              return (
                <>
                  <figure
                    onClick={() => handleClick(item)}
                    key={id}
                    className="content-image-container"
                  >
                    <img
                      src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
                      alt={title}
                      className="content-image"
                    />
                    <figcaption>{title}</figcaption>
                  </figure>
                </>
              );
            }
          })}
      </main>
      <Model img={selectedImageUrl} title={selectedImageTitle} show={show} />
    </>
  );
}

export default Content;

//Changes
