import React from 'react'

//import icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Category() {
   

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
        
    </div>
    </>
  )
}
