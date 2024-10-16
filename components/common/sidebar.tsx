"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Mail,
  ChartNoAxesColumn,
  Settings,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-full">
      <div className="flex md:hidden items-center justify-between relative p-4 bg-white">
        <div className="flex items-center">
          <img
            src="/cropped-Triplei-Logo-Vetor-1-32x32.png"
            alt="Logo"
            className="w-8 h-8 mr-2"
          />
          <span className="text-xl font-bold">ELT Global</span>
        </div>
        <button onClick={toggleSidebar} className="text-xl">
          <Menu />
        </button>
      </div>

      <div
        className={`hidden md:flex flex-col h-full bg-white p-4 duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {!isCollapsed && (
            <div className="flex items-center">
              <img
                src="/cropped-Triplei-Logo-Vetor-1-32x32.png"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-xl font-bold">ELT Global</span>
            </div>
          )}
          <button onClick={toggleSidebar} className="text-xl">
            <Menu />
          </button>
        </div>
        {!isCollapsed && (
          <span>
            <h1 className="ml-4 mt-[50px] text-neutral-500 font-semibold">
              GENERAL
            </h1>
          </span>
        )}
        <div className="flex flex-col w-full mt-8 space-y-1 flex-1">
          <a href="/">
            <div
              className={`text-white bg-orange-500 rounded-2xl shadow-lg flex items-center w-full h-10 p-2 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="p-2 text-white">
                <LayoutDashboard />
              </div>
              {!isCollapsed && <span className="ml-4">Dashboard</span>}
            </div>
          </a>
          <div
            className={`flex items-center w-full p-2 hover:bg-gray-200 rounded-2xl h-10 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-2">
              <Search />
            </div>
            {!isCollapsed && <span className="ml-4">Find</span>}
          </div>
          <div
            className={`flex items-center w-full p-2 hover:bg-gray-200 rounded-2xl h-10 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-2">
              <Mail />
            </div>
            {!isCollapsed && <span className="ml-4">Inbox</span>}
          </div>
          <div
            className={`flex items-center w-full p-2 hover:bg-gray-200 rounded-2xl h-10 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-2">
              <ChartNoAxesColumn />
            </div>
            {!isCollapsed && <span className="ml-4">Analytics</span>}
          </div>
          <div
            className={`flex items-center w-full p-2 hover:bg-gray-200 rounded-2xl h-10 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-2">
              <Settings />
            </div>
            {!isCollapsed && <span className="ml-4">Settings</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
