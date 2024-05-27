import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema({
  email: { type: String, reuired: true },
  phone: { type: String },
  streetAddress: { type: String },
  postalCode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)