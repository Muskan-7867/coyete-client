"use client";
import React, { useState } from "react";

function FilterSidebar() {
  const [selectedFilters, setSelectedFilters] = useState({
    productType: [] as string[],
    size: [] as string[],
    color: [] as string[],
    qualityName: [] as string[]
  });
  const filterOptions = {
    productType: ["Option 1", "Option 2", "Option 3"],
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green", "Black"],
    qualityName: ["Premium", "Standard", "Economy"]
  };

  const toggleFilter = (
    category: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[category];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter((item) => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value]
        };
      }
    });
  };

  const clearFilter = (category?: keyof typeof selectedFilters) => {
    if (category) {
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: []
      }));
    } else {
      setSelectedFilters({
        productType: [],
        size: [],
        color: [],
        qualityName: []
      });
    }
  };
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
        {/* Filter Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filter by</h2>
          <button
            onClick={() => clearFilter()}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Product Type Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Product Type</h3>
            <button
              onClick={() => clearFilter("productType")}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {filterOptions.productType.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.productType.includes(option)}
                  onChange={() => toggleFilter("productType", option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Size</h3>
            <button
              onClick={() => clearFilter("size")}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {filterOptions.size.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.size.includes(option)}
                  onChange={() => toggleFilter("size", option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Color</h3>
            <button
              onClick={() => clearFilter("color")}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {filterOptions.color.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.color.includes(option)}
                  onChange={() => toggleFilter("color", option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quality Name Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Quality Name</h3>
            <button
              onClick={() => clearFilter("qualityName")}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {filterOptions.qualityName.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.qualityName.includes(option)}
                  onChange={() => toggleFilter("qualityName", option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
