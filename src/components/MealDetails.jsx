// MealDetails.js
import React from 'react';

export default function MealDetails({ selectedMeal, hideMenu }) {
  if (!selectedMeal) return null;

  return (
    <div className="w-[400px] md:w-[500px] p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {selectedMeal.strMeal}
      </h2>
      <img
        src={selectedMeal.strMealThumb}
        alt={selectedMeal.strMeal}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />
      <div className="overflow-y-auto max-h-64 pr-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Instructions
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {selectedMeal.strInstructions}
        </p>
      </div>
      <button
        onClick={hideMenu}
        className="w-full mt-4 px-4 py-2 text-white bg-[#ff5200] hover:bg-[#ffa700] rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Close
      </button>
    </div>
  );
}
