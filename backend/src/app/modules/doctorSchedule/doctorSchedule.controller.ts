import type { Request, Response } from "express";
import catchAsync from "src/app/shared/catchAsync.js";
import sendResponse from "src/app/shared/sendResponse.js";
import type { IJWTPayload } from "src/app/types/common.js";
import { DoctorScheduleService } from "./doctorSchedule.service.js";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  insertIntoDB,
};
