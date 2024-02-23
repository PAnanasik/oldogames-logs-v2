import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category } from "@prisma/client";

type MobileSidebarProps = {
  categories: Category[];
};

const MobileSidebar = ({ categories }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu size={32} className="text-white" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 bg-primary border-r border-white
      border-opacity-[0.05]"
      >
        <Sidebar categories={categories} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
