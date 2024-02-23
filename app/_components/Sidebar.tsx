import { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";
import FiltrationItem from "./FiltrationItem";

type SidebarProps = {
  categories: Category[];
};

const Sidebar = ({ categories }: SidebarProps) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-primary border-r border-white border-opacity-[0.05] w-full">
      <div
        className=" text-white flex flex-col h-full w-full"
      >
        <div
          className="h-[60px] border-b border-white border-opacity-[0.05] w-full flex items-center justify-between
        px-4"
        >
          <h2 className="text-lg font-medium">Oldogames Logs</h2>
          <Image width={30} height={30} src="/logo.png" alt="logo image" />
        </div>
        <div className="px-4 space-y-4 mt-4">
          <h2 className="text-secondary font-medium text-lg">Фильтры</h2>
          <div className="flex flex-col w-full space-y-4">
            {categories?.map((category) => (
              <FiltrationItem
                key={category.id}
                id={category.id}
                name={category.name}
              />
            ))}
          </div>
        </div>
        <div
          className="h-[60px] border-t border-white border-opacity-[0.05] w-full flex items-center justify-between
        px-4 absolute bottom-0"
        >
          <p className="font-medium text-lg">qurs</p>
          <div className="h-[40px] w-[40px] rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
