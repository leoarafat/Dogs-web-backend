import express from 'express';
import { PostRoutes } from '../modules/posts/post.routes';
import { ManageRoutes } from '../modules/manage-web/manage.routes';
import { SubscriptionPlanRoutes } from '../modules/subscriptions-plan/subscriptions-plan.routes';
import { MessageRoutes } from '../modules/messages/message.routes';
import { SubscriptionRoutes } from '../modules/subscriptions/subscriptions.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { NotificationRoutes } from '../modules/notifications/notifications.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/manage',
    route: ManageRoutes,
  },
  {
    path: '/subscription-plan',
    route: SubscriptionPlanRoutes,
  },
  {
    path: '/subscriptions',
    route: SubscriptionRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
