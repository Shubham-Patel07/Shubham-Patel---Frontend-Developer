import React, { useEffect, useState } from 'react';
import Card from "./Card";
import { MdOutlineFilterAlt } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";

export default function OnlineDelivery() {
    const [data, setData] = useState([]);
    const [areas, setAreas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');

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
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
        const dataApi = await response.json();
        console.log("Top Menu Data: ", dataApi); // Debug
        setData(dataApi.meals || []);
        setFilteredData(dataApi.meals || []); // Set initial data
    };

    const fetchAreas = async () => {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const areaData = await response.json();
        console.log("Areas Data: ", areaData); // Debug
        setAreas(areaData.meals || []);
    };

    const handleFilter = async () => {
        if (selectedArea) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
            const filteredMeals = await response.json();
            console.log("Filtered Meals: ", filteredMeals); // Debug
            setFilteredData(filteredMeals.meals || []);
        } else {
            setFilteredData(data); // Reset to all meals if no area is selected
        }
        setIsFilterOpen(false);
    };

    // Run only once when the component mounts
    useEffect(() => {
        fetchTopMenu();
        fetchAreas();
    }, []);

    return (
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
                    filteredData.map((cat, index) => <Card {...cat} key={index} />)
                ) : (
                    <div>No meals available for the selected filter.</div>
                )}
            </div>
        </div>
    );
}
