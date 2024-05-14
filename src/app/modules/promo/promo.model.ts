import { Schema, model } from 'mongoose';
import { IPromo, IPromoItem } from './promo.interface';

const promoSchema = new Schema<IPromo>(
  {
    title: {
      type: String,
      required: true,
    },
    items: [
      {
        title: {
          type: String,
        },
      },
    ],

    status: {
      type: Boolean,
      default: true,
    },

    promo_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const promoItemSchema = new Schema<IPromoItem>(
  {
    promo_id: {
      type: Schema.Types.ObjectId,
      ref: 'Promo',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Promo = model<IPromo>('Promo', promoSchema);
export const PromoItem = model<IPromoItem>('PromoItem', promoItemSchema);
