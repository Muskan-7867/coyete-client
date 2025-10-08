"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Star, ArrowLeft, Heart, Share2 } from "lucide-react";

function SingleProductPage() {
  const [selectedColor, setSelectedColor] = useState("Natural");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    name: "Professional Cricket Bat - English Willow",
    rating: 5,
    reviews: 124,
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    description:
      "Premium English willow cricket bat with excellent balance and power. Handcrafted by skilled artisans for professional performance.",
    features: [
      "Grade 1 English Willow",
      "Perfect Balance & Pickup",
      "Enhanced Sweet Spot",
      "Traditional Blade Shape",
      "Ready to Play",
    ],
  };

  const colors = [
    { name: "Natural", value: "bg-amber-100" },
    { name: "Stained", value: "bg-amber-800" },
  ];

  const images = [
    { id: 1, alt: "Front view", src: "/assets/tshirt.png" },
    { id: 2, alt: "Side view", src: "/assets/tshirt1.png" },
    { id: 3, alt: "Grip detail", src: "/assets/tshirt.png" },
    { id: 4, alt: "Back view", src: "/assets/tshirt1.png" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen mt-24 sm:mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </button>
        </div>

        <div className="bg-white rounded-2xl  overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                ref={imageRef}
                className="aspect-square rounded-xl overflow-hidden relative cursor-zoom-in border border-gray-200 p-2 sm:p-4"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <div
                  className="w-full h-full transition-transform duration-200 ease-out"
                  style={{
                    backgroundImage: `url(${images[activeImage].src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: isZoomed ? "200%" : "contain",
                    backgroundPosition: isZoomed
                      ? `${zoomPosition.x}% ${zoomPosition.y}%`
                      : "center",
                    backgroundColor: "#fff",
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border transition-all flex justify-center items-center ${
                      activeImage === index
                        ? "border-amber-500"
                        : "border-transparent hover:border-amber-300"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={60}
                      height={60}
                      className="object-cover p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating}.0 ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Save {product.discount}%
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${color.value} border border-gray-300`}
                      />
                      <span className="font-medium text-gray-700 text-sm sm:text-base">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                  Add to Cart
                </button>
                <button className="p-3 sm:p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
                <button className="p-3 sm:p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105">
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
