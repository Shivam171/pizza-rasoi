import { model, models, Schema } from "mongoose";

const MenuItemsSchema = new Schema({
  image: { type: String},
  name: { type: String },
  description: { type: String },
  basePrice: { type: Number },
}, { timestamps: true })

export const MenuItems = models?.MenuItems || model('MenuItems', MenuItemsSchema)