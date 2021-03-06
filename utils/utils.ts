import { QueryMethod } from "apicalypse";
import { Method, ResponseType } from "axios";
import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) =>
  jwt.sign({ email: email }, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

export const getRequestOptionsIgdb = () => {
  const queryMethod: QueryMethod = "body";
  const method: Method = "POST";
  const responseType: ResponseType = "json";
  
  return {
    queryMethod: queryMethod,
    method: method,
    baseURL: "https://api.igdb.com/v4",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Client-ID": process.env.IGDB_ID_CLIENT,
    },
    responseType: responseType,
    timeout: 5000, // 1 second timeout
  };
};

export const TMDB_API_URL_SEARCH = "https://api.themoviedb.org/3/search/tv";
export const TMDB_API_URL_DETAIL = "https://api.themoviedb.org/3/tv";
export const TMDB_API_KEY = "956d7dc345cd57355f1cc763bac32ada";
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
