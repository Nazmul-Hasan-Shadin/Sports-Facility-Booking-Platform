import catchAsync from "../../utils/catchAsync";
import sendResoponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const getUserByEmail = catchAsync(async (req, res) => {
  const result = await UserServices.getUserFromDb(req.query.email);

  sendResoponse(res, {
    success: true,
    statusCode: 200,
    message: "User Info Retrieved succesfully",
    data: result,
  });
});


export const UserController= {
    getUserByEmail
}