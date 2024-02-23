import { Category, Gamemode } from "@prisma/client";
import Image from "next/image";
import React from "react";
import CategorieItem from "./CategorieItem";
import GamemodeItem from "./GamemodeItem";

type SidebarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

const Sidebar = ({ categories, gamemodes }: SidebarProps) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-primary border-r border-white border-opacity-[0.05] w-full">
      <div className=" text-white flex flex-col h-full w-full">
        <div
          className="h-[60px] border-b border-white border-opacity-[0.05] w-full flex items-center justify-between
        px-4"
        >
          <h2 className="text-lg font-medium">Oldogames Logs</h2>
          <Image width={30} height={30} src="/logo.png" alt="logo image" />
        </div>
        <div className="px-4 space-y-4 mt-4">
          <h2 className="text-secondary font-medium text-lg">Режимы</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {gamemodes?.map((gamemode) => (
              <GamemodeItem
                key={gamemode.id}
                id={gamemode.id}
                name={gamemode.name}
              />
            ))}
          </div>
          <h2 className="text-secondary font-medium text-lg">Категории</h2>
          <div className="flex items-center gap-2 pb-2 flex-wrap">
            {categories?.map((category) => (
              <CategorieItem
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
