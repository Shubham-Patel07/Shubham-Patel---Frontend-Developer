import React, { useEffect, useState } from 'react';
import Card from "./Card";
import { MdOutlineFilterAlt } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { fetchTopMenu, fetchAreas, fetchDetails, fetchFilteredMeals } from "../api/TopMenusApi";
import MealDetails from './MealDetails';


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

    const handleFilter = async () => {
        if (selectedArea) {
            try {
                const filteredMeals = await fetchFilteredMeals(selectedArea);
                setFilteredData(filteredMeals);
            } catch (error) {
                console.error("Failed to filter meals:", error.message);
            }
        } else {
            setFilteredData(data);
        }
        setIsFilterOpen(false);
    };

    const handleClick = async (meal) => {
        setShouldFetch(true);
        setSelectedMeal(await fetchDetails(meal.strMeal));
    };

    const hideMenu = () => {
        setShouldFetch(false);
    }

    // Run only once when the component mounts
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const meals = await fetchTopMenu();
                setData(meals);
                setFilteredData(meals);

                const areaData = await fetchAreas();
                setAreas(areaData);
            } catch (error) {
                console.error("Error loading data:", error.message);
            }
        };
        loadInitialData();
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
                    <MealDetails selectedMeal={selectedMeal} hideMenu={hideMenu} />
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
                    className="border px-4 rounded bg-white shadow-md absolute duration-500 max-h-[400px] overflow-y-auto"
                    style={{
                        opacity: isFilterOpen ? 1 : 0,
                        visibility: isFilterOpen ? "visible" : "hidden",
                        transform: isFilterOpen ? "translateY(0)" : "translateY(-40px)",
                        zIndex: 9999,
                    }}
                >
                    <div className="text-sm font-bold  bg-white sticky top-0 z-10 h-[35px] flex items-end">Filter By Area:</div>
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
                    <div
                        className="sticky bottom-0 bg-white h-[60px]"
                        style={{
                            zIndex: 1000, // Ensure it stays above other dropdown content
                        }}>
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 text-white rounded bg-[#ff5200] w-full hover:scale-105 transform transition duration-300"
                    >
                    Apply
                    </button>
                    </div>
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
