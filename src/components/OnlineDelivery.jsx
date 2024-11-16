import React from 'react'

import { useEffect, useState} from 'react'

import Card from "./Card"

export default function OnlineDelivery() {
    
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
                <div className='text-[20px] font-bold'>Restaurants with online food delivery in Pune</div>
            </div>
            <div className="grid grid-cols-4 gap-3" >
                {
                    data.map(
                        (cat, index) => {
                            return <Card {...cat} key={index} />
                        }
                    )
                }
            </div>
    </div>
  )
}
