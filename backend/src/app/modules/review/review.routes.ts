import express from "express";

import { UserRole } from "generated/prisma/enums.js";
import auth from "src/app/middlewares/auth.js";
import { ReviewController } from "./review.controller.js";

const router = express.Router();

router.get("/", ReviewController.getAllFromDB);

router.post("/", auth(UserRole.PATIENT), ReviewController.insertIntoDB);

export const ReviewRoutes = router;
