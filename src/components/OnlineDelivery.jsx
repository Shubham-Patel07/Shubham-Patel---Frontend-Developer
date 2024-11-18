import React, { useEffect, useState } from 'react';
import Card from "./Card";
import { MdOutlineFilterAlt } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";

export default function OnlineDelivery() {
    const [data, setData] = useState([]); // Holds the list of all food items fetched from the API
    const [areas, setAreas] = useState([]); // Stores the list of available areas fetched from the API
    const [filteredData, setFilteredData] = useState([]); // Holds the filtered list of food items based on the selected area
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Tracks whether the filter dropdown is currently open or closed
    const [selectedArea, setSelectedArea] = useState(''); // Stores the area selected by the user for filtering
    const [selectedMeal, setSelectedMeal] = useState(null); // Stores details of the currently selected meal (if applicable)
    const [shouldFetch, setShouldFetch] = useState(false);

    const Filters = [
        {
            icon: <MdOutlineFilterAlt />,
            name: "Filter",
            onClick: () => setIsFilterOpen(!isFilterOpen),
        },
        {
            icon: <RxCaretDown />,
            name: "Sort By",
        },
        {
            icon: "",
            name: "Fast Delivery",
        },
        {
            icon: "",
            name: "New on Swiggy",
        },
    ];

    const fetchTopMenu = async () => {
        try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
        const dataApi = await response.json();
        console.log("Top Menu Data: ", dataApi); // Debug
        setData(dataApi.meals || []);
        setFilteredData(dataApi.meals || []); // Set initial data
    } catch (error) {
        console.error("Failed to fetch top menu data:", error.message);
    }
    };

    const fetchAreas = async () => {
        try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const areaData = await response.json();
        console.log("Areas Data: ", areaData); // Debug
        setAreas(areaData.meals || []);
    } catch (error) {
        console.error("Failed to fetch areas data:", error.message);
    }
    };

    const handleFilter = async () => {
        try {
        if (selectedArea) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
            const filteredMeals = await response.json();
            console.log("Filtered Meals: ", filteredMeals); // Debug
            setFilteredData(filteredMeals.meals || []);
        } else {
            setFilteredData(data); // Reset to all meals if no area is selected
        }
    }catch (error) {
            console.error("Failed to filter meals:", error.message);
        }
        setIsFilterOpen(false);
    };

    const fetchDetails = async (mealName) => {
        try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName);
        const dataApi = await response.json();
        setSelectedMeal(dataApi.meals[0])
    } catch (error) {
        console.error("Failed to fetch meal details:", error.message);
        // Optionally, you can show an error message to the user here
    }
    }

    const handleClick = async (meal) => {
        setShouldFetch(true);
        await fetchDetails(meal.strMeal);
    };

    const hideMenu = () => {
        setShouldFetch(false);
    }

    // Run only once when the component mounts
    useEffect(() => {
        fetchTopMenu();
        fetchAreas();
    }, []);

    return (
        <>
        <div className='w-screen h-screen fixed top-0 left-0 black-overlay duration-500' onClick={hideMenu} style={{
                opacity: shouldFetch ? 1 : 0,
                visibility: shouldFetch ? "visible" : "hidden",
                zIndex: 9999
            }}>
                <div onClick={(e) => {
                    e.stopPropagation();
                }} className='max-w-[1200px] absolute duration-[400ms]'
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        transition: 'transform 0.5s ease-in-out'
                    }}>
                    {selectedMeal && (
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
                    )}

                </div>
            </div>
        <div className="max-w-[1200px] mx-auto px-2">
            <div className="flex my-6 items-center justify-between">
                <div className="text-[20px] font-bold">Restaurants with online food delivery in Pune</div>
            </div>
            <div>
                <div className="max-w-[1200px] mx-auto flex my-4">
                    {Filters.map((cat, index) => (
                        <div
                            key={index}
                            onClick={cat.onClick}
                            className="cursor-pointer flex items-center p-2 rounded-[100px] border border-[#02060c26] mr-2"
                        >
                            {cat.name}
                            {cat.icon}
                        </div>
                    ))}
                </div>
                {/* Black Overlay */}
                <div
                    className="black-overlay w-full h-full fixed top-0 left-0 bg-black opacity-50 z-[9998] duration-500"
                    style={{
                        opacity: isFilterOpen ? 1 : 0,
                        visibility: isFilterOpen ? "visible" : "hidden",
                    }}
                    onClick={() => setIsFilterOpen(false)} // Closes the dropdown when clicking outside
                ></div>
                {/* DropDown */}
                <div
                    className="border p-4 rounded bg-white shadow-md absolute duration-500 max-h-[400px] overflow-y-auto"
                    style={{
                        opacity: isFilterOpen ? 1 : 0,
                        visibility: isFilterOpen ? "visible" : "hidden",
                        transform: isFilterOpen ? "translateY(0)" : "translateY(-40px)",
                        zIndex: 9999,
                    }}
                >
                    <div className="text-sm font-bold mb-2">Filter By Area:</div>
                    <div>
                        {areas.map((area, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    name="area"
                                    value={area.strArea}
                                    checked={selectedArea === area.strArea}
                                    onChange={() => setSelectedArea(area.strArea)}
                                    className="mr-2"
                                />
                                {area.strArea}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 bg-blue-500 text-white rounded mt-2 bg-[#ff5200]"
                    >
                        Apply
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filteredData.length > 0 ? (
                    filteredData.map((cat, index) => <Card {...cat} key={index} onClick={() => handleClick(cat)} />)
                ) : (
                    <div>No meals available for the selected filter.</div>
                )}
            </div>
        </div>
        </>
    );
}
