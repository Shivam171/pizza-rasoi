import { MenuItems } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json();
  const menuItemDoc = await MenuItems.create(data);
  return Response.json(menuItemDoc)
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL)
  return Response.json(
    await MenuItems.find()
  )
}