caimport React from 'react';

//import icons
import { RxCaretDown } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";

//import useState
import { useState } from 'react';

export default function Header() {

  //state management variable
  const [toggle, setToggle] = useState(false)

  const showSideMenu = () => {
    setToggle(true);
  }

  const hideSideMenu = () => {
    setToggle(false);
  }

  const links =[
    {
      icon: <IoIosSearch />,
      name: "Search"
    },
    {
      icon: <CiDiscount1 />,
      name: "Offers",
      sup: "New"
    },
    {
      icon: <IoHelpBuoyOutline />,
      name: "Help"
    },
    {
      icon: <IoPersonOutline />,
      name: "Sign In"
    },
    {
      icon: <BsCart />,
      name: "Cart"
    },
  ]

  return (
    <>
      <div className='black-overlay w-full h-full fixed duration-500' onClick={hideSideMenu} style={{
        opacity: toggle ? 1 : 0,
        visibility: toggle ? "visible" : "hidden",
        zIndex: 9999
      }}>
        <div onClick={(e) => {
          e.stopPropagation();
        }} className='w-[500px] bg-white h-full absolute duration-[400ms]' 
        style={{
          left: toggle ? '0%' : '-100%'
        }}></div>
      </div>
      <header className='p-[15px] shadow-xl sticky top-0 bg-white z-[9999]'>
        <div className='max-w-[1200px] mx-auto flex items-center'>
          <div className='w-[100px]'>
            <img src="images/logo.png" className='w-full' alt="" />
          </div>
          <div>
            <span className='font-bold border-b-[3px] border-[black]'> Sola </span> Gandhinagar, Gujarat, India
            <RxCaretDown onClick={showSideMenu} fontSize={25} className='inline text-[#ff5200]' />
          </div>
          <nav className='hidden md:flex list-none gap-10 ml-auto text-[18px] font-semibold'>
            {
              links.map(
                (link, index) => {
                  return<li key={index} className='cursor-pointer flex hover:text-[#ff5200] items-center gap-2'>
                    {link.icon}
                    {link.name}
                    <sup>{link.sup}</sup>
                  </li>
                }
              )
            }
          </nav>
        </div>
      </header>
    </>
  );
}
