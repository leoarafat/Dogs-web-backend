import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { PostController } from './post.controller';
import { uploadFile } from '../../middlewares/fileUploader';

const router = express.Router();

router.post(
  '/add-post',
  auth(ENUM_USER_ROLE.USER),
  uploadFile(),
  PostController.createPost,
);
router.post(
  '/add-comment',
  auth(ENUM_USER_ROLE.USER),
  PostController.addComment,
);
router.get('/my-posts', auth(ENUM_USER_ROLE.USER), PostController.getMyPosts);
router.get(
  '/single-post/:id',
  auth(ENUM_USER_ROLE.USER),
  PostController.singlePost,
);
router.delete(
  '/delete-post/:id',
  auth(ENUM_USER_ROLE.USER),
  PostController.deletePost,
);
router.delete(
  '/delete-comment/:id',
  auth(ENUM_USER_ROLE.USER),
  PostController.deleteComment,
);
router.patch(
  '/edit-post/:id',
  auth(ENUM_USER_ROLE.USER),
  uploadFile(),
  PostController.updatePost,
);

export const PostRoutes = router;
