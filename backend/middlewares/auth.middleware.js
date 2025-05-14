import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import JWT from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    console.log(req.cookies, "skdjai");

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new ApiError(401, "Unauthorized Request"));
    }

    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return next(new ApiError(401, "Invalid Access Token"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, error?.message || "Invalid Access Token"));
  }
};
