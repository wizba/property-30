import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks:{
    // invoked on successful signin
    async signIn({profile}){
        // 1. connect to database
        // 2. Check if user exist
        // 3. If not, then add user to database
        // 4. Return true to allow sign in
    },
    // Modifies the session object
    async session({session}){
        // Get user from database
        // Assign the user id to session
        // return session
    }
  }
};
