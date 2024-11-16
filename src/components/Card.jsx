import React from 'react'

export default function Card() {

  return (
    <div className='w-[273px]'>
      <div className='h-[182px] rounded-[15px] overflow-hidden relative'>
        <img className="object-cover w-full h-full" src="https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg" alt="" />
        <div className='image-overlay absolute w-full h-full top-0 flex items-end p-2 text-[25px] font-bold text-white tracking-tighter'>
          Items at ₹179
        </div>
      </div>
    </div>
  )
}
