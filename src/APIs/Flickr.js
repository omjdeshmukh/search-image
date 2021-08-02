import axios from "axios";

export const Flickr = axios.create({
  baseURL: "https://www.flickr.com",
});
