import cookieParser from "cookie-parser";
import cors from "cors";
import type { Application, Request, Response } from "express";
import express from "express";
import * as cron from "node-cron";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import { AppointmentService } from "./app/modules/appointment/appointment.service.js";
import { PaymentController } from "./app/modules/payment/payment.controller.js";
import router from "./app/routes/index.js";
import config from "./config/index.js";
const app: Application = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent,
);
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    console.log("Node cron called at ", new Date());
    AppointmentService.cancelUnpaidAppointments();
  } catch (err) {
    console.error(err);
  }
});

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running..",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
