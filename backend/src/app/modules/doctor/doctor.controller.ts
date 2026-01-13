import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import ApiError from "src/app/errors/ApiError.js";
import pick from "src/app/helper/pick.js";
import catchAsync from "src/app/shared/catchAsync.js";
import sendResponse from "src/app/shared/sendResponse.js";
import { doctorFilterableFields } from "./doctor.constant.js";
import { DoctorService } from "./doctor.service.js";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const fillters = pick(req.query, doctorFilterableFields);

  const result = await DoctorService.getAllFromDB(fillters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");
  }

  const result = await DoctorService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor updated successfully!",
    data: result,
  });
});

const getAISuggestions = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getAISuggestions(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AI suggestions fetched successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllFromDB,
  updateIntoDB,
  getAISuggestions,
};
