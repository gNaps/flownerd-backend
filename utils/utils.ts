import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) =>
  jwt.sign({ email: email }, process.env.TOKEN_SECRET!, { expiresIn: "1800s" });

export const getRequestOptionsIgdb = () => {
  return {
    queryMethod: "body",
    method: "post", // The default is `get`
    baseURL: "https://api.igdb.com/v4",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Client-ID": process.env.IGDB_ID_CLIENT,
    },
    responseType: "json",
    timeout: 5000, // 1 second timeout
  };
};
