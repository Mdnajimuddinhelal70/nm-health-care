import { UserRole } from "@prisma/index.js";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import auth from "src/app/middlewares/auth.js";
import { fileUploader } from "../../helper/fileUploader.js";
import { UserController } from "./user.controller.js";
import { UserValidation } from "./user.validation.js";

const router = express.Router();

router.get(
  "/",
  // auth(UserRole.ADMIN),
  UserController.getAllFromDB,
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("=== AFTER MULTER ===");
    console.log("FILE:", req.file);
    console.log("BODY (raw):", req.body);
    const parsedData = UserValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
      // JSON.parse(req.body.data)
    );

    req.body.patient = parsedData.patient;
    req.body.password = parsedData.password;

    console.log("BODY (final):", req.body);

    next();
  },
  UserController.createPatient,
);
router.post(
  "/create-admin",
  // auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createAdmin(req, res, next);
  },
);
router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.parse(req.body.data));
    req.body = UserValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createDoctor(req, res, next);
  },
);

export const UserRouter = router;
