import { Schema } from "mongoose";

const MenuItemsSchema = new Schema({
  image: { type: String, required: false },
  name: { type: String },
  description: { type: String },
  basePrice: { type: Number },
}, { timestamps: true })

export const MenuItems = models?.MenuItems || model('MenuItems', MenuItemsSchema)