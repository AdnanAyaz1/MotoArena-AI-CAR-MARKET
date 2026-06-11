import Link from "next/link";
import React from "react";
import CarCardImage from "../CardImages/CarCardImage";

interface props {
  type: {
    bodyType: string;
    images: string[];
  };
}

const CarTypeCard = ({ type }: props) => {
  return (
    <Link
      key={type.bodyType}
      href={`/cars?bodyType=${type.bodyType}`}
      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
    >
      <div className="relative h-[180px] overflow-hidden">
        <CarCardImage images={type.images} variant="featured" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-lg font-bold">{type.bodyType}</h3>
          <p className="text-gray-500 text-xs mt-1 group-hover:text-gray-400 transition-colors">
            Explore models →
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CarTypeCard;
