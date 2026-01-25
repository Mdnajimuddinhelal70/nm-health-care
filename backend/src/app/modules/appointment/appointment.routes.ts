import { UserRole } from "@prisma/index.js";
import express from "express";
import auth from "src/app/middlewares/auth.js";
import { AppointmentController } from "./appointment.controller.js";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), AppointmentController.getAllFromDB);

router.get(
  "/my-appointments",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment,
);

router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentController.createAppointment,
);

router.patch(
  "/status/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.updateAppointmentStatus,
);

export const AppointmentRoutes = router;
