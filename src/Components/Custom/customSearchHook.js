import { useEffect, useContext } from "react";
import { Flickr } from "../../APIs/Flickr";
import { AppState } from "../../App";

const useSearchApi = () => {
  const {
    appState: { page, loading, responce, error, perpage, query },
    setAppState,
  } = useContext(AppState);

  useEffect(() => {
    setAppState((prevState) => {
      return { ...prevState, loading: true };
    });

    Flickr({
      method: "GET",
      url: "/services/rest/",
      params: {
        method: "method=flickr.photos.search",
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
  }, [page, query, perpage]);

  return [loading, responce, error];
};

export default useSearchApi;

// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=09d770a1c3e5e480517dff043f458023&tags=cats&per_page=20&page=1&format=json&nojsoncallback=1
