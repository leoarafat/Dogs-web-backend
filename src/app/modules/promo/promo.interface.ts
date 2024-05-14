import { Types } from 'mongoose';

export type IPromo = {
  title: string;
  items: [];
  status: boolean;
  promo_code: string;
};
export type IPromoItem = {
  promo_id: Types.ObjectId | IPromo;
  title: string;
  status: boolean;
};
