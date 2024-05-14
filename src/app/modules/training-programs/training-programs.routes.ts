import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { TrainingController } from './training-programs.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  TrainingController.insertIntoDB,
);
router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TrainingController.getTraining,
);
router.get(
  '/single/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TrainingController.getSingleTraining,
);
router.patch(
  '/update/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  TrainingController.updateTraining,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  TrainingController.deleteTraining,
);
export const TrainingRoutes = router;
