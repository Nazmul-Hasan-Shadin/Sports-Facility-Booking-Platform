import catchAsync from "../../utils/catchAsync";
import sendResoponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const getUserByEmail = catchAsync(async (req, res) => {
  const email=req.query.email as string
  const result = await UserServices.getUserFromDb(email);

  sendResoponse(res, {
    success: true,
    statusCode: 200,
    message: "User Info Retrieved succesfully",
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDb(req.body);

  sendResoponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin Created Successful",
    data: result,
  });
});

export const UserController= {
    getUserByEmail,
    createAdmin
}