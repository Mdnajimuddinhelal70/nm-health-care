import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import ApiError from "src/app/errors/ApiError.js";
import pick from "src/app/helper/pick.js";
import catchAsync from "src/app/shared/catchAsync.js";
import sendResponse from "src/app/shared/sendResponse.js";
import type { IJWTPayload } from "src/app/types/common.js";
import { patientFilterableFields } from "./patient.constant.js";
import { PatientService } from "./patient.service.js";


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, patientFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await PatientService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
       if(!id){
        throw new ApiError(httpStatus.UNAUTHORIZED, "Id not found")
    }
    const result = await PatientService.getByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient retrieval successfully',
        data: result,
    });
});

const softDelete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id){
        throw new ApiError(httpStatus.UNAUTHORIZED, "Id not found")
    }
    const result = await PatientService.softDelete(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient soft deleted successfully',
        data: result,
    });
});

const updateIntoDB = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await PatientService.updateIntoDB(user as IJWTPayload, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient updated successfully',
        data: result,
    });
});

export const PatientController = {
    getAllFromDB,
    getByIdFromDB,
    softDelete,
    updateIntoDB
};