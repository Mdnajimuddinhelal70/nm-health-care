import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/prisma.js";

const insertIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;

  const intervalTime = 30; // 30 minutes
  const schedules: any[] = [];

  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    // base date (yyyy-mm-dd)
    const baseDate = new Date(format(currentDate, "yyyy-MM-dd"));

    // start datetime
    let startDateTime = addMinutes(
      addHours(baseDate, Number(startTime.split(":")[0])),
      Number(startTime.split(":")[1])
    );

    // end datetime
    const endDateTime = addMinutes(
      addHours(baseDate, Number(endTime.split(":")[0])),
      Number(endTime.split(":")[1])
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

export const ScheduleService = {
  insertIntoDB,
};
