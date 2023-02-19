import { ErrorHandler } from "../../config/http";
import { JWTCheck } from "../../utils/jwt";

const checkAuth = async (req, res, next) => {
  // await jwt
  //   .verify(token)
  //   .then((decoded) => {
  //     req.user = decoded;
  //     next();
  //   })
  //   .catch((err) => {
  //     next(new ErrorHandler(err.message, err.status));
  //   });
  // await JWTCheck(req)
  //   .then((decoded) => {
  //     req.user = decoded;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     next(new ErrorHandler(err.message, err.status));
  //   });
  try {
    const decoded = await JWTCheck(req);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ErrorHandler(err.message, err.status));
  }
};

export default checkAuth;
