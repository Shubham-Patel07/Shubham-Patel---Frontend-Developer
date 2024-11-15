import React from 'react';

//import caret icon
import { RxCaretDown } from "react-icons/rx";

//import useState
import { useState } from 'react';

export default function Header() {

  //state management variable
  const [toggle, setToggle] = useState(false)

  const showSideMenu = () => {
    setToggle(true);
  }

  return (
    <>
      <div className='black-overlay w-full h-full fixed duration-500' style={{
        opacity: toggle ? 1 : 0,
        visibility: toggle ? "visible" : "hidden"
      }}></div>
      <header className='p-[15px] shadow-xl'>
        <div className='max-w-[1200px] mx-auto border border-red-500 flex items-center'>
          <div className='w-[100px] border border-blue-500'>
            <img src="images/logo.png" className='w-full' alt="" />
          </div>
          <div>
            <span className='font-bold border-b-[3px] border-[black]'> Baner </span> Pune, Maharashtra, India
            <RxCaretDown onClick={showSideMenu} fontSize={25} className='inline text-[#ff5200]' />
          </div>
        </div>
      </header>
    </>
  );
}