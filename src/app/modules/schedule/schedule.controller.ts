import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ScheduleService } from './schedule.service';
import sendResponse from '../../../shared/sendResponse';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule add successful',
    data: result,
  });
});
const allSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.allSchedule();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule retrieved successful',
    data: result,
  });
});
const mySchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.mySchedule(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule retrieved successful',
    data: result,
  });
});

export const ScheduleController = { insertIntoDB, mySchedule, allSchedule };
