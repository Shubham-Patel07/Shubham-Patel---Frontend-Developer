import React, { useEffect, useState } from 'react'

//import icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Category() {

    // State to store the list of categories fetched from the API
    const [category,setCategory] = useState([]);

    //State to store the slider 
    const [slide, setSlide] = useState([0]);

    // Function to fetch category data from the MealDB API
    const fetchCategory = async () => {
        try{
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategory(data.categories);
        }
        catch(error){
            console.log("Error Fetching categories" + error);
        }
    }

    const nextSlide = () => {
        setSlide(slide - 3);
    }

    const prevSlide = () => {
        setSlide(slide + 3);
    }

    // useEffect to call the fetchCategory function when the component mounts
    useEffect(
        () => {
            fetchCategory();
        },[]
    ) 

  return (
    <>
    <div className='max-w-[1200px] border border-red-500 mx-auto'>
        <div className='flex my-3 items-center justify-between border border-blue-500'>
            <div className='text-[20px] font-bold'>What's on your mind? </div>
            <div className='flex border border-blue-500'>
                <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2' onClick={nextSlide}><FaArrowLeft /></div>
                <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2' onClick={prevSlide}><FaArrowRight /></div>
            </div>
        </div>
        <div className='flex border border-green-500'>
            {
                category.map(
                    (cat,index) => {
                        return (
                            <div style={{
                                transform: `translateX(${slide*-100}%)`
                            }} key={index} className='w-[200px] shrink-0 duration-500'>
                                <img src={cat.strCategoryThumb} alt="" />
                                <div className='mt-2 text-center text-lg font-semibold'>{cat.strCategory}</div>
                            </div>
                            
                        )
                    }
                )
            }
        </div>
    </div>
    </>
  )
}
