import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ScheduleRoutes } from "../modules/schedule/schedule.route.js";
import { UserRouter } from "../modules/user/user.route.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: ScheduleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
