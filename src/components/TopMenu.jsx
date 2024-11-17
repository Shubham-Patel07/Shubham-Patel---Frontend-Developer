import React, { useEffect, useState } from 'react'

import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import Card from "./Card"

export default function TopMenu() {

    const [data, setData] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [slide, setSlide] = useState(0);

    const itemsPerPage = 3;

    const fetchTopMenu = async () => {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
        const dataApi = await response.json();
        setData(dataApi.meals)
    }

    const fetchDetails = async (mealName) => {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName);
        const dataApi = await response.json();
        setSelectedMeal(dataApi.meals[0])
    }

    useEffect(
        () => {
            fetchTopMenu();
        }, []
    )

    const handleClick = async (meal) => {
        setShouldFetch(true);
        await fetchDetails(meal.strMeal);
    };

    const hideMenu = () => {
        setShouldFetch(false);
    }

    const nextSlide = () => {
        if (slide + itemsPerPage < data.length) {
            setSlide(slide + itemsPerPage);
        }
    }

    const prevSlide = () => {
        if (slide > 0) {
            setSlide(slide - itemsPerPage);
        }
    }

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
            <div className='max-w-[1200px] mx-auto px-2'>
                <div className='flex my-6 items-center justify-between'>
                    <div className='text-[20px] font-bold'>Top Restaurant chains in Pune</div>
                    <div className='flex'>
                        <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2' onClick={prevSlide}><FaArrowLeft /></div>
                        <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2' onClick={nextSlide}><FaArrowRight /></div>
                    </div>
                </div>
                <div className='overflow-hidden'>
                    <div className="flex gap-3 transition-transform duration-300" style={{
            transform: `translateX(-${slide * (100 / itemsPerPage)}%)`,
        }}>
                    {
                        data.map((cat, index) => {
                            return (
                                <Card width="w-full md:w-[273px]"{...cat} key={index} onClick={() => handleClick(cat)} />
                            )
                        })
                    }
                    </div>
                </div>
                <hr className='my-10 border-[1px]' />
            </div>
        </>
    )
}
