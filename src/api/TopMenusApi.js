// src/api/topMenuAPI.js
export const fetchTopMenu = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
      const dataApi = await response.json();
      return dataApi.meals || [];
    } catch (error) {
      console.error("Failed to fetch top menu data:", error.message);
      throw error;
    }
  };
  
  export const fetchAreas = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const areaData = await response.json();
      return areaData.meals || [];
    } catch (error) {
      console.error("Failed to fetch areas data:", error.message);
      throw error;
    }
  };
  
  export const fetchDetails = async (mealName) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
      const dataApi = await response.json();
      return dataApi.meals[0];
    } catch (error) {
      console.error("Failed to fetch meal details:", error.message);
      throw error;
    }
  };
  
  export const fetchFilteredMeals = async (selectedArea) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
      const filteredMeals = await response.json();
      console.log("Filtered Meals: ", filteredMeals); // Debug
      return filteredMeals.meals || [];
    } catch (error) {
      console.error("Failed to filter meals:", error.message);
      throw error;
    }
  };
  