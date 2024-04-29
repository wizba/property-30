"use client";
import PropertyHeaderImage from "@/Components/PropertyHeaderImage";
import { fetchProperty } from "@/common/request";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect,useState } from "react";

const PropertyPage = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const {id} = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPropertyData = async () =>{
      if(!id) return;
      try {
        const $property  =  await fetchProperty(id);
        setProperty($property)
      } catch (error) {
        console.error('error fetching property :', error);
      } finally {
        setLoading(false);
      }
    }

    if(property === null){
      fetchPropertyData()
    }
  },[id, property]);

  if(!property && !loading){
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    )
  }

  return (
    <>
    {!loading && property && <>
      <PropertyHeaderImage image = { property.images[0] }/>
    </>}
    </>
  );
};

export default PropertyPage;
