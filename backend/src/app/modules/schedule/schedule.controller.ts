import type { Request, Response } from "express";
import pick from "src/app/helper/pick.js";
import type { IJWTPayload } from "src/app/types/common.js";
import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { ScheduleService } from "./schedule.service.js";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const schedulesForDoctor = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, ["startDateTime", "endDateTime"]);

    const user = req.user;
    const result = await ScheduleService.schedulesForDoctor(
      user as IJWTPayload,
      fillters,
      options
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ScheduleService.deleteScheduleFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully!",
    data: result,
  });
});

export const ScheduleController = {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
