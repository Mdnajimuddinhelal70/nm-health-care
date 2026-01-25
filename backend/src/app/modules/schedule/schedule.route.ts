import express from "express";

import { UserRole } from "@prisma/index.js";
import auth from "src/app/middlewares/auth.js";
import { ScheduleController } from "./schedule.controller.js";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.DOCTOR),
  ScheduleController.schedulesForDoctor,
);

router.post("/", ScheduleController.insertIntoDB);

router.delete("/:id", ScheduleController.deleteScheduleFromDB);

export const ScheduleRoutes = router;
