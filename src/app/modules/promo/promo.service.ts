/* eslint-disable @typescript-eslint/ban-ts-comment */
import ApiError from '../../../errors/ApiError';
import { IPromo, IPromoItem } from './promo.interface';
import { Promo } from './promo.model';

//! Admin Management Start
const addPromo = async (payload: IPromo) => {
  const checkIsExist = await Promo.findOne({ title: payload.title });
  if (checkIsExist) {
    throw new ApiError(404, 'Promo already exist');
  }
  const result = await Promo.create(payload);
  return result;
};

const addPromoByTitle = async (payload: IPromoItem) => {
  const promo = await Promo.findOne({
    _id: payload.promo_id,
  });
  if (!promo) {
    throw new ApiError(404, 'Promos Not Found');
  }

  //@ts-ignore
  promo.items.push({ title: payload.title });
  await promo.save();
  return promo;
};

const getPromos = async () => {
  //   console.log(id);
  const result = await Promo.find({});
  return result;
};

const updatePromosTitle = async (id: string, payload: any) => {
  try {
    const subs = await Promo.findOne({ _id: id });

    if (!subs) {
      throw new ApiError(404, 'Item not found');
    }

    const result = await Promo.findOneAndUpdate(
      { _id: id },
      { ...payload },
      { new: true, runValidators: true },
    );
    return result;
  } catch (error) {
    console.error(error);
    //@ts-ignore
    throw new Error(error?.message);
  }
};
const updatePromosItem = async (id: string, payload: any) => {
  try {
    const subs = await Promo.findOne({ 'items._id': id });

    if (!subs) {
      throw new ApiError(404, 'Item not found');
    }

    const result = await Promo.findOneAndUpdate(
      { 'items._id': id },
      { $set: { 'items.$.title': payload.title } },
      { new: true },
    );
    return result;
  } catch (error) {
    console.error(error);
    //@ts-ignore
    throw new Error(error?.message);
  }
};

const deletePromosTitle = async (id: string) => {
  try {
    const subs = await Promo.findOne({ 'promo_id._id': id });

    if (!subs) {
      throw new ApiError(404, 'Item not found');
    }

    await Promo.updateOne({ _id: subs._id }, { $pull: { items: { _id: id } } });
  } catch (error) {
    console.error(error);
  }
};
const deletePromos = async (id: string) => {
  const check = await Promo.findById(id);
  if (!check) {
    throw new ApiError(404, 'Promo not found');
  }
  return await Promo.findByIdAndDelete(id);
};

export const PromosPlanService = {
  addPromo,
  addPromoByTitle,
  deletePromosTitle,
  getPromos,
  deletePromos,
  updatePromosTitle,
  updatePromosItem,
};
