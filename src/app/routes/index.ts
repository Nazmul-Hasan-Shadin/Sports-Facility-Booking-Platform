import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { FacilityRoutes } from "../modules/facility/facility.route";
import { BookinsgsRoutes } from "../modules/booking/bookings.route";
import { userRoutes } from "../modules/user/user.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "",
    route: FacilityRoutes,
  },
  {
    path: "",
    route: BookinsgsRoutes,
  },
  {
    path: "",
    route: userRoutes,
  },
  {
    path: "",
    route: PaymentRoutes,
  },

  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
