import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const { _id, name, image, admin, ...otherUserInfo } = data;

    let filter = {};
    if (_id) {
      filter = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session.user.email;
      filter = { email };
    }
    const user = await User.findOne(filter);
    await User.updateOne(filter, { name, image, admin });
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });
    return NextResponse.json(true);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    let filterUser = {}
    if (_id) {
      filterUser = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return NextResponse.json({});
      }
      filterUser = { email };
    }
    const user = await User.findOne(filterUser).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return NextResponse.json({ ...user, ...userInfo });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
