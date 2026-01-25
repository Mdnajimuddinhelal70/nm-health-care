import express from "express";
import { UserRole } from "prisma/src/generated/prisma/enums.js";
import auth from "src/app/middlewares/auth.js";
import { PrescriptionController } from "./prescription.controller.js";
const router = express.Router();

router.get(
    '/my-prescription',
    auth(UserRole.PATIENT),
    PrescriptionController.patientPrescription
)

router.post(
    "/",
    auth(UserRole.DOCTOR),
    PrescriptionController.createPrescription
);

export const PrescriptionRoutes = router;