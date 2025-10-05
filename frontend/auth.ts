import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import * as jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "./lib/password-utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "이메일 입력" },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호 입력",
        },
      },

      async authorize(credentials) {
        // 1. 이메일과 비밀번호가 입력되었는지 확인
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        // 2. DB에서 유저를 찾기
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // 3. 유저가 존재하지 않으면 에러 발생
        if (!user) {
          throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        // 4. 비밀번호가 일치하는지 확인
        const passwordMatch = comparePassword(
          credentials.password as string,
          user.hashedPassword as string
        );
        if (!passwordMatch) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    encode: async ({ secret, token }) => {
      return jwt.sign(token as jwt.JwtPayload, secret as string);
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token as string, secret as string) as JWT;
    },
  },
  pages: {},
  callbacks: {},
});
