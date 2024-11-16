import React from "react";

export default function Footer() {
  return (
    <footer className="h-[150px] text-gray-300 bg-black px-4 mt-5">
      <div className="max-w-[1200px] mx-auto flex flex-col items-start py-5">
        <div className="w-[80px]">
          <img className="w-full" src="images/footerlogo.png" alt="" />
        </div>
        <div className="text-sm mt-2 mx-3">
          © {new Date().getFullYear()} Swiggy Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
