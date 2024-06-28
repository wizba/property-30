import React from "react";
import Link from "next/link";
import Hero from "@/Components/hero";
import InfoBoxes from "@/Components/InfoBoxes";
import HomeProperties from "@/Components/HomeProperties";

const HomePage = async({searchParams}) => {

  return <>
    <Hero />
    <InfoBoxes/>
    <HomeProperties/>
  </>;
};

export default HomePage;
