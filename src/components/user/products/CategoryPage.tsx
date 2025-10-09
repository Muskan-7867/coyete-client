"use client";
import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import SingleProductCard from "./SingleProductCard";

function CategoryPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "PRO RESERVE EDITION",
      price: "75000",
      image: "/assets/tshirt.png",
      badge: "P6000",
      originalPrice: "85000"
    },
    {
      id: 2,
      name: "PLAYER EDITION",
      price: "64000",
      image: "/assets/tshirt1.png",
      badge: "COPYRICE",
      originalPrice: "85000"
    },
    {
      id: 3,
      name: "LIMITED EDITION",
      price: "53000",
      image: "/assets/tshirt.png",
      badge: "COPYRICE",
      originalPrice: "85000"
    },
    {
      id: 4,
      name: "PRO RESERVE EDITION",
      price: "75000",
      image: "/assets/tshirt1.png",
      badge: "P6000",
      originalPrice: "85000"
    },
    {
      id: 5,
      name: "PLAYER EDITION",
      price: "64000",
      image: "/assets/tshirt.png",
      badge: "COPYRICE",
      originalPrice: "85000"
    },
    {
      id: 6,
      name: "LIMITED EDITION",
      price: "53000",
      image: "/assets/tshirt1.png",
      badge: "COPYRICE",
      originalPrice: "85000"
    },
    {
      id: 1,
      name: "PRO RESERVE EDITION",
      price: "75000",
      image: "/assets/tshirt.png",
      badge: "P6000",
      originalPrice: "85000"
    },
    {
      id: 2,
      name: "PLAYER EDITION",
      price: "64000",
      image: "/assets/tshirt1.png",
      badge: "COPYRICE",
      originalPrice: "85000"
    },
    {
      id: 3,
      name: "LIMITED EDITION",
      price: "53000",
      image: "/assets/tshirt.png",
      badge: "COPYRICE",
      originalPrice: "85000"
    }
  ];

  return (
  <div className="min-h-screen mt-26 lg:mt-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">BATS</h1>

          {/* Desktop Viewing Text */}
          <div className="hidden sm:flex text-sm text-gray-600">
            VIEWING: <span className="font-semibold">1 - 6 of 40</span>
          </div>

          {/* Mobile Filter Icon Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="p-2 bg-orange-500 text-white rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
          />

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <SingleProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
