import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category, Gamemode } from "@prisma/client";

type MobileSidebarProps = {
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

const MobileSidebar = ({
  categories,
  gamemodes,
  user,
  qadmin,
}: MobileSidebarProps) => {
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
        <Sidebar
          categories={categories}
          gamemodes={gamemodes}
          user={user}
          qadmin={qadmin}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
