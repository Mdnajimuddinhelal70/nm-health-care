import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { UserRole } from "generated/prisma/enums.js";
import { fileUploader } from "src/app/helper/fileUploader.js";
import auth from "src/app/middlewares/auth.js";
import { SpecialtiesController } from "./specialties.controller.js";
import { SpecialtiesValidtaion } from "./specialties.validation.js";

const router = express.Router();

router.get("/", SpecialtiesController.getAllFromDB);

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data));
    return SpecialtiesController.inserIntoDB(req, res, next);
  }
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  SpecialtiesController.deleteFromDB
);

export const SpecialtiesRoutes = router;
