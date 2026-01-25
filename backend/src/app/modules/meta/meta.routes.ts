import express from "express";
import { UserRole } from "generated/prisma/enums.js";
import auth from "src/app/middlewares/auth.js";
import { MetaController } from "./meta.controller.js";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  MetaController.fetchDashboardMetaData,
);

export const MetaRoutes = router;
