import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { messageController } from './message.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = express.Router();

router.post(
  '/send-message/:id', //here id is receiver id
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  messageController.sendMessage,
);

router.get(
  '/get-message/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  messageController.getMessages,
);

export const MessageRoutes = router;
