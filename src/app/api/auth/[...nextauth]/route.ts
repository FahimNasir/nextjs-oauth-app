import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "test@yahoo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3001/api/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: credentials?.email,
            password: credentials?.password,
          }),
        });
        const result = await res.json();
        console.log(result);
        if (result && result.isError === false) {
          return {
            name: result.data.fullName,
            email: result.data.emailAddress,
            id: "123",
            message: result.message,
            success: true,
          };
        } else {
          return {
            name: "",
            email: "",
            id: "",
            message: result.message,
            success: false,
          };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
