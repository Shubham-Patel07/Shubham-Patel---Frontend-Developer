import React, { useEffect, useState } from 'react'

//import icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Category() {
    const [category,setCategory] = useState([]);

    const fetchCategory = async () => {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategory(data.categories);
    }

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
                <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2'><FaArrowLeft /></div>
                <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2'><FaArrowRight /></div>
            </div>
        </div>
        <div className='flex border border-green-500 overflow-hidden'>
            {
                category.map(
                    (cat,index) => {
                        return (
                            <div key={index} className='w-[200px] shrink-0'>
                                <img src={cat.strCategoryThumb} alt="" />
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
