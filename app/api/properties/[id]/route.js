import connectDB from "@/config/database";
import Property from "@/models/Property";


// GET /api/properties/:id
export const GET = async (request,{params}) =>{
    try{
        await connectDB();
        const property = await Property.findById(params.id);

        if(!property) return new Response('Property Not Found',{status:404});

        const strJson= JSON.stringify(property);
        return new Response(strJson,{status:200})
    }catch(error){
        return new Response(error, {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}