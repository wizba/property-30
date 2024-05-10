import React from "react";
import Link from "next/link";
import Hero from "@/Components/hero";
import InfoBoxes from "@/Components/InfoBoxes";
import HomeProperties from "@/Components/HomeProperties";
import connectDB from "@/config/database";

const HomePage = async() => {

  return <>
    <Hero />
    <InfoBoxes/>
    <HomeProperties/>
  </>;
};

export default HomePage;
