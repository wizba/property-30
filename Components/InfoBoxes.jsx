import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (  
    <section>
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <InfoBox
          heading="For Renters"
          buttonInfo={
            {
              text: "Browse Properties",
              href: "/properties",
              backgroudnColor: "bg-black",
            }
          }
        >
          Find your dream rental property. Bookmark properties for easy access.
        </InfoBox>
        <InfoBox
          heading="For Property Owners"
          buttonInfo={
            {
              text: "Add Property",
              href: "/properties/add",
              backgroudnColor: "bg-blue-500",
            }
          }
        >
          List your property and reach potential tenants. Rent as airbnb or long term
        </InfoBox>
      </div>
    </div>
  </section>
  );
};

export default InfoBoxes;
