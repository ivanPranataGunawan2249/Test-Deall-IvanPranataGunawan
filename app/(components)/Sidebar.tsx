"use client";
import Link from "next/link";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faNavicon,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

export default function navbar() {
  const sideBarRef = useRef<HTMLDivElement>(null);

  function toogleSideBar() {
    if (sideBarRef.current) {
      sideBarRef.current.classList.toggle("-translate-x-full");
    }
  }

  return (
    <div className="max-h-screen md:sticky md:top-0 z-50 text-white">
      {/* MOBILE SIDEBAR */}
      <div className="bg-[#1E1E1E] flex justify-between p-2 items-center sticky top-0 z-30">
        <div className="block text-white font-extrabold dark:text-dw ">
          Admin
        </div>
        <button className="rounded focus:bg-[#1E1E1E]" onClick={toogleSideBar}>
          {/* <List size={32} /> */}
          <FontAwesomeIcon icon={faNavicon} width={32} />
        </button>
      </div>
      {/* MAIN SIDEBAR */}
      <div
        ref={sideBarRef}
        className="bg-[#1E1E1E] w-48 space-y-10 px-5 py-7  absolute inset-y-0 left-0 transform -translate-x-full
        md:relative md:translate-x-0 z-50 transition duration-200 ease-in-out flex flex-col child:transition-all md:max-h-screen md:min-h-screen md:sticky md:top-0"
      >
        <Link href="/products" className="w-8 h-8 text-3xl font-extrabold">
          Admin
        </Link>

        <nav className="flex flex-col grow space-y-3">
          <Link href="/products" passHref>
            <div className="flex flex-row py-2.5 px-4 transition duration-200 rounded items-center space-x-3 hover:bg-blue-600 hover:text-white">
              {/* <HouseSimple size={20} /> */}
              <FontAwesomeIcon icon={faTruck} width={20} />
              <p>Products</p>
            </div>
          </Link>

          <Link href="/carts">
            <div className="flex flex-row py-2.5 px-4 transition duration-200 rounded items-center space-x-3 hover:bg-blue-600 hover:text-white">
              {/* <ChartPieSlice size={20} /> */}
              <FontAwesomeIcon icon={faCartShopping} width={20} />
              <p>Carts</p>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
