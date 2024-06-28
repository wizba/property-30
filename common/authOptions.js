import connectDB from "@/config/database";
import User from "@/models/User";
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
        await connectDB();
        // 2. Check if user exist
        const userExits = await User.findOne({email: profile.email});

        // 3. If not, then add user to database
        if(!userExits){
            // truncate user name if too long
            const username = profile.name.slice(0,20);

            await User.create({
                email: profile.email,
                username,
                image: profile.picture
            })
        }
        // 4. Return true to allow sign in
        return true;
    },
    // Modifies the session object
    async session({ session }) {
      // Get user from database
      const user = await User.findOne({ email: session.user.email });
      // Assign the user id to session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
    // Redirects after successful login
    // async redirect({ url, baseUrl }) {
    //   console.log("Original URL: ", url);
    //   console.log("Base URL: ", baseUrl);

    //   // Ensure the URL is properly parsed
    //   let parsedUrl;
    //   try {
    //     parsedUrl = new URL(url, baseUrl);
    //   } catch (e) {
    //     parsedUrl = new URL(baseUrl);
    //   }

    //   const searchParams = parsedUrl.searchParams;

    //   // Read the 'source' query parameter
    //   const source = searchParams.get("source");

    //   console.log("redirect ====== ", url, baseUrl, source);
    //   debugger;
    //   if (url === '/api/auth/signin') {
    //      baseUrl + '/properties'; // Redirect after login
    //   }

    //   return baseUrl; // Default redirect
    // }
  }
};
