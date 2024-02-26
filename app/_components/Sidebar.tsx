"use client";
import { Category, Gamemode } from "@prisma/client";
import Image from "next/image";
import CategorieItem from "./CategorieItem";
import GamemodeItem from "./GamemodeItem";
import {
  AlignLeft,
  Folder,
  GalleryVerticalEnd,
  Grid,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "react-tooltip";

type SidebarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

const Sidebar = ({ categories, gamemodes }: SidebarProps) => {
  const [layout, setLayout] = useState("list");

  useEffect(() => {
    const layoutMode =
      typeof window !== "undefined"
        ? window.localStorage.getItem("layout")
        : null;
    if (layoutMode) {
      setLayout(layoutMode);
    }
  }, []);

  const handleClick = () => {
    setLayout((prevLayout) => {
      const newLayout = prevLayout === "list" ? "grid" : "list";
      localStorage.setItem("layout", newLayout);
      return newLayout;
    });
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-primary border-r border-white border-opacity-[0.05] w-full">
      <div className=" text-white flex flex-col h-full w-full">
        <div
          className="h-[50px] border-b border-white border-opacity-[0.05] w-full flex items-center md:justify-between
        px-4 md:gap-x-0 gap-x-2"
        >
          <h2 className="text-lg font-medium">Oldogames Logs</h2>
          <Image width={30} height={30} src="/logo.png" alt="logo image" className="w-auto h-auto"/>
        </div>
        <div className="px-4 space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Folder className="h-4 w-4 mr-1 text-secondary" />
              <h2 className="text-secondary font-medium text-lg">Режимы</h2>
            </div>
            <button
              onClick={handleClick}
              data-tooltip-content={`Режим ${layout}`}
              data-tooltip-id="layout-tooltip"
              className="md:block hidden hover:bg-secondary/15 rounded-full ease duration-300"
            >
              {layout === "grid" ? (
                <Grid className={cn("text-secondary w-8 h-8 p-2")} />
              ) : (
                <GalleryVerticalEnd
                  className={cn("text-secondary w-8 h-8 p-2")}
                />
              )}
            </button>
            <Tooltip id="layout-tooltip" />
          </div>
          <div
            className={cn(
              "grid md:grid-cols-2 gap-2",
              layout === "list" && "flex flex-col"
            )}
          >
            {gamemodes?.map((gamemode) => (
              <GamemodeItem
                key={gamemode.id}
                id={gamemode.id}
                name={gamemode.name}
              />
            ))}
          </div>
          <div className="flex items-center">
            <AlignLeft className="h-4 w-4 mr-1 text-secondary" />
            <h2 className="text-secondary font-medium text-lg">Категории</h2>
          </div>
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
          className="h-[50px] border-t border-white border-opacity-[0.05] w-full flex items-center justify-between
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
