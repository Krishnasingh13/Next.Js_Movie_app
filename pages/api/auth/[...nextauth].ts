import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "121163239087-80uh6j4rnhk506jijl8hialvosfrf5ab.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  callbacks: {
    async signIn({ profile }: any) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        const email = profile?.email;
        const firstName = profile?.given_name;
        const lastName = profile?.family_name;
        try {
          const apiUrl =
            process.env.NODE_ENV === "production"
              ? ` ${process.env.NEXT_PUBLIC_PROD}/api/add-user`
              : `${process.env.NEXT_PUBLIC_DEV}/api/add-user`;
          const res = await axios.post(apiUrl, {
            email,
            firstName,
            lastName,
          });
          console.log("User added successfully");
        } catch (error) {
          console.error("Error adding user:", error);
        }
        return true;
      } else {
        return false;
      }
    },
  },
});
