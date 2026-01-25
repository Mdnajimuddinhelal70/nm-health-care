import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import catchAsync from "src/app/shared/catchAsync.js";
import sendResponse from "src/app/shared/sendResponse.js";
import type { IJWTPayload } from "src/app/types/common.js";
import { MetaService } from "./meta.service.js";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await MetaService.fetchDashboardMetaData(
      user as IJWTPayload,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data retrival successfully!",
      data: result,
    });
  },
);

export const MetaController = {
  fetchDashboardMetaData,
};
