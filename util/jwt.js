import jwt from "jsonwebtoken";

export const newToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWR_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWR_TOKEN_SECRET, (err, payload) => {
      if (err) reject(err)  ;
      resolve(payload);
    });
  });
