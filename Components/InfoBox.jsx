import React from "react";
import Link from "next/link";
const InfoBox = ({
  heading,
  backgroudnColor = "bg-gray-100",
  textColor = "text-gray-700",
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroudnColor} bg-gray-100 p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>
       {children}
      </p>
      <Link
        href={buttonInfo?.href ?? ''}
        className={`inline-block ${buttonInfo.backgroudnColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
