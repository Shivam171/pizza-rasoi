import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
})

const MenuItemsSchema = new Schema({
  image: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId },
  basePrice: { type: Number },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientPrices: { type: [ExtraPriceSchema] },
}, { timestamps: true })

export const MenuItem = models?.MenuItems || model('MenuItems', MenuItemsSchema)