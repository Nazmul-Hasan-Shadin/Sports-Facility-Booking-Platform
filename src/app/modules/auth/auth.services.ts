import config from "../../config";
import { AppError } from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signUpInToDb = async (payload: TUser) => {
  payload.role = "user";
  const result = await User.create(payload);
  return result;
};

const loginIntoDB = async (payload: TLogin) => {
  const user = await User.isUserExistWithCustomId(payload.email);
  if (!user) {
    throw new AppError(404, "this user is not found");
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(400, "The user is Deleted!");
  }

  // comapre passssword now

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(400, "password donto matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.access_token as string, {
    expiresIn: "7d",
  });

  return {
    user,
    accessToken,
  };
};

export const AuthServices = {
  signUpInToDb,
  loginIntoDB,
};
