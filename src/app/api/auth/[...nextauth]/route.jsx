import { User } from "@/app/models/User";
import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const { email, password } = credentials;
        try {
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ email });
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          if (passwordOk) {
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization failed');
        }
      }
    })
  ],
}

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };

