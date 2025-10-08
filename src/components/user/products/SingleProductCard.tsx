"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
  originalPrice?: string;
}

export default function SingleProductCard({
  id,
  name,
  price,
  image,
  originalPrice
}: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to single product page
    router.push("/singleproduct");
  };

  return (
    <div
      key={id}
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="aspect-square relative flex justify-center items-center">
        <Image
          src={image || "/assets/placeholder.png"}
          alt={name}
          width={250}
          height={250}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={true}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 my-6">
        <h3 className="font-bold text-gray-900 mb-1 text-md">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            Net Price: {price} /-
          </span>

          {originalPrice && (
            <span className="text-md text-gray-400 line-through">
              {originalPrice} /-
            </span>
          )}
        </div>
      </div>
    </div>
  );
}