"use client";

import Link from "next/link";
import React, { useState } from "react";

interface props {
  company: {
    name: string;
    image: string;
  };
}

const CompanyCard = ({ company }: props) => {
  const [imgError, setImgError] = useState(false);

  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      key={company.name}
      href={`/cars?company=${company.name}`}
      className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
    >
      {imgError ? (
        <div className="mx-auto h-[70px] w-[100px] bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold text-gray-400">{initials}</span>
        </div>
      ) : (
        <img
          src={company.image}
          alt={`${company.name} Logo`}
          className="mx-auto object-contain h-[70px] w-[100px]"
          onError={() => setImgError(true)}
        />
      )}
      <h3 className="font-medium mt-2">{company.name}</h3>
    </Link>
  );
};

export default CompanyCard;
