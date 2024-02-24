import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category, Gamemode } from "@prisma/client";

type MobileSidebarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

const MobileSidebar = ({ categories, gamemodes }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu className="text-white h-8 w-8" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 bg-primary border-r border-white
      border-opacity-[0.05]"
      >
        <Sidebar categories={categories} gamemodes={gamemodes} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
