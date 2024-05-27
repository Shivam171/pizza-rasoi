import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { name, image, ...otherUserInfo } = data;

  const session = await getServerSession(authOptions);
  const email = session.user.email;

  await User.updateOne({ email }, { name, image });

  await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }
  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  return Response.json({ ...user, ...userInfo })
}