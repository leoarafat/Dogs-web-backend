import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
import { UserController } from '../user/user.controller';
import { AdminController } from '../admin/admin.controller';

const router = express.Router();
//!User
router.post('/register', UserController.registrationUser);
router.post('/activate-user', UserController.activateUser);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);
router.delete('/delete-account', UserController.deleteMyAccount);
router.patch(
  '/change-password',
  auth(ENUM_USER_ROLE.USER),
  UserController.changePassword,
);
router.post('/forgot-password', UserController.forgotPass);
router.post('/reset-password', UserController.resetPassword);
router.get(
  '/admin/users',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
//!IDS Work
router.get(
  '/profile/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser,
);
router.patch(
  '/edit-profile/:id',
  auth(ENUM_USER_ROLE.USER),
  uploadFile(),
  UserController.updateProfile,
);

//! Admin Authentication Start
router.post('/admin/register', AdminController.registrationUser);
router.post('/admin/login', AdminController.login);
router.post('/admin/refresh-token', AdminController.refreshToken);
router.post('/admin/forgot-password', AdminController.forgotPass);
router.post('/admin/reset-password', AdminController.resetPassword);
router.patch(
  '/admin/change-password',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.changePassword,
);
router.post(
  '/admin/add-admin',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.registrationUser,
);
//! Admin Authentication End

router.get(
  '/admin/users',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/admin/admins',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmin,
);
router.post(
  '/admin/add-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createUser,
);

//! Admin Update
router.patch(
  '/admin/edit-profile/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  uploadFile(),
  AdminController.updateAdmin,
);
router.get(
  '/admin/me/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.myProfile,
);

export const AuthRoutes = router;
