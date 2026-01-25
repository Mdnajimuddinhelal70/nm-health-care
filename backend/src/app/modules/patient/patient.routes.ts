import express from "express";
import { UserRole } from "prisma/src/@prisma/index.js";
import auth from "src/app/middlewares/auth.js";
import { PatientController } from "./patient.controller.js";

const router = express.Router();

router.get("/", PatientController.getAllFromDB);

router.get("/:id", PatientController.getByIdFromDB);

router.patch("/", auth(UserRole.PATIENT), PatientController.updateIntoDB);

router.delete("/soft/:id", PatientController.softDelete);

export const PatientRoutes = router;
