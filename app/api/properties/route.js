import { getSessionUser } from "@/common/getSessionUser";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {

  try {
    await connectDB();
    const properties = await Property.find({});

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

export const POST = async (request) => {
  try {
    await connectDB();
    
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const userId = sessionUser.user.id;
    
    const formData = await request.formData();


    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: formData.get("amenities"),
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly."),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // upload image(s) to cloudinary
    const imageUploadPromises =  [];

    for(const image of images){
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));

      const imageData = Buffer.from(imageArray);

      // convert the image data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to cloudinary
      const results = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,{
          folder:'propertyPulse'
        }
      );

      imageUploadPromises.push(results.secure_url);

      // wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the property data object
      propertyData.images = uploadedImages;
    }
    const newProperty = new  Property(propertyData);
    newProperty.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
  } catch (error) {
    console.log(error);
    return new Response("Failed to add property", { status: 500 });
  }
};
