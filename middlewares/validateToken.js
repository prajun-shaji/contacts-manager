import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // CHECKING AUTHORIZATION
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Unauthorized User" });
  }
  const token = authHeader.split(" ")[1];
  // VERIFY TOKEN
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized User" });
    }
    // TOKEN EXPIRED?
    if (decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ error: "Token expired" });
    }
    // ATTACH USER
    req.user = decoded.user;
    next();
  });
});

export default validateToken;
