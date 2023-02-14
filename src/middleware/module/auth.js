import jwt from "../../utils/jwt";
import { ErrorHandler } from "../../config/http";

const checkAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1];
  if (!token) throw new ErrorHandler("Unauthorized", 401);

  await jwt
    .verify(token)
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch((err) => {
      next(new ErrorHandler(err.message, err.status));
    });
};

export default checkAuth;
