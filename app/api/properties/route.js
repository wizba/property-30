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


export const POST = async (request) =>{
    try{
        const formData = await request.formData();
        console.log(formData.get('name'))
        return new Response(JSON.stringify({message:'success'}),{status:200});
    }catch(error){
        console.log(error)
        return new Response('Failed to add property',{status:500});
    }
}