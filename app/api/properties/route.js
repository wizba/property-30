import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) =>{
    try{
        await connectDB();
        const properties = await Property.find({});

        const test = JSON.stringify(properties);

        return new Response(test,{status:200})
    }catch(error){
        return new Response("Something went wrong", {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}