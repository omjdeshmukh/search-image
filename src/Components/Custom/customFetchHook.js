import { useEffect, useContext } from "react";
import { Flickr } from "../../APIs/Flickr";
import { AppState } from "../../App";

const useFetchApi = () => {
  const {
    appState: { page, loading, responce, error, perpage, query },
    setAppState,
  } = useContext(AppState);

  useEffect(() => {
    setAppState((prevState) => {
      return { ...prevState, loading: true };
    });

    if (query != "") {
      console.log("query section");
      console.log(query);
      Flickr({
        method: "GET",
        url: "/services/rest/",
        params: {
          method: "flickr.photos.search",
          api_key: "09d770a1c3e5e480517dff043f458023",
          tags: query,
          per_page: perpage,
          page: page,
          format: "json",
          nojsoncallback: 1,
        },
      })
        .then((responce) =>
          setAppState((prevState) => {
            console.log(responce);
            return {
              ...prevState,
              responce: responce.data.photos,
              loading: false,
            };
          })
        )
        .catch((error) => {
          setAppState((prevState) => {
            return { ...prevState, [prevState.error]: error };
          });
        });
    } else {
      console.log("non query section");
      Flickr({
        method: "GET",
        url: "/services/rest/",
        params: {
          method: "flickr.photos.getRecent",
          api_key: "09d770a1c3e5e480517dff043f458023",
          per_page: perpage,
          page: page,
          format: "json",
          nojsoncallback: 1,
        },
      })
        .then((responce) =>
          setAppState((prevState) => {
            return {
              ...prevState,
              responce: responce.data.photos,
              loading: false,
            };
          })
        )
        .catch((error) => {
          setAppState((prevState) => {
            return { ...prevState, [prevState.error]: error };
          });
        });
    }
  }, [page, perpage, query]);

  return [loading, responce, error];
};

export default useFetchApi;
