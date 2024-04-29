import axios from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    if(!apiDomain){
      return [];
    }

    const response = await axios.get(
      `${apiDomain}/properties`
    );
    return response.data; // Return the actual data received
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return []; // Return an empty array on error
  }
}

// fetch property by id
async function fetchProperty(id) {
  try {
    if(!apiDomain){
      return [];
    }

    const response = await axios.get(
      `${apiDomain}/properties/${id}`
    );
    return response.data; // Return the actual data received
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return []; // Return an empty array on error
  }
}

export { fetchProperties, fetchProperty };
