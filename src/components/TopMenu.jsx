import React, { useEffect, useState } from 'react'

import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import Card from "./Card"

import { fetchTopMenu, fetchDetails } from '../api/TopMenusApi';

import MealDetails from './MealDetails';

export default function TopMenu() {

    const [data, setData] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [slide, setSlide] = useState(0);

    const itemsPerPage = 3;


    useEffect(
        () => {
            const loadTopMenu = async () => {
                try {
                    const meals = await fetchTopMenu();
                    setData(meals);
                } catch (error) {
                    console.error("Error loading top menu:", error.message);
                }
            };
            loadTopMenu();
        }, []
    )

    const handleClick = async (meal) => {
        setShouldFetch(true);
        setSelectedMeal(await fetchDetails(meal.strMeal));
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
                    <MealDetails selectedMeal={selectedMeal} hideMenu={hideMenu} />
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