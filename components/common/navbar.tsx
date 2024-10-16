"use client";
import { Bell, Headset, CircleUserRound } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white w-full ml-[1px]">
      <div className="px-4 md:px-8"> 
        <section className="flex pt-2 items-center"> 
          <h1 className="text-lg md:text-xl pt-3 font-bold">Heading</h1> 
          <div className="flex gap-3 md:gap-4 mt-1 ml-auto"> 
            <Bell className="cursor-pointer hover:bg-gray-200 rounded-xl" />
            <Headset className="cursor-pointer hover:bg-gray-200 rounded-xl" />
            <CircleUserRound className="cursor-pointer hover:bg-gray-200 rounded-xl" />
          </div>
        </section>
        <div className="flex flex-wrap text-xs md:text-sm font-semibold text-zinc-400 gap-1 md:gap-2 mt-4 md:mt-6"> {/* Reduced font size and margin-top */}
          <p className="text-orange-500 cursor-pointer pb-0 border-b-2 border-b-orange-500">Exam</p>
          <p className="cursor-pointer hover:bg-gray-200">Lorem</p>
          <p className="cursor-pointer hover:bg-gray-200">Lorem</p>
          <p className="cursor-pointer hover:bg-gray-200">Lorem</p>
        </div>
      </div>
    </div>
  );
}
