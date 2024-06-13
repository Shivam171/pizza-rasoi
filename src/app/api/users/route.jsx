import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL)
  const users = await User.find()
  return Response.json(users);
}