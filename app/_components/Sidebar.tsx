"use client";
import { Category, Gamemode } from "@prisma/client";
import Image from "next/image";
import CategorieItem from "./CategorieItem";
import GamemodeItem from "./GamemodeItem";
import {
  AlignLeft,
  CaptionsIcon,
  Clock,
  Folder,
  GalleryVerticalEnd,
  Grid,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "react-tooltip";
import GamemodeInput from "./GamemodeInput";
import CategoryInput from "./CategoryInput";
import ClientOnly from "./ClientOnly";
import Attention from "./Attention";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type SidebarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
  user: {
    personaname: string;
    steamid: string;
    avatarfull: string;
  };
  qadmin: {
    steamid: string;
    rank: string;
  };
};

const Sidebar = ({ categories, gamemodes, user, qadmin }: SidebarProps) => {
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

  console.log(user);

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-primary border-r border-white border-opacity-[0.05] w-full">
      <div className=" text-white flex flex-col h-full w-full">
        <div
          className="h-[50px] border-b border-white border-opacity-[0.05] w-full flex items-center md:justify-between
        px-4 md:gap-x-0 gap-x-2"
        >
          <h2 className="text-lg font-medium">Oldogames Logs</h2>
          <Image
            width={30}
            height={30}
            src="/logo.png"
            alt="logo image"
            className="w-auto h-auto"
          />
        </div>
        <div className="px-4 space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Folder className="h-4 w-4 text-secondary mr-1" />
              <h2 className="text-secondary font-medium text-lg">Режимы</h2>
            </div>
            <button
              onClick={handleClick}
              data-tooltip-content={`Режим представления ${layout}`}
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
          <div className="w-full h-auto space-y-2">
            <GamemodeInput />
            <div
              className={cn(
                "grid md:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto",
                layout === "list" && "flex flex-col"
              )}
            >
              <ClientOnly>
                {gamemodes?.map((gamemode) => (
                  <GamemodeItem
                    key={gamemode.id}
                    id={gamemode.id}
                    name={gamemode.name}
                  />
                ))}
              </ClientOnly>
            </div>

            <Attention
              text="Внимание! Режимы меняются, поэтому используйте режимы из списка"
              centered={false}
            />
          </div>
          <div className="flex items-center">
            <AlignLeft className="h-4 w-4 mr-1 text-secondary" />
            <h2 className="text-secondary font-medium text-lg">Категории</h2>
          </div>
          <CategoryInput />
          <div className="flex items-center gap-2 pb-2 flex-wrap max-h-[300px] overflow-y-auto">
            <ClientOnly>
              {categories?.map((category) => (
                <CategorieItem
                  key={category.id}
                  id={category.id}
                  name={category.name}
                />
              ))}
            </ClientOnly>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="h-[50px] border-t border-white border-opacity-[0.05] w-full flex items-center justify-between
        px-4 absolute bottom-0 cursor-pointer"
            >
              <p className="font-medium text-lg">{user.personaname}</p>
              <Avatar>
                <AvatarImage
                  src={user.avatarfull}
                  alt={`${user.personaname} аватар`}
                />
                <AvatarFallback className="bg-primary border border-white border-opacity-[0.1]">
                  <Image
                    width={40}
                    height={40}
                    quality={100}
                    src="/logo.png"
                    alt="logo image"
                    className="w-[30px] h-auto object-cover"
                  />
                </AvatarFallback>
              </Avatar>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-background space-y-4">
            <div className="text-white flex items-center justify-between">
              <div className="flex items-center justify-between">
                <CaptionsIcon className="h-4 w-4 mr-2" />
                <p>STEAM_ID</p>
              </div>
              <pre>{qadmin.steamid}</pre>
            </div>
            <div className="text-white flex items-center justify-between">
              <div className="flex items-center justify-between">
                <User className="h-4 w-4 mr-2" />
                <p>Ваш ранг</p>
              </div>
              <pre>{qadmin.rank}</pre>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
