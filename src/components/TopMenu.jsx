import React, { useEffect, useState } from 'react'

import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import Card from "./Card"

export default function TopMenu() {

    const [data, setData] = useState([]);

    const fetchTopMenu = async () => {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
        const dataApi = await response.json();
        setData(dataApi.meals)
    }

    useEffect(
        () => {
            fetchTopMenu();
        }
    )

    return (
        <div className='max-w-[1200px] mx-auto'>
            <div className='flex my-6 items-center justify-between'>
                <div className='text-[20px] font-bold'>Top Restaurant chains in Pune</div>
                <div className='flex'>
                    <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2'><FaArrowLeft /></div>
                    <div className='cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#02060c26] rounded-full mx-2'><FaArrowRight /></div>
                </div>
            </div>
            <div className='flex gap-3 overflow-hidden'>
                {
                    data.map((cat,index) => {
                        return(
                            <Card {...cat} key={index} />
                        )
                    })
                }
            </div>
            <hr className='my-10 border-[1px]' />
        </div>
      )
}
