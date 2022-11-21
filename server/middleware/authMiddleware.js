import jsonwebtoken from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader :>> ", authHeader);
  const jwt = authHeader && authHeader.split(" ")[1];
  if (jwt == null) return res.status(401).json("No token in request");

  jsonwebtoken.verify(jwt, process.env.SECRET_KEY, (err, payload) => {
    console.log(err);
    if (err) return res.status(403).json("Invalid token!");
    req.payload = payload;
    next();
  });
};

export default authMiddleware;
