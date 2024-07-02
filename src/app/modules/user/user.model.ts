import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
export const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    isDeleted: {
      type: Boolean,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// check is passwrd is correct or not

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.isUserExistWithCustomId = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isJwtIssuedBefofunctionrePasswordChanged = async function (
  passwordChangeTime: Date,
  jwtIssuedTime: number
) {
  const passwordChangedTime = new Date(passwordChangeTime).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTime;
};
export const User = model<TUser, UserModel>("User", userSchema);
