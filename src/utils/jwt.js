import jwt from "jsonwebtoken";
import config from "../config";
import { ErrorHandler } from "../config/http";

const { token } = config["jwt"];

const expTime = 3600; // Default 3600

async function generateToken(user) {
  try {
    return {
      token: jwt.sign({ user }, token, {
        algorithm: "HS256",
        expiresIn: expTime,
      }),
      expires_in: expTime,
    };
  } catch (err) {
    return err;
  }
}

async function verifyToken(userToken) {
  try {
    await jwt.verify(userToken, token);

    return true;
  } catch (err) {
    return false;
  }
}

async function getPayloadToken(userToken) {
  try {
    return await jwt.decode(userToken);
  } catch (err) {
    return err;
  }
}

async function JWTCheck(request) {
  try {
    const { authorization } = request.headers;

    if (!authorization) throw new ErrorHandler("Unauthenticated", 401);

    const userToken = authorization.split(" ")[1];

    if (!(await verifyToken(userToken)))
      throw new ErrorHandler("Unauthenticated", 401);

    return userToken;
  } catch (err) {
    throw new ErrorHandler(err.messae, err.status);
  }
}

export { generateToken, verifyToken, getPayloadToken, JWTCheck };
