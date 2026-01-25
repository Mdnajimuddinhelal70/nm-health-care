import type { Prisma } from "@prisma/index.js";
import { addHours, addMinutes, format } from "date-fns";
import {
  paginationHelper,
  type IOptions,
} from "src/app/helper/paginationHelper.js";
import type { IJWTPayload } from "src/app/types/common.js";
import { prisma } from "../../shared/prisma.js";

const insertIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;

  const intervalTime = 30;
  const schedules: any[] = [];

  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    // base date (yyyy-mm-dd)
    const baseDate = new Date(format(currentDate, "yyyy-MM-dd"));

    // start datetime
    let startDateTime = addMinutes(
      addHours(baseDate, Number(startTime.split(":")[0])),
      Number(startTime.split(":")[1]),
    );

    // end datetime
    const endDateTime = addMinutes(
      addHours(baseDate, Number(endTime.split(":")[0])),
      Number(endTime.split(":")[1]),
    );

    // create 30 min slots
    while (startDateTime < endDateTime) {
      const slotStartDateTime = new Date(startDateTime);
      const slotEndDateTime = addMinutes(slotStartDateTime, intervalTime);

      if (slotEndDateTime > endDateTime) break;

      // check duplicate
      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: slotStartDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: {
            startDateTime: slotStartDateTime,
            endDateTime: slotEndDateTime,
          },
        });

        schedules.push(result);
      }

      // move to next slot
      startDateTime = addMinutes(startDateTime, intervalTime);
    }

    // next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const schedulesForDoctor = async (
  user: IJWTPayload,
  filters: any,
  options: IOptions,
) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } =
    filters;
  const andConditions: Prisma.ScheduleWhereInput[] = [];

  if (filterStartDateTime && filterEndDateTime) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: filterStartDateTime,
          },
        },
        {
          endDateTime: {
            lte: filterEndDateTime,
          },
        },
      ],
    });
  }
  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};
  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
    select: {
      scheduleId: true,
    },
  });
  const doctorScheduleIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId,
  );

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteScheduleFromDB = async (id: string) => {
  return await prisma.schedule.delete({
    where: {
      id,
    },
  });
};

export const ScheduleService = {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
