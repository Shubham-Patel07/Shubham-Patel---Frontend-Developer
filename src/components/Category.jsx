import React, { useEffect, useState } from 'react'

//import icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Category() {

    // State to store the list of categories fetched from the API
    const [category,setCategory] = useState([]);

    //State to store the slider 
    const [slide, setSlide] = useState(0);

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
        if(slide>=7) return false;
        setSlide(slide + 3);
        console.log(slide + 3)
        console.log(category.length);
    }

    const prevSlide = () => {
        if(slide === 0) return false;
        setSlide(slide - 3);
    }

    // useEffect to call the fetchCategory function when the component mounts
    useEffect(
        () => {
            fetchCategory();
        },[]
    ) 

  return (
    <>
    <div className='max-w-[1200px] mx-auto px-2'>
        <div className='flex my-6 items-center justify-between'>
            <div className='text-[20px] font-bold'>What's on your mind? </div>
            <div className='flex'>
                <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2' onClick={prevSlide}><FaArrowLeft /></div>
                <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2' onClick={nextSlide}><FaArrowRight /></div>
            </div>
        </div>
        <div className='flex overflow-hidden'>
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
        <hr className='my-10 border-[1px]' />
    </div>
    </>
  )
}
