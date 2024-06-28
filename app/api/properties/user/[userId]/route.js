
import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (request,{params}) => {

  try {
    await connectDB();
    
    const userId = params.userId;

    if (!userId) {
        return new Response('User ID is required', { status: 401 })
    }
    const properties = await Property.find({owner: userId});
    const test = JSON.stringify(properties);

    return new Response(test, { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
