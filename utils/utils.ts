import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) =>
  jwt.sign({ email: email }, process.env.TOKEN_SECRET!, { expiresIn: "1800s" });
